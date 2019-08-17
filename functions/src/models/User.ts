import {
  WithFirebaseFirestore,
  WithFirebaseClientAuth
} from "../utils/firebase/admin";
import { User, UserSignupInput, UserLoginInput } from "../generated/graphql";

export interface UserDocument {
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  location?: string;
  dateOfBirth?: string;
  gender?: string;
  families: { [key: string]: string };
  createdAt: string;
  lastLogin?: string;
}

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

  async batchUpdateUser(
    batch: FirebaseFirestore.WriteBatch,
    userId: string,
    data: any
  ) {
    const userRef = this.db.collection(UserModel.USERS_COLLECTION).doc(userId);
    batch.update(userRef, data);
    return batch;
  }

  async getUser(userId: string): Promise<UserDocument | null> {
    const snap = await this.db
      .collection(UserModel.USERS_COLLECTION)
      .doc(userId)
      .get();
    if (!snap.exists) return null;
    const data = snap.data();
    if (!data) return null;
    console.log(data);
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      imageUrl: data.imageUrl,
      location: data.location,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      families: data.families,
      createdAt: data.createdAt,
      lastLogin: data.lastLogin
    };
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
        .doc(user.uid)
        .set(newUserDoc);
      return { token, user: newUserDoc };
    } catch (err) {
      console.error(err);
      throw new Error(err);
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
