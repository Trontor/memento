import {
  WithFirebaseFirestore,
  WithFirebaseAuth
} from "../utils/firebase/admin";
import { User } from "../generated/graphql";

export class UserModel {
  static USERS_COLLECTION: string = "users";
  db: FirebaseFirestore.Firestore;
  auth: firebase.auth.Auth;

  constructor({ db, auth }: WithFirebaseFirestore & WithFirebaseAuth) {
    this.db = db;
    this.auth = auth;
  }

  getUserByEmail = async (email: string) => {
    return this.db
      .collection(UserModel.USERS_COLLECTION)
      .doc(email)
      .get();
  };

  createUser = async (user: User) => {
    return this.db
      .collection(UserModel.USERS_COLLECTION)
      .doc(user.email)
      .set(user);
  };
}
