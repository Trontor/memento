import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UseGuards, Logger } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FamilyAdminGuard } from "../auth/guards/family-admin.guard";
import { InviteService } from "./invite.service";
import { Invite } from "./dto/invite.dto";
import { CreateInviteInput } from "./inputs/invite.inputs";

@Resolver(Invite)
export class InviteResolver {
  private readonly logger = new Logger(InviteResolver.name);

  constructor(private readonly inviteService: InviteService) {}

  @Query(returns => Invite, { name: "invite" })
  async getInvite(@Args("inviteId") inviteId: string) {
    return await this.inviteService.getInvite(inviteId);
  }

  @Mutation(returns => Invite)
  @UseGuards(JwtAuthGuard, FamilyAdminGuard)
  async createInvite(@Args("input") input: CreateInviteInput) {
    this.logger.log(input);
    return await this.inviteService.createInvite(input.familyId);
  }
}
