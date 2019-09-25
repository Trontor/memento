import {
  Resolver,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
  Query,
} from "@nestjs/graphql";
import { FamilyService } from "./family.service";
import { UseGuards, Inject, forwardRef } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Family } from "./dto/family.dto";
import {
  CreateFamilyInput,
  JoinFamilyInput,
  UpdateFamilyInput,
} from "./inputs/family.inputs";
import { User } from "../user/dto/user.dto";
import { UserService } from "../user/user.service";
import { mapDocumentToFamilyDTO } from "./schema/family.mapper";
import { FamilyDocument } from "./schema/family.schema";
import { ID } from "type-graphql";
import { FamilyAdminGuard } from "../auth/guards/family-admin.guard";
import { USER_LOADER_BY_ID, UserDataLoaderById } from "../user/user.dataloader";
import { FAMILY_LOADER_BY_ID, FamilyDataLoaderById } from "./family.dataloader";
import { UserDocument } from "../user/schema/user.schema";

/**
 * Resolves GraphQL mutations and queries related to families.
 */
@Resolver(Family)
export class FamilyResolver {
  constructor(
    private readonly familyService: FamilyService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(USER_LOADER_BY_ID)
    private readonly userLoaderById: UserDataLoaderById,
    @Inject(FAMILY_LOADER_BY_ID)
    private readonly familyLoaderById: FamilyDataLoaderById,
  ) {}

  /**
   * Fetches a family's data.
   */
  @Query(returns => Family, { name: "family" })
  async getFamily(
    @Args({ name: "familyId", type: () => ID }) familyId: string,
  ) {
    const doc: FamilyDocument = await this.familyService.getFamily(familyId);
    return mapDocumentToFamilyDTO(doc);
  }

  /**
   * Creates a new family.
   * User must be authenticated via valid JWT.
   */
  @Mutation(returns => Family)
  @UseGuards(JwtAuthGuard)
  async createFamily(
    @CurrentUser() currentUser: User,
    @Args("input") input: CreateFamilyInput,
  ) {
    const family = this.familyService.createFamily(currentUser, input);
    return family;
  }

  /**
   * Updates an existing family's details.
   * User must be authenticated via valid JWT and be an admin of the family.
   *
   * @param user the current user who is making the update request
   * @param input update family input fields
   */
  @Mutation(returns => Family)
  @UseGuards(JwtAuthGuard, FamilyAdminGuard)
  async updateFamily(
    @CurrentUser() user: User,
    @Args("input") input: UpdateFamilyInput,
  ) {
    return this.familyService.updateFamily(user, input);
  }

  /**
   * Resolves the `members` property on the `Family` object.
   */
  @ResolveProperty("members", returns => [User])
  async getUsers(@Parent() { familyId }: Family) {
    const family: FamilyDocument = await this.familyLoaderById.load(familyId);
    const members: UserDocument[] = await this.userLoaderById.loadMany(
      family.memberIds,
    );
    return members.map(doc => doc.toDTO());
  }

  /**
   * Allows user to join a family.
   */
  @Mutation(returns => Family)
  @UseGuards(JwtAuthGuard)
  async joinFamily(
    @CurrentUser() currentUser: User,
    @Args("input") input: JoinFamilyInput,
  ) {
    return await this.familyService.joinFamily(currentUser, input.inviteId);
  }
}
