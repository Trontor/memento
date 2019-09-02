import { LoginInput, AuthOutput } from "./dto/auth.dto";
import { Mutation, Resolver, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => AuthOutput)
  async login(@Args("input") { email, password }: LoginInput) {
    const result: AuthOutput = await this.authService.loginWithEmailAndPassword(
      email,
      password
    );
    return result;
  }
}
