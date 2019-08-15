import * as functions from "firebase-functions";
import express, { Express } from "express";

import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import typeDefs from "./schema.graphql";

const server = new ApolloServer({ typeDefs, resolvers });
const app: Express = express();

server.applyMiddleware({ app, path: "/" });

export const api = functions.region("asia-east2").https.onRequest(app);

export const helloWorld = functions
  .region("asia-east2")
  .https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
  });
