import { Field, ObjectType, ID } from "type-graphql";

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

@ObjectType()
export class SendInvitesOutput {
  // emails that were successfully sent
  @Field(type => [String!]!)
  sent!: string[];

  // emails that were unsuccessfully sent
  @Field(type => [String!]!)
  notSent!: string[];
}
