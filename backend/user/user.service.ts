import { Injectable } from "@nestjs/common";
import { UserSignupInput } from "./input/user.input";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User")
    private readonly UserModel: Model<UserDocument>
  ) {}

  async createUser(input: UserSignupInput) {
    const createdUser = new this.UserModel(input);
    let user: UserDocument | undefined;
    try {
      user = await createdUser.save();
    } catch (err) {
      console.error(err);
      throw err;
    }
    return user;
  }
}
