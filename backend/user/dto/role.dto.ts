import { registerEnumType, Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class Role {
  @Field(type => ID)
  familyId!: string;

  @Field(type => FamilyRole)
  role!: FamilyRole;
}

export enum FamilyRole {
  Admin = "ADMIN",
  Normal = "NORMAL"
}

// required to work with type-graphql
registerEnumType(FamilyRole, {
  name: "FamilyRole"
});

@ObjectType()
export class UpdateRoleOutput {
  @Field(type => ID)
  userId!: string;

  @Field(type => Role)
  role!: Role;
}
