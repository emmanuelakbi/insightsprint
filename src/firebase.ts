import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyD7z2Xr_0yXAEctmwx5dnJyIBqrkyi4rCU",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "insightsprint-ca6ea.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "insightsprint-ca6ea",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "insightsprint-ca6ea.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "922331946637",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:922331946637:web:b88f907fb5dbfb0ffa0cc4",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-TT6XVTCSMJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);
