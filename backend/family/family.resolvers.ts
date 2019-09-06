import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { FamilyService } from "./family.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/currentUser";
import { Family } from "./dto/family.dto";
import { CreateFamilyInput } from "./inputs/family.inputs";
import { User } from "../user/dto/user.dto";

@Resolver()
export class FamilyResolver {
  constructor(private readonly familyService: FamilyService) {}

  // @Query(returns => Family, { name: "family" })
  // async getFamily(@Args("familyId") familyId: string) {
  //   return await this.familyService.findOneById(familyId);
  // }

  @Mutation(returns => Family)
  @UseGuards(JwtAuthGuard)
  async createFamily(
    @CurrentUser() currentUser: User,
    @Args("input") input: CreateFamilyInput
  ) {
    const family = this.familyService.createFamily(currentUser, input);
    return family;
  }
}
