// admin SDK for Firestore access
import * as admin from "firebase-admin";

// firebase client SDK for convenient authentication
import * as firebase from "firebase/app";
require("firebase/auth");

import dotenv from "dotenv";

dotenv.config();

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

console.log(
  "Initialising Firestore and Firebase with the following config:" +
    JSON.stringify(config)
);

const serviceAccount = process.env["SERVICE_ACCOUNT"];
if (!serviceAccount) {
  throw new Error("The $SERVICE_ACCOUNT environment variable was not found!");
}
const keys = JSON.parse(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(keys),
  databaseURL: "https://memento-84bad.firebaseio.com"
});
console.log("Firestore connection established.");
firebase.initializeApp(config);
console.log("Firebase connection established.");
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
