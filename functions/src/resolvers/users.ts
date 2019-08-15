import { UserSignupInput, AuthPayload, User } from "../generated/graphql";
import { validateUserSignupInput } from "../utils/validation";
import {
  ValidationError,
  ApolloError,
  UserInputError,
  AuthenticationError
} from "apollo-server-express";
import * as firebase from "firebase/app";
import "firebase/auth";

import { db } from "../utils/firebase/admin";
import config from "../utils/firebase/config";
firebase.initializeApp(config);

console.log(firebase);

const USERS_COLLECTION = "users";

export const signup = async (input: UserSignupInput): Promise<AuthPayload> => {
  const [errors, isValid] = validateUserSignupInput(input);
  if (!isValid) {
    throw new UserInputError("Signup arguments invalid", errors);
  }
  try {
    const userSnapshot = await db
      .collection(USERS_COLLECTION)
      .doc(input.email)
      .get();
    if (userSnapshot.exists) {
      throw new ValidationError("Email already in use");
    }

    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(input.email, input.password);

    const user = userCredential.user;
    let token: string;
    if (user === null) {
      throw new AuthenticationError("Could not signup");
    } else {
      token = await user.getIdToken();
    }
    const newUserDoc: User = {
      id: user.uid,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      createdAt: new Date().toISOString()
    };
    await db
      .collection(USERS_COLLECTION)
      .doc(input.email)
      .set(newUserDoc);
    return {
      token: token,
      user: newUserDoc
    };
  } catch (err) {
    throw new ApolloError(err);
  }
};
