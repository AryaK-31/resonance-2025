import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { firebaseApp, useFirebase } from "../context/Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResonanceMainLogo from "../assets/ResonanceMainLogo.png";
import Disclaimer from "./Disclaimer"; // 👈 Import Disclaimer Modal

const auth = getAuth(firebaseApp);

const Navbar = () => {
  const firebase = useFirebase();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false); // 👈 Modal state

  // 👀 Detect if user is on a form page
  const isOnForm = location.pathname.includes("/register");

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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🛡️ Guard for navigating away during form progress
  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (isOnForm) {
      const confirmLeave = window.confirm(
        "You are in the middle of a form. Leaving this page will lose all progress. Do you still want to continue?"
      );
      if (!confirmLeave) return;
    }
    navigate(path);
  };

  if (user === null) {
    return (
      <>
        {showModal && <Disclaimer onClose={() => setShowModal(false)} />}
        <nav
          className={`navbar navbar-expand-lg sticky-top ${isScrolled ? "navbar-scrolled" : "navbar-transparent"
            }`}
        >
          <div className="container-fluid">
            <Link
              to="/"
              className="navbar-brand title"
              style={{ textDecoration: "none", border: "none" }}
              onClick={(e) => handleNavClick(e, "/")} // 👈 Added check for logo click
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
                  <a
                    href="/"
                    className="nav-link"
                    onClick={(e) => handleNavClick(e, "/")}
                  >
                    <span className="navitem">Home</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/events"
                    className="nav-link"
                    onClick={(e) => handleNavClick(e, "/events")}
                  >
                    <span className="navitem">Events</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(true); // 👈 Open modal on Guide click
                    }}
                  >
                    <span className="navitem">Guide</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/calender"
                    className="nav-link"
                    onClick={(e) => handleNavClick(e, "/calender")}
                  >
                    <span className="navitem">Calendar</span>
                  </a>
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
      {showModal && <Disclaimer onClose={() => setShowModal(false)} />}
      <nav
        className={`navbar navbar-expand-lg sticky-top ${isScrolled ? "navbar-scrolled" : "navbar-transparent"
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
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  href="/"
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, "/")}
                >
                  <span className="navitem">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/events"
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, "/events")}
                >
                  <span className="navitem">Events</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
                  <span className="navitem">Guide</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/calender"
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, "/calender")}
                >
                  <span className="navitem">Calendar</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => {
                    if (isOnForm) {
                      const confirmLogout = window.confirm(
                        "You are in the middle of a form. Logging out will lose all progress. Continue?"
                      );
                      if (!confirmLogout) return;
                    }
                    signOut(auth);
                  }}
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
