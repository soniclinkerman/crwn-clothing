// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import firestore from "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqbNVmiZDIfDLLYtFFMS-QEnYnzN0_7N0",
  authDomain: "zaltick-clothing-db.firebaseapp.com",
  projectId: "zaltick-clothing-db",
  storageBucket: "zaltick-clothing-db.appspot.com",
  messagingSenderId: "1015652241345",
  appId: "1:1015652241345:web:a30ef4d098ef09f27ba940",
  measurementId: "G-QPTB2QXP79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const signOutOfGoogle = () =>
  signOut(auth)
    .then(() => {
      console.log("Succesfully Logged out");
    })
    .catch((error) => {
      console.log(error);
    });
// .then((result) => {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   const credential = GoogleAuthProvider.credentialFromResult(result);
//   const token = credential.accessToken;
//   // The signed-in user info.
//   const user = result.user;
//   // ...
// })
// .catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.email;
//   // The AuthCredential type that was used.
//   const credential = GoogleAuthProvider.credentialFromError(error);
//   // ...
// });

export default firebase;
