import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDH3pWboqAz92TXbpompjAPxQF3cqbD84Y",
  authDomain: "sivanetflixclone.firebaseapp.com",
  projectId: "sivanetflixclone",
  storageBucket: "sivanetflixclone.appspot.com",
  messagingSenderId: "869494547006",
  appId: "1:869494547006:web:f8a121cedce45c35aca76f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { app, auth, db };
