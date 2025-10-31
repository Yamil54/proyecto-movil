// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrS-f7m_zXndnEFccpQYohYwGosenhVqI",
  authDomain: "proyecto-b2ec5.firebaseapp.com",
  projectId: "proyecto-b2ec5",
  storageBucket: "proyecto-b2ec5.appspot.com",
  messagingSenderId: "1069219232829",
  appId: "1:1069219232829:web:80ab3cc2270ab3bd08fe54",
};

// Inicializar la app
const app = initializeApp(firebaseConfig);

// ✅ Auth con persistencia en AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore y Storage
export const db = getFirestore(app);
export const storage = getStorage(app);