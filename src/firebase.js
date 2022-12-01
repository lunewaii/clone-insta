import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyABrqIXAWegJoHrLo72isvCLmVzE_ksGks",
  authDomain: "clone-instagram001.firebaseapp.com",
  projectId: "clone-instagram001",
  storageBucket: "clone-instagram001.appspot.com",
  messagingSenderId: "178063030894",
  appId: "1:178063030894:web:59d1f02c2ca4fbeea5447f",
  measurementId: "G-8GTMKM1XRV"
});

const db = getFirestore();
const auth = getAuth(); //login
const storage = getStorage(); //upload de arquivos
const functions = getFunctions();

export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, storage, functions };