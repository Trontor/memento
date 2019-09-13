import UserModel from "../models/User";
import FamilyModel from "../models/Family";
import InvitationModel from "../models/Invitation";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { isEmpty } from "./validation";
import { admin } from "./firebase/admin";
import { AuthenticationError } from "apollo-server-express";

export const CONTEXT_CREATION_FAILED_ERROR_MESSAGE =
  "Context creation failed: ";

export interface Models {
  user: UserModel;
  family: FamilyModel;
  invitation: InvitationModel;
}

export interface Context {
  models: Models;
  user?: admin.auth.DecodedIdToken;
  db: FirebaseFirestore.Firestore;
}

const extractBearerToken = (req: any): string | null => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return null;
  }
  const token: string = req.headers.authorization.split(" ")[1];
  return !isEmpty(token) ? token : null;
};

/**
 * Higher order function that returns an async Apollo ContextFunction
 * Contains authentication information about the user and
 * injects data model instances.
 */
export function createContext(
  models: Models,
  adminAuth: admin.auth.Auth,
  db: FirebaseFirestore.Firestore
) {
  return async ({ req }: ExpressContext) => {
    let decodedToken = null;
    if (req) {
      // decodes token
      const token = extractBearerToken(req);

      if (token !== null) {
        try {
          decodedToken = await adminAuth.verifyIdToken(token);
        } catch (err) {
          console.log("Error decoding token, token expired.");
          throw new AuthenticationError("Token expired");
        }
      }
      if (decodedToken)
        console.log("Request made with token: " + JSON.stringify(decodedToken));
    }

    // inject dependencies for ease of testing
    return {
      models: models,
      user: decodedToken,
      db
    };
  };
}
