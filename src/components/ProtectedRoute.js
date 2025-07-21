// components/ProtectedRoute.js
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../context/Firebase";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) return null; // or show a spinner

  // If not logged in, redirect to home - optionally preserve redirect path
  if (!isLoggedIn)
    return <Navigate to="/" state={{ from: location }} replace />;

  return children;
};

export default ProtectedRoute;
