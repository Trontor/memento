import * as functions from "firebase-functions";
import express, { Express } from "express";

import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import typeDefs from "./schema.graphql";

// dependencies
import { db, auth } from "./utils/firebase/admin";

// models
import { UserModel } from "./models/User";

// context is available to all resolvers
export interface Context {
  models: {
    user: UserModel;
  };
  auth: firebase.auth.Auth;
}
// inject dependencies for ease of testing
const context: Context = {
  models: {
    user: new UserModel({ db, auth })
  },
  auth: auth
};

const app: Express = express();

// setup graphql apollo server
const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({ app, path: "/" });

export const api = functions.region("asia-east2").https.onRequest(app);
