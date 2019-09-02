import { UserDocument } from "../schema/user.schema";
import { User } from "../dto/user.dto";
import { UserSignupInput } from "../input/user.input";

export interface IUserService {
  findOneByEmail(email: string): Promise<UserDocument>;
  createUser(input: UserSignupInput): Promise<User>;
}
