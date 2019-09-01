import { ObjectType, Field, ID, Int } from "type-graphql";
import { User } from "../../user/dto/user.dto";

@ObjectType()
export class Family {
  @Field(type => ID)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(type => Int)
  numMembers!: number;

  @Field(type => Int)
  numArtifacts!: number;

  @Field(type => [User])
  users?: User[];

  @Field()
  createdAt!: string;
}
