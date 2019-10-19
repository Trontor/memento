import { InputType, ID, Field } from "type-graphql";
import { Gender } from "../dto/gender.dto";
import { GraphQLUpload } from "graphql-upload";
import { PlaceInput } from "./place.input";

/**
 * GraphQL input for updating a `User`.
 */
@InputType()
export class UpdateUserInput {
  @Field(type => ID)
  userId!: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  hometown?: string;

  @Field(type => [PlaceInput], { nullable: true })
  placesLived?: PlaceInput[];

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field(type => Gender, { nullable: true })
  gender?: Gender;

  @Field(type => GraphQLUpload, { nullable: true })
  image?: any;
}

/**
 * GraphQL input for signing up a new `User`.
 */
@InputType()
export class UserSignupInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;
}
