// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//storage where images and files are stored
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_xJnKmhsgizYHXHaqlRFG590wwqIQyx0",
  authDomain: "greekbod-1.firebaseapp.com",
  projectId: "greekbod-1",
  storageBucket: "greekbod-1.firebasestorage.app",
  messagingSenderId: "613599390759",
  appId: "1:613599390759:web:f6f3daafa2d14d220bf202",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
