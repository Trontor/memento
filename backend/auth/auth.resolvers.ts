import { LoginInput, AuthOutput } from "./dto/auth.dto";
import { Mutation, Resolver, Args, Query, Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UseGuards, UnauthorizedException } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

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

  @Query(returns => String)
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Context("req") request: any): Promise<string> {
    console.log(request.user);
    const user = request.user;
    if (!user)
      throw new UnauthorizedException(
        "Could not log-in with the provided credentials"
      );
    const result = this.authService.createJwt(user);
    if (result) return result.token;
    throw new UnauthorizedException(
      "Could not log-in with the provided credentials"
    );
  }
}
