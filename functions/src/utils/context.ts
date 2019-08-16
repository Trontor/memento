import UserModel from "../models/User";
import { WithFirebaseAuth, WithFirebaseFirestore } from "./firebase/admin";

// context is available to all resolvers
export interface Context {
  models: {
    user: UserModel;
  };
}

export const createContext = ({
  db,
  auth
}: WithFirebaseFirestore & WithFirebaseAuth): Context => {
  // inject dependencies for ease of testing
  return {
    models: {
      user: new UserModel({ db, auth })
    }
  };
};
