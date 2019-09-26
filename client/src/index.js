import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";

const cache = new InMemoryCache();
const DEV_ENDPOINT = "http://localhost:5000/graphql";
const PROD_ENDPOINT = "/graphql";
const gqlEndpoint =
  process.env.NODE_ENV === "development" ? DEV_ENDPOINT : PROD_ENDPOINT;
console.log("Linking GraphQL to Apollo Client at: " + gqlEndpoint);

const link = new createUploadLink({
  uri: gqlEndpoint,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("AUTH-TOKEN");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache,
  link: authLink.concat(errorLink).concat(link),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
