import React, { useState, useEffect } from "react";
import { CardCss } from "../styles";
import Data from "../API/card-data";
import { NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../context/Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Card = () => {
  const [data, setData] = useState(Data);
  const [user, setUser] = useState(null);

  // Watch for login state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Handle Google Sign In
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome ${result.user.displayName}!`, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="bg-1-gradient"></div>
      <div className="card-main-container row">
        <div className="bg-2-gradient">.</div>
        {data.map((elem) => (
          <div key={elem.event_name} className="card col-lg-4">
            <img src={elem.image} alt="image" style={{ width: "100%" }} />
            <div className="data">
              <h1 className="card-title">{elem.event_name}</h1>
              <p className="card-subtitle">{elem.date}</p>
              <p className="card-info">{elem.short_description}</p>
              <div className="btn">
                {user ? (
                  <NavLink to={elem.path} className="nav-link">
                    <button className="raise">Register</button>
                  </NavLink>
                ) : (
                  <button className="raise" onClick={handleLogin}>
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Card;
