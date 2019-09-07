import { InputType, Field, ID } from "type-graphql";

@InputType()
export class JoinFamilyInput {
  @Field(type => ID)
  inviteId!: string;
}

@InputType()
export class CreateFamilyInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  colour?: string;
}

@InputType()
export class UpdateFamilyInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  colour?: string;
}
