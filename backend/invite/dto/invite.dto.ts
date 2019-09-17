import { Field, ObjectType, ID } from "type-graphql";

/**
 * GraphQL class for returning Invite objects.
 * Equivalent to a Data Transfer Object (DTO).
 */
@ObjectType()
export class Invite {
  @Field(type => ID)
  inviteId!: string;

  @Field(type => ID)
  inviterId!: string;

  @Field(type => ID)
  familyId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  expiresAt!: Date;
}

/**
 * GraphQL class for invite emails that failed to send.
 * Equivalent to a Data Transfer Object (DTO).
 */
@ObjectType()
export class FailedInviteOutput {
  @Field()
  email!: string;

  @Field()
  error!: string;
}

/**
 * GraphQL class for return value of `inviteByEmail` mutation.
 * Equivalent to a Data Transfer Object (DTO).
 */
@ObjectType()
export class SendInvitesOutput {
  // emails that were successfully sent
  @Field(type => [String!]!)
  sent!: string[];

  // emails that were unsuccessfully sent
  @Field(type => [FailedInviteOutput!]!)
  failed!: FailedInviteOutput[];
}
