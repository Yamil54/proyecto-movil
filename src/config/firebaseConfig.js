import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // opcional

const firebaseConfig = {
  apiKey: "AIzaSyBrS-f7m_zXndnEFccpQYohYwGosenhVqI",
  authDomain: "proyecto-b2ec5.firebaseapp.com",
  projectId: "proyecto-b2ec5",
  storageBucket: "proyecto-b2ec5.appspot.com", // corregido
  messagingSenderId: "1069219232829",
  appId: "1:1069219232829:web:80ab3cc2270ab3bd08fe54",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);