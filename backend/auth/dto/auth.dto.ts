import { ObjectType, Field, InputType } from "type-graphql";
import { User } from "../../user/dto/user.dto";

@ObjectType()
export class AuthOutput {
  @Field()
  token!: string;

  @Field(type => User)
  user!: User;
}

@InputType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
