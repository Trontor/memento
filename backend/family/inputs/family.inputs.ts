import { InputType, Field, ID } from "type-graphql";

@InputType()
export class JoinFamilyInput {
  @Field(type => ID)
  invitationId!: string;
}

@InputType()
export class CreateFamilyInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  imageUrl!: string;

  @Field({ nullable: true })
  description!: string;
}
