import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCh8G3b1rPqzyKr31D85yRpOpy1YWwZWz0",
    authDomain: "resonance-70ed1.firebaseapp.com",
    projectId: "resonance-70ed1",
    storageBucket: "resonance-70ed1.firebasestorage.app",
    messagingSenderId: "652126282202",
    appId: "1:652126282202:web:a5fcb706281a523fb5e0e3"
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
