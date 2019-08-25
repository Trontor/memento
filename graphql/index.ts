import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema.graphql";
import resolvers from "./resolvers";
import { db, clientAuth, adminAuth } from "./utils/firebase/admin";
import {
  createContext,
  CONTEXT_CREATION_FAILED_ERROR_MESSAGE
} from "./utils/context";
import UserModel from "./models/User";
import FamilyModel from "./models/Family";
import InvitationModel from "./models/Invitation";

/**
 * Context is shared by all the resolvers of a given request.
 * It is useful for storing data such as authentication info, the current user,
 * database connection, data sources and other things.
 * */
const context = createContext(
  {
    user: new UserModel({ db, clientAuth }),
    family: new FamilyModel({ db }),
    invitation: new InvitationModel({ db })
  },
  adminAuth,
  db
);

/**
 * Set up GraphQL server, passing in typeDefs, resolver and the context.
 * typeDefs contain all the
 */
export const server = new ApolloServer({
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
