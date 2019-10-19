import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Place {
  @Field()
  city!: string;

  @Field()
  dateMoved!: Date;
}
