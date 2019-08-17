import * as functions from "firebase-functions";
import express, { Express } from "express";

import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./schema.graphql";

// dependencies
import { db, clientAuth, adminAuth } from "./utils/firebase/admin";

import { createContext } from "./utils/context";
import UserModel from "./models/User";
import FamilyModel from "./models/Family";

const context = createContext(
  {
    user: new UserModel({ db, clientAuth }),
    family: new FamilyModel({ db })
  },
  adminAuth,
  db
);

const app: Express = express();

// setup graphql apollo server
const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({
  app,
  path: "/" /* usually defaults to `/graphql` endpoint */
});

export const api = functions.region("asia-east2").https.onRequest(app);
