import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZLN55qfLZHa3p2XwhGZ-A98i3H2uwj1Q",
  authDomain: "bestgrocr.firebaseapp.com",
  projectId: "bestgrocr",
  storageBucket: "bestgrocr.appspot.com",
  messagingSenderId: "614436899671",
  appId: "1:614436899671:web:f31eba5a048665de374c12",
  measurementId: "G-S9TTXPFLF6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, GoogleAuthProvider, signInWithPopup, signOut, analytics};