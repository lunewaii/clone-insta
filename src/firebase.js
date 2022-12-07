import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { Firestore, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBtIn3wSHMneeyw5CiSR1UR6_Dbm05wyQU",
  authDomain: "clone-insta-novo-9ea46.firebaseapp.com",
  projectId: "clone-insta-novo-9ea46",
  storageBucket: "clone-insta-novo-9ea46.appspot.com",
  messagingSenderId: "547185022158",
  appId: "1:547185022158:web:2a652a92b127e295c02c9f"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth(); //login
const storage = getStorage(); //upload de arquivos
const functions = getFunctions();

export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, storage, functions };