import {
  Resolver,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
  Query
} from "@nestjs/graphql";
import { FamilyService } from "./family.service";
import { UseGuards, Inject, forwardRef } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Family } from "./dto/family.dto";
import { CreateFamilyInput, JoinFamilyInput } from "./inputs/family.inputs";
import { User } from "../user/dto/user.dto";
import { UserService } from "../user/user.service";
import { mapDocumentToFamilyDTO } from "./schema/family.mapper";
import { FamilyDocument } from "./schema/family.schema";

@Resolver(Family)
export class FamilyResolver {
  constructor(
    private readonly familyService: FamilyService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  @Query(returns => Family, { name: "family" })
  async getFamily(@Args("familyId") familyId: string) {
    const doc: FamilyDocument = await this.familyService.getFamily(familyId);
    return mapDocumentToFamilyDTO(doc);
  }

  @Mutation(returns => Family)
  @UseGuards(JwtAuthGuard)
  async createFamily(
    @CurrentUser() currentUser: User,
    @Args("input") input: CreateFamilyInput
  ) {
    const family = this.familyService.createFamily(currentUser, input);
    return family;
  }

  @ResolveProperty("members", returns => [User])
  async getUsers(@Parent() { familyId }: Family) {
    const { memberIds }: FamilyDocument = await this.familyService.getFamily(
      familyId
    );
    if (!memberIds || memberIds.length === 0) return [];
    const members: User[] = await this.userService.getUsers(memberIds);
    return members;
  }

  @Mutation(returns => Family)
  @UseGuards(JwtAuthGuard)
  async joinFamily(
    @CurrentUser() currentUser: User,
    @Args("input") input: JoinFamilyInput
  ) {
    return await this.familyService.joinFamily(currentUser, input.inviteId);
  }
}
