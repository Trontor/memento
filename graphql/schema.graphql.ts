import { gql } from "apollo-server-express";

/**
 * GraphQL Type Definitions
 * ------------------------
 * These specify what exactly can be queried with a request.
 * For more information, see: https://graphql.org/learn/schema/
 */
const typeDefs = gql`
  type Query {
    me: String!
    user(id: String!): User
  }

  type Mutation {
    signup(input: UserSignupInput!): AuthOutput!
    login(input: UserLoginInput!): AuthOutput!
    createFamily(input: CreateFamilyInput!): Family
    updateUser(input: UpdateUserInput!): User
    updateRole(input: UpdateRoleInput!): UpdateRoleOutput
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    imageUrl: String
    location: String
    dateOfBirth: String
    gender: Gender
    roles: [Role!]
    families: [Family!]
    createdAt: String!
    lastLogin: String
  }

  input UserSignupInput {
    email: String!
    password: String!
    confirmPassword: String!
    firstName: String!
    lastName: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    id: ID!
    location: String
    dateOfBirth: String
    gender: Gender
    imageUrl: String
  }

  input UpdateRoleInput {
    userId: ID!
    role: RoleInput!
  }

  type UpdateRoleOutput {
    userId: ID!
    role: Role
  }

  input RoleInput {
    familyId: ID!
    role: FamilyRole!
  }

  enum Gender {
    MALE
    FEMALE
  }

  enum FamilyRole {
    ADMIN
    NORMAL
  }

  type Role {
    familyId: ID!
    role: FamilyRole!
  }

  type Family {
    id: ID!
    name: String!
    description: String
    imageUrl: String
    numMembers: Int!
    numArtifacts: Int!
    createdAt: String!
    users: [User!]
  }

  input CreateFamilyInput {
    name: String!
    imageUrl: String
    description: String
  }

  type AuthOutput {
    token: String
    user: User
  }
`;

export default typeDefs;
