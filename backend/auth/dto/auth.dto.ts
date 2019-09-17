import { ObjectType, Field, InputType } from "type-graphql";
import { User } from "../../user/dto/user.dto";

/**
 * GraphQL object for authentication success.
 */
@ObjectType()
export class AuthOutput {
  @Field()
  token!: string;

  @Field(type => User)
  user!: User;
}

/**
 * GraphQL input for logging in.
 */
@InputType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
