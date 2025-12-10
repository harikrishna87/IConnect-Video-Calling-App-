
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInAnonymously,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRaqMP74br8CZgTDbifq41hyKA-IXcEZI",
  authDomain: "notify-5339a.firebaseapp.com",
  projectId: "notify-5339a",
  storageBucket: "notify-5339a.firebasestorage.app",
  messagingSenderId: "139770666800",
  appId: "1:139770666800:web:14c6641820f278f537f2f5"
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();


export {
  googleProvider,
  auth,
  app,
  signInWithPopup,
  signInWithRedirect,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
}

