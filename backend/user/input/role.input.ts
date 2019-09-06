import { InputType, ID, Field } from "type-graphql";
import { FamilyRole } from "../dto/role.dto";

@InputType()
export class RoleInput {
  @Field(type => ID)
  familyId!: string;

  @Field(type => FamilyRole)
  familyRole!: FamilyRole;
}

@InputType()
export class UpdateRoleInput {
  @Field(type => ID)
  userId!: string;

  @Field(type => RoleInput)
  role!: RoleInput;
}
