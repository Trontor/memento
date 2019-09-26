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
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { RoleInput } from "./input/role.input";
import { Family } from "../family/dto/family.dto";
import { FamilyAdminGuard } from "../auth/guards/family-admin.guard";
import { UserDataLoaderById, USER_LOADER_BY_ID } from "./user.dataloader";
import {
  FAMILY_LOADER_BY_ID,
  FamilyDataLoaderById,
} from "../family/family.dataloader";

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
    @Inject(USER_LOADER_BY_ID)
    private readonly usersDataLoaderById: UserDataLoaderById,
    @Inject(FAMILY_LOADER_BY_ID)
    private readonly familyDataLoaderById: FamilyDataLoaderById,
  ) {}

  /**
   * Returns user id.
   * @param userId id of user
   */
  @Query(returns => User, { name: "user" })
  async getUser(@Args("userId") userId: string) {
    const doc = await this.usersDataLoaderById.load(userId);
    return doc.toDTO();
  }

  /**
   * Allows new user to signup.
   * @param input signup fields
   */
  @Mutation(returns => AuthOutput)
  async signup(@Args("input") input: UserSignupInput): Promise<AuthOutput> {
    const createdUser: User = await this.userService.createUser(input);
    const { token } = this.authService.createJwt(createdUser);
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
  async updateUser(
    @CurrentUser() user: User,
    @Args("input") input: UpdateUserInput,
  ): Promise<User> {
    this.logger.debug(user);
    const updatedUser = await this.userService.update(user, input);
    this.usersDataLoaderById.clear(updatedUser.userId);
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
    const user: User = await this.userService.updateRole(updateeId, input);
    this.usersDataLoaderById.clear(user.userId);
    return user;
  }

  /**
   * Resolves the `families` property
   */
  @ResolveProperty("families", returns => [Family])
  async getFamilies(@Parent() { userId }: User) {
    this.logger.debug(`resolving families on user ${userId}`);

    const user = await this.usersDataLoaderById.load(userId);
    this.logger.debug(user);
    const families = await this.familyDataLoaderById.loadMany(
      user.roles.map(({ familyId }) => familyId),
    );
    return families.map(doc => doc.toDTO());
  }
}
