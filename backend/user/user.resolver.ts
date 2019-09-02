import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserSignupInput } from "./input/user.input";
import { UserService } from "./user.service";
import { AuthOutput } from "../auth/dto/auth.dto";
import { Inject, forwardRef } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { mapDocumentToUserDTO } from "./schema/user.mapper";
import { User } from "./dto/user.dto";

@Resolver()
export class UserResolver {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Query(returns => String)
  async me(): Promise<string> {
    return "me";
  }

  @Mutation(returns => AuthOutput)
  async signup(@Args("input") input: UserSignupInput): Promise<AuthOutput> {
    const createdUser: User = await this.userService.createUser(input);
    const { token } = this.authService.createJwt(createdUser);
    return {
      user: createdUser,
      token
    };
  }
}
