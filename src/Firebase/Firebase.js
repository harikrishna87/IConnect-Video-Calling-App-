
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
  apiKey: "AIzaSyCeqk3JJhAnTJdGB7iZBIS0srHJLzJJ91E",
  authDomain: "vcar-9b07a.firebaseapp.com",
  projectId: "vcar-9b07a",
  storageBucket: "vcar-9b07a.firebasestorage.app",
  messagingSenderId: "739056149851",
  appId: "1:739056149851:web:e3bd682272650c79cce67e"
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

