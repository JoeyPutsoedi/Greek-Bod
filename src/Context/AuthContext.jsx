import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { logUserLogin } from "../Utils/LogDates";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  //When Firebase auth state changes, Fetch Firestore profile----------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser || null);

      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          setProfile(snap.data() || null);
          // store full user doc, including photoURL, goal, etc.
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //When a user is logged in successfully log their date
  useEffect(() => {
    if (user) {
      logUserLogin(user.uid);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, profile, setProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
