import { InputType, ID, Field } from "type-graphql";

/**
 * GraphQL inputs for `invitesByEmail` mutation.
 */
@InputType()
export class SendInvitesInput {
  @Field(type => ID)
  familyId!: string;

  @Field(type => [String!]!)
  emails!: string[];
}

/**
 * GraphQL inputs for `createInvite` mutation.
 */
@InputType()
export class CreateInviteInput {
  @Field(type => ID)
  familyId!: string;
}
