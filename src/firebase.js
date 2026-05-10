import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:            "AIzaSyCWZ5qQzcuGoGvv_Es7ozi7d8zpdiQbC4I",
  authDomain:        "darkempire-clan.firebaseapp.com",
  projectId:         "darkempire-clan",
  storageBucket:     "darkempire-clan.firebasestorage.app",
  messagingSenderId: "4206683307",
  appId:             "1:4206683307:web:fcf37bf30f53644faf03ee",
  measurementId:     "G-24ZZ6F7PFY",
};

const app = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);