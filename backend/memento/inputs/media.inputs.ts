import { InputType, Field, ID } from "type-graphql";
import { MediaType } from "../dto/media.dto";
import { GraphQLUpload } from "graphql-upload";

/**
 * GraphQL Input type for creating new media
 * on a Memento.
 */
@InputType()
export class CreateMementoMediaInput {
  @Field(type => MediaType)
  type!: MediaType;

  @Field(type => GraphQLUpload)
  file!: any;

  @Field({ nullable: true })
  caption?: string;
}

/**
 * GraphQL Input type for updating the `media`
 * property of an existing Memento by updating
 * an existing piece of uploaded media.
 */
@InputType()
export class UpdateMementoMediaInput {
  @Field(type => ID)
  mediaId!: string;

  @Field()
  caption!: string;
}

/**
 * GraphQL Input type for updating the `media`
 * property of an existing Memento by deleting
 * an existing piece of media.
 */
@InputType()
export class DeleteMementoMediaInput {
  @Field(type => ID)
  mediaId!: string;
}
