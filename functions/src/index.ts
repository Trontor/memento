import * as functions from "firebase-functions";
import express, { Express } from "express";

import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./schema.graphql";

// dependencies
import { db, clientAuth, adminAuth } from "./utils/firebase/admin";

import {
  createContext,
  CONTEXT_CREATION_FAILED_ERROR_MESSAGE
} from "./utils/context";
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
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  formatError: err => {
    // Remove ugly apollo error message prefix
    if (err.message.startsWith(CONTEXT_CREATION_FAILED_ERROR_MESSAGE)) {
      err.message = err.message.split(CONTEXT_CREATION_FAILED_ERROR_MESSAGE)[1];
    }
    return err;
  }
});
server.applyMiddleware({
  app,
  path: "/" /* usually defaults to `/graphql` endpoint */
});

export const api = functions.region("asia-east2").https.onRequest(app);
