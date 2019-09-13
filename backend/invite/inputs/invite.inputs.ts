import { InputType, ID, Field } from "type-graphql";

@InputType()
export class SendInvitesInput {
  @Field(type => ID)
  familyId!: string;

  @Field(type => [String!]!)
  emails!: string[];
}

@InputType()
export class CreateInviteInput {
  @Field(type => ID)
  familyId!: string;
}
