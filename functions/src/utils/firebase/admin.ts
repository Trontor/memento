// admin SDK for Firestore access
import * as admin from "firebase-admin";

// firebase client SDK for convenient authentication
import * as firebase from "firebase/app";
require("firebase/auth");

import dotenv from "dotenv";

dotenv.config();

admin.initializeApp();
firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
});

interface WithFirebaseFirestore {
  db: FirebaseFirestore.Firestore;
}

interface WithFirebaseClientAuth {
  clientAuth: firebase.auth.Auth;
}

interface WithFirebaseAdminAuth {
  adminAuth: admin.auth.Auth;
}

const db = admin.firestore();
const adminAuth = admin.auth();
const clientAuth = firebase.auth();

export {
  admin,
  db,
  adminAuth,
  clientAuth,
  firebase,
  WithFirebaseFirestore,
  WithFirebaseClientAuth,
  WithFirebaseAdminAuth
};