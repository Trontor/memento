import {
  Injectable,
  BadRequestException,
  InternalServerErrorException
} from "@nestjs/common";
import { UserSignupInput } from "./input/user.input";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
import { MongoError } from "mongodb";
import { IUserService } from "./interfaces/IUserService";
import { UserNotFoundException } from "./user.exceptions";
import { User } from "./dto/user.dto";
import { mapDocumentToUserDTO } from "./schema/user.mapper";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel("User")
    private readonly UserModel: Model<UserDocument>
  ) {}

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
