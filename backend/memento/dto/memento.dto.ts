import { ObjectType, ID, Field, Int } from "type-graphql";

import { Family } from "../../family/dto/family.dto";
import { User } from "../../user/dto/user.dto";
import { Media } from "./media.dto";
import { DetectionLabel } from "./label.dto";

/**
 * GraphQL class for date(s) of a Memento.
 * Used to specify specific dates or ranges
 * of dates.
 */
@ObjectType()
export class MementoDate {
  @Field(type => ID)
  dateId!: string;

  @Field(type => Int, { nullable: true })
  day?: number;

  @Field(type => Int, { nullable: true })
  month?: number;

  @Field(type => Int, { nullable: true })
  year?: number;
}

/**
 * GraphQL class for returning User objects.
 * Equivalent to a Data Transfer Object (DTO).
 */
@ObjectType()
export class Memento {
  @Field(type => ID)
  mementoId!: string;

  @Field(type => Family)
  family!: Family;

  @Field(type => User)
  uploader!: User;

  @Field()
  type!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  location?: string;

  @Field(type => [Media])
  media!: Media[];

  @Field(type => [MementoDate])
  dates!: MementoDate[];

  @Field(type => [String], { nullable: true })
  tags?: string[];

  @Field(type => [User])
  bookmarkedBy!: User[];

  @Field(type => [User])
  people!: User[];

  @Field(type => [User])
  beneficiaries!: User[];

  @Field(type => [DetectionLabel])
  detectedLabels!: DetectionLabel[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
