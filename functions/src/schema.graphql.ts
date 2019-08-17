import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    imageUrl: String
    location: String
    dateOfBirth: String
    gender: String
    families: [Family!]
    createdAt: String!
    lastLogin: String
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

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    me: String!
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

  type Mutation {
    signup(input: UserSignupInput!): AuthPayload!
    login(input: UserLoginInput!): AuthPayload!
    createFamily(input: CreateFamilyInput!): Family
  }
`;

export default typeDefs;
