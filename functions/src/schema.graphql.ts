import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String
    lastName: String
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
    error: String
  }

  type Query {
    me: String!
  }

  type Mutation {
    signup(
      email: String!
      password: String!
      confirmPassword: String!
      firstName: String!
      lastName: String!
    ): AuthPayload
  }
`;

export default typeDefs;
