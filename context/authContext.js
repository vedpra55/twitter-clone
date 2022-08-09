import { useContext, createContext, useState, useEffect } from "react";

import { auth, db } from "../lib/firebaseClient";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  getDocFromServer,
  onSnapshot,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export const AuthStateContext = ({ children }) => {
  const [user, setUser] = useState();

  const provider = new GoogleAuthProvider();

  const collectionRef = collection(db, "user");

  const LoginWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, provider);
    const data = {
      name: user.displayName,
      email: user.email,
      id: user.uid,
      img: user.photoURL,
      bannerImg: "",
      bio: "",
    };

    const userExit = await getDocFromServer(doc(collectionRef, user.uid));

    if (userExit.data()) {
      setUser(userExit.data());
    } else if (userExit.data() === undefined) {
      await setDoc(doc(collectionRef, user.uid), data);
      const userRef = await getDoc(doc(collectionRef, user.uid));
      setUser(userRef.data());
    }
  };

  const Logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        onSnapshot(doc(collectionRef, user.uid), (doc) => {
          setUser(doc.data());
        });
      } else {
        setUser(null);
      }
    });
    unsuscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        LoginWithGoogle,
        user,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
