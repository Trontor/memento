import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class UserResolver {
  constructor() {}

  @Query(returns => String)
  async me(): Promise<string> {
    return "me";
  }
}
