import { InputType, Field, ID, Int } from "type-graphql";
import { CreateMediaInput } from "./media.inputs";

@InputType()
export class CreateMementoDatesInput {
  @Field(type => Int, { nullable: true })
  day?: number;

  @Field(type => Int, { nullable: true })
  month?: number;

  @Field(type => Int, { nullable: true })
  year?: number;
}

/**
 * GraphQL input for creating a Memento
 */
@InputType()
export class CreateMementoInput {
  @Field(type => ID)
  familyId!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  location?: string;

  @Field(type => [CreateMediaInput], { nullable: true })
  media?: CreateMediaInput[];

  @Field(type => [CreateMementoDatesInput], { nullable: true })
  dates?: CreateMementoDatesInput[];
}
