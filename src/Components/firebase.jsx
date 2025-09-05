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
  apiKey: "AIzaSyAoW7bgNW82nGQG2eadOvuLCRcNmjcQKsE",
  authDomain: "greek-bod.firebaseapp.com",
  projectId: "greek-bod",
  storageBucket: "greek-bod.firebasestorage.app",
  messagingSenderId: "24438686256",
  appId: "1:24438686256:web:d926c59fcfbdc25ddd23f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
