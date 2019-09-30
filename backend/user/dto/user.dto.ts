import { ObjectType, ID, Field } from "type-graphql";

import { Gender } from "./gender.dto";
import { Role } from "./role.dto";

import { Family } from "../../family/dto/family.dto";
import { Memento } from "../../memento/dto/memento.dto";

/**
 * GraphQL class for returning User objects.
 * Equivalent to a Data Transfer Object (DTO).
 */
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
  familyRoles!: Role[];

  @Field(type => [Family!])
  families!: Family[];

  @Field(type => [Memento!])
  bookmarks!: Memento[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  lastSeenAt!: Date;
}
