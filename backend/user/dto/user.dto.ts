/**
 * Defines the GraphQL object.
 * DTO stands for "Data Transfer Object": the data that's sent over the network.
 */
import { ObjectType, ID, Field } from "type-graphql";

import { Gender } from "./gender.dto";
import { Role } from "./role.dto";

import { Family } from "../../family/dto/family.dto";

@ObjectType()
export class User {
  @Field(type => ID)
  userId!: string;

  @Field()
  email!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field({ nullable: true })
  gender?: Gender;

  @Field(type => [Role!])
  roles?: Role[];

  @Field(type => [Family!])
  families?: Family[];

  @Field()
  createdAt!: string;

  @Field()
  updatedAt!: string;
}
