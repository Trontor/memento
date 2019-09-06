import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { UserSignupInput, UpdateUserInput } from "./input/user.input";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "./schema/user.schema";
import { Model, Types } from "mongoose";
import { MongoError, ObjectId } from "mongodb";
import { IUserService } from "./interfaces/IUserService";
import { UserNotFoundException } from "./user.exceptions";
import { User } from "./dto/user.dto";
import { mapDocumentToUserDTO } from "./schema/user.mapper";

@Injectable()
export class UserService implements IUserService {
  /**
   * Finds user by id.
   * @param userId user id as a string
   */
  async findOneById(userId: string): Promise<User> {
    let id: ObjectId;
    try {
      id = Types.ObjectId(userId);
    } catch (err) {
      console.error(err);
      throw new UserNotFoundException();
    }
    const user = await this.UserModel.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return mapDocumentToUserDTO(user);
  }
  constructor(
    @InjectModel("User")
    private readonly UserModel: Model<UserDocument>
  ) {}

  /**
   * Updates fields of a user.
   * @param currentUser the user object attached to the GraphQL request
   * @param fields updatable fields
   */
  async update(currentUser: User, fields: Partial<UpdateUserInput>) {
    console.log(currentUser);
    if (!currentUser.userId)
      throw new InternalServerErrorException("Current user not defined");
    if (currentUser.userId !== fields.id) {
      throw new UnauthorizedException();
    }
    const key = currentUser.email;
    const updatedUser = await this.UserModel.findOneAndUpdate(
      { lowercaseEmail: key },
      fields,
      { new: true, runValidators: true }
    );
    if (!updatedUser) throw new InternalServerErrorException();
    const userDTO: User = mapDocumentToUserDTO(updatedUser);
    console.log(userDTO);
    return userDTO;
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    const user = await this.UserModel.findOne({
      lowercaseEmail: email.toLowerCase()
    }).exec();
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async createUser(input: UserSignupInput): Promise<User> {
    const createdUser = new this.UserModel(input);

    let userDoc: UserDocument;
    try {
      userDoc = await createdUser.save();
    } catch (err) {
      console.error(err);
      throw this.evaluateMongoError(err, input);
    }
    return mapDocumentToUserDTO(userDoc);
  }

  /**
   * Reads a mongo database error and attempts to provide a better error message. If
   * it is unable to produce a better error message, returns the original error message.
   *
   * @private
   * @param {MongoError} error
   * @param {UserSignupInput} UserSignupInput
   * @returns {Error}
   * @memberof UserService
   */
  private evaluateMongoError(
    error: MongoError,
    createUserInput: UserSignupInput
  ): Error {
    if (error.code === 11000) {
      if (
        error.message
          .toLowerCase()
          .includes(createUserInput.email.toLowerCase())
      ) {
        throw new BadRequestException(
          `email ${createUserInput.email} is already registered`
        );
      }
    }
    throw new InternalServerErrorException(error.message);
  }
}
