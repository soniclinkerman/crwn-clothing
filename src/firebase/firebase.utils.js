// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  // console.log("snapshot:", snapShot);
  // console.log("exists? :", snapShot.exists());

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName: displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("ERROR CREATING USER");
    }
  }
  return userRef;
};

// Initialize Firebase
initializeApp(firebaseConfig);

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

export default firebase;
