import { ObjectType, Field } from "type-graphql";

/**
 * GraphQL class for detected label in Memento media.
 */
@ObjectType()
export class DetectionLabel {
  @Field(type => String)
  name!: string;
}
