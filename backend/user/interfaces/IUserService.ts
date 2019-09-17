import { UserDocument } from "../schema/user.schema";
import { User } from "../dto/user.dto";
import { UserSignupInput } from "../input/user.input";

// TODO: need to update UserService interface.
// May be useful for mocking UserService in tests.
export interface IUserService {
  findOneByEmail(email: string): Promise<UserDocument>;
  createUser(input: UserSignupInput): Promise<User>;
}
