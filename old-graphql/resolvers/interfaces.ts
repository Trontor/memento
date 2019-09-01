import {
  UserSignupInput,
  UserLoginInput,
  CreateFamilyInput,
  UpdateUserInput,
  UpdateRoleInput,
  CreateInvitationInput,
  JoinFamilyInput
} from "../generated/graphql";

export interface WithUserSignupInput {
  input: UserSignupInput;
}

export interface WithUserLoginInput {
  input: UserLoginInput;
}

export interface WithCreateFamilyInput {
  input: CreateFamilyInput;
}

export interface WithUpdateUserInput {
  input: UpdateUserInput;
}

export interface WithUpdateRoleInput {
  input: UpdateRoleInput;
}

export interface WithCreateInvitationInput {
  input: CreateInvitationInput;
}

export interface WithJoinFamilyInput {
  input: JoinFamilyInput;
}
