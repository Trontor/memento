import UserModel from "../models/User";
import FamilyModel from "../models/Family";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { isEmpty } from "./validation";
import { admin } from "./firebase/admin";

export interface Models {
  user: UserModel;
  family: FamilyModel;
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
        decodedToken = await adminAuth.verifyIdToken(token);
      }
      console.log(decodedToken);
    }

    // inject dependencies for ease of testing
    return {
      models: models,
      user: decodedToken,
      db
    };
  };
}
