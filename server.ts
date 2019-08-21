// Load .env file
import bodyParser from "body-parser";
// Helps us load .env files into memory (process.env.<property> = <value>)
import dotenv from "dotenv";
// Express.js server that serves the React JS files and GraphQL server
import express, { Application, Request, Response } from "express";
// Used to get the build from the client/build folder and serve at '/'
import path from "path"; 
// Apollo Server will handle GraphQL Requests
import { ApolloServer, gql } from 'apollo-server-express'; 

/**
 * Setup Environment Variables + GraphQL Server + Express + React Static Files
 */
// Load .env file into memory
dotenv.config();
// Create a new express server
const app: Application = express();
// Port to serve the express server on: production port or default (5000)
const port = process.env.PORT || 5000;
// Set up to serve static files
app.use(express.static("client/build"));
// Parse application/json requests
app.use(bodyParser.json());  
// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world'
  }
};
// Initialise new Apollo GraphQL Server
const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

/**
 * Serve React Build + GraphQL Server using Express
 */
// Serves the React build
app.get("/", (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
); 
// Injects GraphQL into the express server as middleware
gqlServer.applyMiddleware({ app });
// Listen for routes on the specified port
app.listen(port, () =>{ 
  const host = `http://localhost:${port}`;
  console.log(`Express server initialised at ${host}`);
  console.log(`GraphQL server initialised at ${host}${gqlServer.graphqlPath}`);
}); 