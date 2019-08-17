import {
  WithFirebaseFirestore,
  WithFirebaseClientAuth
} from "../utils/firebase/admin";
import { User, UserSignupInput, UserLoginInput } from "../generated/graphql";

export default class UserModel {
  static USERS_COLLECTION: string = "users";
  db: FirebaseFirestore.Firestore;
  auth: firebase.auth.Auth;

  constructor({
    db,
    clientAuth
  }: WithFirebaseFirestore & WithFirebaseClientAuth) {
    this.db = db;
    this.auth = clientAuth;
  }

  async doesUserExist(email: string) {
    const userSnapshot = await this.getUserByEmail(email);
    return userSnapshot.exists;
  }

  async getUserByEmail(email: string) {
    return this.db
      .collection(UserModel.USERS_COLLECTION)
      .doc(email)
      .get();
  }

  async createUser({ email, password, firstName, lastName }: UserSignupInput) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;
      let token: string;

      if (user === null) {
        throw new Error("UserCredential is null");
      }
      token = await user.getIdToken();

      // create new user document for registered user
      const newUserDoc: User = {
        id: user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        createdAt: new Date().toISOString()
      };

      await this.db
        .collection(UserModel.USERS_COLLECTION)
        .doc(email)
        .set(newUserDoc);
      return { token, user: newUserDoc };
    } catch (err) {
      console.error(err);
      throw new Error("Could not create new user");
    }
  }

  /**
   * Returns token after successful login, otherwise returns null.
   */
  async loginUser({ email, password }: UserLoginInput) {
    const userCredential = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    if (userCredential.user === null) {
      return null;
    }
    const token: string = await userCredential.user.getIdToken();
    return { token };
  }
}
