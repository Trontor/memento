import { InputType, Field, ID, Int } from "type-graphql";
import {
  CreateMementoMediaInput,
  DeleteMementoMediaInput,
  UpdateMementoMediaInput,
} from "./media.inputs";

@InputType()
export class CreateMementoDateInput {
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
  type!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  location?: string;

  @Field(type => [CreateMementoMediaInput], { nullable: true })
  media?: CreateMementoMediaInput[];

  @Field(type => [CreateMementoDateInput], { nullable: true })
  dates?: CreateMementoDateInput[];

  @Field(type => [ID], { nullable: true })
  people?: string[];

  @Field(type => [ID], { nullable: true })
  beneficiaries?: string[];

  @Field(type => [String], { nullable: true })
  tags?: string[];

  @Field(type => Boolean, { defaultValue: true })
  detectObjects!: boolean;

  @Field(type => Int, { defaultValue: 3 })
  maxDetectedPerMedia!: number;
}

/**
 * GraphQL input for updating a Memento
 */
@InputType()
export class UpdateMementoInput {
  @Field(type => ID)
  mementoId!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  location?: string;

  @Field(type => [ID], { nullable: true })
  people?: string[];

  @Field(type => [ID], { nullable: true })
  beneficiaries?: string[];

  @Field(type => [String], { nullable: true })
  tags?: string[];

  @Field(type => [UpdateMementoMediaInput], { nullable: true })
  updateMedia?: UpdateMementoMediaInput[];

  @Field(type => [CreateMementoMediaInput], { nullable: true })
  appendMedia?: CreateMementoMediaInput[];

  @Field(type => [DeleteMementoMediaInput], { nullable: true })
  deleteMedia?: DeleteMementoMediaInput[];
}
