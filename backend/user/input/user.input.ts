import { InputType, ID, Field } from "type-graphql";
import { Gender } from "../dto/gender.dto";
import { GraphQLUpload } from "graphql-upload";
// import { Upload } from "../../upload/upload.scalar";

@InputType()
export class UpdateUserInput {
  @Field(type => ID)
  userId!: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field(type => Gender, { nullable: true })
  gender?: Gender;

  @Field(type => GraphQLUpload, { nullable: true })
  image?: any;
}

@InputType()
export class UserSignupInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;
}
