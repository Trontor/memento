// admin SDK for Firestore access
import * as admin from "firebase-admin";

// firebase client SDK for convenient authentication
import * as firebase from "firebase/app";
import "firebase/auth";
import config from "./config";

admin.initializeApp();
firebase.initializeApp(config);

interface WithFirebaseFirestore {
  db: FirebaseFirestore.Firestore;
}

interface WithFirebaseAuth {
  auth: firebase.auth.Auth;
}

const db = admin.firestore();
const auth = firebase.auth();

export { admin, db, auth, WithFirebaseFirestore, WithFirebaseAuth };
