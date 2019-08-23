// Load .env file
import bodyParser from "body-parser";
// Helps us load .env files into memory (process.env.<property> = <value>)
import dotenv from "dotenv";
// Express.js server that serves the React JS files and GraphQL server
import express, { Application, Request, Response } from "express";
// Used to get the build from the client/build folder and serve at '/'
import path from "path";
// Apollo Server will handle GraphQL Requests
import { server } from "./graphql";
// CORS package allows Cross-Origin Resource Sharing
import cors from "cors";

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

// Allow CORS
app.use(cors());

/**
 * Serve React Build + GraphQL Server using Express
 */

// Serves the React build
app.get("/", (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);

// Injects GraphQL into the express server as middleware
server.applyMiddleware({ app });

// Listen for routes on the specified port
app.listen(port, () => {
  const host = `http://localhost:${port}`;
  console.log(`Express server initialised at ${host}`);
  console.log(`GraphQL server initialised at ${host}${server.graphqlPath}`);
});
