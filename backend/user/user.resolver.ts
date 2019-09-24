import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from "@nestjs/graphql";
import { UserSignupInput, UpdateUserInput } from "./input/user.input";
import { UserService } from "./user.service";
import { AuthOutput } from "../auth/dto/auth.dto";
import { Inject, forwardRef, UseGuards, Logger } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { User } from "./dto/user.dto";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { RoleInput } from "./input/role.input";
import { Family } from "../family/dto/family.dto";
import { FamilyService } from "../family/family.service";
import { FamilyAdminGuard } from "../auth/guards/family-admin.guard";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

/**
 * Resolves GraphQL mutations and queries related to users.
 */
@Resolver(User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly familyService: FamilyService,
  ) {}

  /**
   * Returns user id.
   * @param userId id of user
   */
  @Query(returns => User, { name: "user" })
  async getUser(@Args("userId") userId: string) {
    return await this.userService.findOneById(userId);
  }

  /**
   * Allows new user to signup.
   * @param input signup fields
   */
  @Mutation(returns => AuthOutput)
  async signup(@Args("input") input: UserSignupInput): Promise<AuthOutput> {
    const createdUser: User = await this.userService.createUser(input);
    const { token } = await this.authService.createJwt(createdUser);
    return {
      user: createdUser,
      token,
    };
  }

  /**
   * Updates existing user.
   * @param user user issuing the update request
   * @param input update fields
   */
  @Mutation(returns => User)
  @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args("input") input: UpdateUserInput,
  ): Promise<User> {
    this.logger.debug(user);
    const updatedUser = await this.userService.update(user, input);
    return updatedUser;
  }

  /**
   * Returns user information of the current authenticated user.
   * @param user current authenticated user
   */
  @Query(returns => User)
  @UseGuards(JwtAuthGuard)
  async currentUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  /**
   * Updates `role` of a user in a family.
   */
  @Mutation(returns => User)
  @UseGuards(JwtAuthGuard, FamilyAdminGuard)
  async updateRole(
    @Args("userId") updateeId: string,
    @Args("input") input: RoleInput,
  ): Promise<User> {
    return await this.userService.updateRole(updateeId, input);
  }

  /**
   * Resolves the `families` property
   */
  @ResolveProperty("families", returns => [Family])
  async getFamilies(@Parent() { userId, familyRoles }: User) {
    this.logger.debug(`resolving families on user ${userId}: ${familyRoles}`);

    if (!familyRoles || familyRoles.length == 0) return [];
    const ids = familyRoles.map(({ familyId }) => familyId);
    return await this.familyService.getFamilies(ids);
  }
}
