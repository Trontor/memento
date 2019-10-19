import { InputType, Field } from "type-graphql";

/**
 * GraphQL input for places lived.
 */
@InputType()
export class PlaceInput {
  @Field()
  city!: string;

  @Field()
  dateMoved!: Date;
}
