import {
  WithFirebaseFirestore,
  WithFirebaseClientAuth
} from "../utils/firebase/admin";
import {
  User,
  UserSignupInput,
  UserLoginInput,
  FamilyRole,
  Role,
  Gender,
  UpdateUserInput,
  RoleInput
} from "../generated/graphql";
import { ApolloError } from "apollo-server-express";
import { USER_NOT_FOUND_ERROR_MESSAGE } from "../resolvers/users";

export interface UserDocument {
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  location?: string;
  dateOfBirth?: string;
  gender?: string;
  roles: { [key: string]: string };
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

  async updateUser(
    userId: string,
    data: Partial<UpdateUserInput>
  ): Promise<UserDocument> {
    try {
      await this.db
        .collection(UserModel.USERS_COLLECTION)
        .doc(userId)
        .update(data);
      return await this.getUser(userId);
    } catch (err) {
      console.error(err);
      throw new ApolloError("DB error: Could not update user");
    }
  }

  async updateRole(userId: string, { familyId, role }: RoleInput) {
    try {
      const updateData = {
        [`roles.${familyId}`]: role
      };
      return await this.db
        .collection(UserModel.USERS_COLLECTION)
        .doc(userId)
        .update(updateData);
    } catch (err) {
      console.error(err);
      throw new ApolloError("DB error: Could not update role");
    }
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

  async getUser(userId: string): Promise<UserDocument> {
    const snap = await this.db
      .collection(UserModel.USERS_COLLECTION)
      .doc(userId)
      .get();
    const data = snap.data();
    if (!snap.exists || !data) {
      console.error(USER_NOT_FOUND_ERROR_MESSAGE);
      throw new ApolloError(USER_NOT_FOUND_ERROR_MESSAGE);
    }

    console.log(data);
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      imageUrl: data.imageUrl,
      location: data.location,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      roles: data.roles,
      createdAt: data.createdAt,
      lastLogin: data.lastLogin
    };
  }

  async createUser({ email, password, firstName, lastName }: UserSignupInput) {
    const userCredential = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    const user = userCredential.user;
    let token: string;

    if (user === null) {
      throw new ApolloError("UserCredential is null");
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

  /***
   * Checks if a user has a particular role in the family.
   */
  hasRoleInFamily(
    userDoc: UserDocument,
    role: FamilyRole,
    familyId: string
  ): boolean {
    if (!userDoc.roles) return false;
    return userDoc.roles[familyId] === role;
  }

  isInFamily(userDoc: UserDocument, familyId: string): boolean {
    if (!userDoc.roles) return false;
    return userDoc.roles[familyId] !== undefined;
  }

  /**
   * Converts type `UserDocument` into GraphQL type `User`
   * @param userDoc Document from Firebase Firestore
   * @param userId id of user
   */
  static fromUserDocument(userDoc: UserDocument, userId: string): User {
    // graphQl-ify roles from Object into array `[{familyId, role}]`
    const roles: Role[] = [];
    if (userDoc.roles)
      Object.entries(userDoc.roles).map(([familyId, role]) => {
        return {
          familyId,
          role: role === FamilyRole.Admin ? FamilyRole.Admin : FamilyRole.Normal
        };
      });

    // graphQl-ify gender property
    let gender = null;
    if (userDoc.gender) {
      gender = userDoc.gender == Gender.Male ? Gender.Male : Gender.Female;
    }

    return {
      id: userId,
      email: userDoc.email,
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      imageUrl: userDoc.imageUrl,
      location: userDoc.location,
      dateOfBirth: userDoc.dateOfBirth,
      gender: gender,
      createdAt: userDoc.createdAt,
      lastLogin: userDoc.lastLogin,
      roles: roles
    };
  }
}
