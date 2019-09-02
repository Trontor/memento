import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserSignupInput } from "./input/user.input";
import { User } from "./dto/user.dto";
import { UserService } from "./user.service";
import { UserInputError } from "apollo-server-express";
import { AuthOutput } from "../auth/dto/auth.dto";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => String)
  async me(): Promise<string> {
    return "me";
  }

  @Mutation(returns => AuthOutput)
  async signup(@Args("input") input: UserSignupInput) {
    let createdUser: User | undefined;
    try {
      createdUser = await this.userService.createUser(input);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return createdUser;
  }
}
