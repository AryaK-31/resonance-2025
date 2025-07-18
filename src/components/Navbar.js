import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { firebaseApp, useFirebase } from "../context/Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResonanceMainLogo from "../assets/ResonanceMainLogo.png";

const auth = getAuth(firebaseApp);

const Navbar = () => {
  const firebase = useFirebase();

  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false); 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("You are logged out");
        setUser(null);
      }
    });

    // ✅ Scroll listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (user === null) {
    return (
      <>
        <nav
          className={`navbar navbar-expand-lg sticky-top ${
            isScrolled ? "navbar-scrolled" : "navbar-transparent"
          }`}
        >
          <div className="container-fluid">
            <Link
              to="/"
              className="navbar-brand title"
              style={{ textDecoration: "none", border: "none" }}
            >
              <img src={ResonanceMainLogo} className="img-fluid logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <img src="menu.png" alt="" className="menu-img" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    <span className="navitem">Home</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/events" className="nav-link">
                    <span className="navitem">Events</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/calender" className="nav-link">
                    <span className="navitem">Calendar</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() =>
                      firebase
                        .signupWithGoogle()
                        .then((userCredential) => {
                          const user = userCredential.user;
                          console.log(user.email);
                          toast.success(`Welcome ${user.displayName}!`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          });
                        })
                        .catch((error) => {
                          console.error(error);
                        })
                    }
                    href="#"
                    className="login-navitem navitem"
                  >
                    Log in
                  </a>
                  <ToastContainer />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg sticky-top ${
          isScrolled ? "navbar-scrolled" : "navbar-transparent"
        }`}
      >
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand title">
            <img src={ResonanceMainLogo} className="img-fluid logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img src="menu.png" alt="" className="menu-img" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  <span className="navitem">Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/events" className="nav-link">
                  <span className="navitem">Events</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/calender" className="nav-link">
                  <span className="navitem">Calendar</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => signOut(auth)}
                  href="#"
                  className="login-navitem navitem"
                >
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
