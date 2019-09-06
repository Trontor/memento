import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent
} from "@nestjs/graphql";
import { UserSignupInput, UpdateUserInput } from "./input/user.input";
import { UserService } from "./user.service";
import { AuthOutput } from "../auth/dto/auth.dto";
import {
  Inject,
  forwardRef,
  UseGuards,
  NotImplementedException,
  Logger
} from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { User } from "./dto/user.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/currentUser";
import { UpdateRoleOutput } from "./dto/role.dto";
import { UpdateRoleInput } from "./input/role.input";
import { Family } from "../family/dto/family.dto";
import { FamilyService } from "../family/family.service";

@Resolver(User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => FamilyService))
    private readonly familyService: FamilyService
  ) {}

  @Query(returns => String)
  @UseGuards(JwtAuthGuard)
  async me(): Promise<string> {
    return "me";
  }

  @Query(returns => User, { name: "user" })
  async getUser(@Args("userId") userId: string) {
    return await this.userService.findOneById(userId);
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

  @Mutation(returns => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args("input") input: UpdateUserInput
  ): Promise<User> {
    const updatedUser = await this.userService.update(user, input);
    return updatedUser;
  }

  /**
   * Updates `role` of a user in a family.
   */
  @Mutation(returns => UpdateRoleOutput)
  @UseGuards(JwtAuthGuard)
  async updateRole(
    @CurrentUser() currentUser: User,
    @Args("input") input: UpdateRoleInput
  ) {
    throw new NotImplementedException();
  }

  @ResolveProperty("families", returns => [Family])
  async getFamilies(@Parent() { userId, familyRoles }: User) {
    this.logger.debug(`resolving families on user ${userId}: ${familyRoles}`);

    if (!familyRoles || familyRoles.length == 0) return [];
    const ids = familyRoles.map(({ familyId }) => familyId);
    return await this.familyService.getFamilies(ids);
  }
}
