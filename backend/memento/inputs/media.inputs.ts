import { InputType, Field } from "type-graphql";
import { MediaType } from "../dto/media.dto";
import { GraphQLUpload } from "graphql-upload";

/**
 * GraphQL Input type for creating new media
 * on a Memento.
 */
@InputType()
export class CreateMediaInput {
  @Field(type => MediaType)
  type!: MediaType;

  @Field(type => GraphQLUpload)
  file!: any;

  @Field({ nullable: true })
  caption?: string;
}
