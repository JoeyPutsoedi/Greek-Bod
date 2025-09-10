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
  apiKey: "AIzaSyAptMflfGjla54GH8ETJ4HvMsAvSujB7fk",
  authDomain: "greek-bod1.firebaseapp.com",
  projectId: "greek-bod1",
  storageBucket: "greek-bod1.firebasestorage.app",
  messagingSenderId: "529072838813",
  appId: "1:529072838813:web:2c96594220a20d31ba9c74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
