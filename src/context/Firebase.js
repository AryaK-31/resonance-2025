import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

// Create a context
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

// Provide helper methods
export const FirebaseProvider = ({ children }) => {
    const signupWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Logged in user:", result.user);
            return result; // Return result to caller
        } catch (error) {
            console.error("Google sign-in error:", error);
            throw error;
        }
    };

    return (
        <FirebaseContext.Provider value={{ signupWithGoogle }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export { firebaseApp, auth, provider };
