// In the UserAuthProvider component file

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuth = createContext();

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser)); // Store user data in local storage
      } else {
        setUser(null);
        localStorage.removeItem("user"); // Remove user data from local storage
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuth.Provider value={{ user, signUp, signIn, logout }}>
      {children}
    </userAuth.Provider>
  );
}

export const useUserAuth = () => {
  return useContext(userAuth);
};
