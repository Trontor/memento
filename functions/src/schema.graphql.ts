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
    imageUrl: String
    numMembers: Int!
    numArtifacts: Int!
    createdAt: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    me: String!
    user(id: ID!): String
  }

  input UserSignupInput {
    email: String!
    password: String!
    confirmPassword: String!
    firstName: String!
    lastName: String!
  }

  type Mutation {
    signup(input: UserSignupInput!): AuthPayload!
  }
`;

export default typeDefs;
