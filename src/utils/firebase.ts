import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdfK4DAhyRSZI5eoGUvZ5KJLgXM9U4nvc",
  authDomain: "responsi-mobile-2.firebaseapp.com",
  projectId: "responsi-mobile-2",
  storageBucket: "responsi-mobile-2.firebasestorage.app",
  messagingSenderId: "860065372127",
  appId: "1:860065372127:web:ded4f03a1e82b758e8566a",
  measurementId: "G-MNC4SZB9RM",
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);

const loginWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { auth, db, loginWithEmailPassword };
