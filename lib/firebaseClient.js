// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-dbcb5.firebaseapp.com",
  projectId: "twitter-dbcb5",
  storageBucket: "twitter-dbcb5.appspot.com",
  messagingSenderId: "1032470057717",
  appId: "1:1032470057717:web:cfe9319806862765996bbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
