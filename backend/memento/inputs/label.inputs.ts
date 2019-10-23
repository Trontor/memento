import { Field, InputType } from "type-graphql";

/**
 * Input class for detected label. For GraphQL mutation.
 */
@InputType()
export class DetectionLabelInput {
  @Field(type => String)
  name!: string;

  @Field(type => Number)
  confidence!: number;
}
