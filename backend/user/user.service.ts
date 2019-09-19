import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    UnauthorizedException,
    Logger,
    ForbiddenException,
} from "@nestjs/common";
import { UserSignupInput, UpdateUserInput } from "./input/user.input";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "./schema/user.schema";
import { Model, Types } from "mongoose";
import { MongoError } from "mongodb";
import { IUserService } from "./interfaces/IUserService";
import { UserNotFoundException, CreateRoleException } from "./user.exceptions";
import { User } from "./dto/user.dto";
import { mapDocumentToUserDTO } from "./schema/user.mapper";
import { RoleInput } from "./input/role.input";
import { fromHexStringToObjectId } from "../common/mongo.util";
import { FileService } from "../file/file.service";
import { IUpdateUserData } from "./interfaces/user.update.interface";

/**
 * Manages CRUD for users
 */
@Injectable()
export class UserService implements IUserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        @InjectModel("User")
        private readonly UserModel: Model<UserDocument>,
        private readonly fileService: FileService,
    ) {}

    /**
     * Fetches and returns a `UserDocument` by `email`.
     * @param email email of user to be found
     */
    async findOneByEmail(email: string): Promise<UserDocument> {
        const user = await this.UserModel.findOne({
            lowercaseEmail: email.toLowerCase(),
        }).exec();
        if (!user) throw new UserNotFoundException();
        return user;
    }

    /**
     * Creates a new `UserDocument` for a newly registered user.
     * @param input signup fields
     */
    async createUser(input: UserSignupInput): Promise<User> {
        const createdUser = new this.UserModel(input);

        let userDoc: UserDocument;
        try {
            userDoc = await createdUser.save();
        } catch (err) {
            this.logger.error(err);
            throw this.evaluateMongoError(err, input);
        }
        return mapDocumentToUserDTO(userDoc);
    }

    /**
     * Finds user by id.
     * @param userId user id as a string
     */
    async findOneById(userId: string): Promise<User> {
        const id = fromHexStringToObjectId(userId);
        const user = await this.UserModel.findById(id);
        if (!user) {
            Logger.error(`user ${id} not found`);
            throw new UserNotFoundException();
        }
        return mapDocumentToUserDTO(user);
    }

    /**
     * Finds users by ids.
     * @param userId user id as a string
     */
    async getUsers(userIds: string[]): Promise<User[]> {
        if (userIds.length === 0) return [];
        // more efficient to retrieve all docs in one round trip
        const docs = await this.UserModel.find({
            _id: {
                $in: userIds.map(id => fromHexStringToObjectId(id)),
            },
        });
        return docs.map(doc => mapDocumentToUserDTO(doc));
    }

    /**
     * Updates fields of a user.
     * @param currentUser the user object attached to the GraphQL request
     * @param fields updatable fields
     */
    async update(currentUser: User, fields: UpdateUserInput) {
        const { userId: _, ...data } = fields;

        // check if fields contain actual data
        const hasData: boolean = Object.keys(data).length > 0;
        if (!hasData) {
            throw new BadRequestException(
                "No data provided in UpdateUserInput",
            );
        }
        this.logger.log(
            `User ${currentUser.userId} updating ${JSON.stringify(fields)}`,
        );

        if (!currentUser.userId)
            throw new InternalServerErrorException("Current user not defined");

        // authorization: users can only update their own profile details
        if (currentUser.userId !== fields.userId) {
            this.logger.log(
                `current user id ${currentUser.userId} does not match updatee id ${fields.userId}`,
            );
            throw new ForbiddenException();
        }

        // upload image if provided
        let imageUrl: string | undefined = undefined;
        if (data.image) {
            imageUrl = await this.fileService.uploadImage(data.image);
        }

        // extract image stream from `data` and replace with imageUrl
        const { image, ...updatableData } = data;
        const updateData: IUpdateUserData = { ...updatableData };
        if (imageUrl) {
            updateData.imageUrl = imageUrl;
        }

        // do update operation
        const updatedUser = await this.UserModel.findOneAndUpdate(
            { lowercaseEmail: currentUser.email.toLowerCase() }, // find by email
            { ...updateData, imageUrl },
            { new: true, runValidators: true },
        );
        if (!updatedUser)
            throw new InternalServerErrorException("Could not update user");
        const userDTO: User = mapDocumentToUserDTO(updatedUser);
        this.logger.debug(userDTO);
        return userDTO;
    }

    /**
     * Updates role of a user in a family.
     *
     * @param updateeId id of user that is being updated
     * @param input role data will be updated to this value
     */
    async updateRole(updateeId: string, input: RoleInput): Promise<User> {
        const user = await this.UserModel.findOneAndUpdate(
            {
                _id: fromHexStringToObjectId(updateeId),
                "roles.familyId": input.familyId,
            },
            {
                $set: {
                    "roles.$.familyRole": input.familyRole,
                },
            },
            {
                new: true,
            },
        );
        if (!user) {
            this.logger.error("User not in family");
            throw new BadRequestException("Updatee not in family");
        }
        return mapDocumentToUserDTO(user);
    }

    /**
     * Assigns new family role for a user joining a new family.
     * @param userId user id
     * @param input role input
     */
    async createRole(userId: string, input: RoleInput): Promise<UserDocument> {
        this.logger.log(`User ${userId} creating role ${input}`);
        const id: Types.ObjectId = fromHexStringToObjectId(userId);
        this.logger.debug(`user id ${id}`);

        /**
         * Inserts a new role object in the `roles` array if the
         * the array does not contain an object with the same `familyId`.
         */
        const user = await this.UserModel.findOneAndUpdate(
            {
                _id: id,
                // ensure familyId is unique in the `roles` array
                "roles.familyId": { $ne: input.familyId },
            },
            {
                $push: {
                    roles: {
                        familyId: input.familyId,
                        familyRole: input.familyRole,
                    },
                },
            },
            { new: true },
        );
        if (!user) throw new CreateRoleException();
        this.logger.debug(`Updated user roles array: ${user.roles}`);
        return user;
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
        createUserInput: UserSignupInput,
    ): Error {
        if (error.code === 11000) {
            if (
                error.message
                    .toLowerCase()
                    .includes(createUserInput.email.toLowerCase())
            ) {
                throw new BadRequestException(
                    `email ${createUserInput.email} is already registered`,
                );
            }
        }
        throw new InternalServerErrorException(error.message);
    }
}
