import { InputType, ID, Field } from "type-graphql";
import { FamilyRole } from "../dto/role.dto";

/**
 * GraphQL input for defining a role.
 */
@InputType()
export class RoleInput {
  @Field(type => ID)
  familyId!: string;

  @Field(type => FamilyRole)
  familyRole!: FamilyRole;
}
