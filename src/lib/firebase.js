import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1tYifxbJJC8PNNv5jLveUTXNlMUQ0_1I",
  authDomain: "reactchat-8c103.firebaseapp.com",
  projectId: "reactchat-8c103",
  storageBucket: "reactchat-8c103.appspot.com",
  messagingSenderId: "755290309594",
  appId: "1:755290309594:web:58b48fd472f722cd6176e3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);  // Initialize with app
export const db = getFirestore(app);  // Initialize with app
export const storage = getStorage(app);  // Initialize with app
