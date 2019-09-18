import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UseGuards, Logger } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FamilyAdminGuard } from "../auth/guards/family-admin.guard";
import { InviteService } from "./invite.service";
import { Invite, SendInvitesOutput } from "./dto/invite.dto";
import { CreateInviteInput, SendInvitesInput } from "./inputs/invite.inputs";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { User } from "../user/dto/user.dto";
import { ID } from "type-graphql";

/**
 * Resolves GraphQL mutations and queries related to invites.
 */
@Resolver(Invite)
export class InviteResolver {
  private readonly logger = new Logger(InviteResolver.name);

  constructor(private readonly inviteService: InviteService) {}

  /**
   * Fetch invite by id.
   * @param inviteId id of invite
   */
  @Query(returns => Invite, { name: "invite" })
  async getInvite(
    @Args({ name: "inviteId", type: () => ID }) inviteId: string
  ) {
    return await this.inviteService.getInvite(inviteId);
  }

  /**
   * Creates a new invite.
   * @param user current user
   * @param input input for creating invite
   */
  @Mutation(returns => Invite)
  @UseGuards(JwtAuthGuard, FamilyAdminGuard)
  async createInvite(
    @CurrentUser() user: User,
    @Args("input") input: CreateInviteInput
  ) {
    this.logger.log(input);
    return await this.inviteService.createInvite(user, input.familyId);
  }

  /**
   * Sends family invites to new or existing users by email.
   * @param user current user
   * @param input input for inviting users by email
   */
  @Mutation(returns => SendInvitesOutput)
  @UseGuards(JwtAuthGuard, FamilyAdminGuard)
  async inviteByEmail(
    @CurrentUser() user: User,
    @Args("input") input: SendInvitesInput
  ) {
    const res: SendInvitesOutput = await this.inviteService.sendInvitesByEmail(
      user,
      input.familyId,
      input.emails
    );
    return res;
  }
}
