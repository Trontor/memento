import { ObjectType, Field, registerEnumType } from "type-graphql";

export enum MediaType {
  Image = "IMAGE",
  Video = "VIDEO",
}

// required to work with type-graphql
registerEnumType(MediaType, {
  name: "MediaType",
});

/**
 * GraphQL class for returning media, such
 * as images and videos, for Mementos.
 */
@ObjectType()
export class Media {
  @Field(type => MediaType)
  type!: MediaType;

  @Field()
  url!: string;

  @Field({ nullable: true })
  caption?: string;
}
