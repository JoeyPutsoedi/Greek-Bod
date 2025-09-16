import React from "react";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

/*Function To store the days in which a user logged in to show them on the calendar*/
export const logUserLogin = async (userId) => {
  const today = new Date().toISOString().split("T")[0];
  const ref = doc(db, "users", userId, "logins", today);

  await setDoc(ref, { loggedIn: true, timestamp: new Date() }, { merge: true });
};

/*Function to get the specific days from the "logins* collection defined in logUserLogin*/
export const getLoginDates = async (userId) => {
  const ref = collection(db, "users", userId, "logins");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.id);
};
