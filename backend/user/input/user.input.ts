import { ObjectType, InputType, ID, Field } from "type-graphql";
import { Gender } from "../dto/gender.dto";

@InputType()
export class UpdateUserInput {
  @Field(type => ID)
  id!: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field(type => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  imageUrl?: string;
}

@InputType()
export class UserSignupInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  confirmPassword!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
