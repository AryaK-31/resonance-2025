import React, { useState, useEffect } from "react";
import "./Webbit.css";
import Navbar from "../Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseAuth } from "../../context/Firebase";

const EventRegister = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get the display name of the current user
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      setUserName(currentUser.displayName || "");
    }
  }, []);

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("form"));

    fetch(
      "https://script.google.com/macros/s/AKfycbzUgBgdPBYsVZ_d2cC_p0uyTv2xokpwyTX201_BZoIueVrOGOz8r2Bx_B9Oc03uL1FaxA/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then(() => {
        toast.success("Successfully submitted!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        document.getElementById("form").reset();
      })
      .catch((error) => {
        console.error("Submission error:", error);
        toast.error("Submission failed. Try again.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      });

    toast.info("Submitting form, please wait...", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div className="col-lg-7 col-md-12 col-12 form-step">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className="font-normal">Event Registration</h2>
            <p id="registration-info">
              Please fill in the details carefully before submitting.
            </p>
          </div>

          <form
            className="reg-form"
            onSubmit={handleEventSubmit}
            id="form"
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              defaultValue={userName}
              required
            />

            <label htmlFor="roll_no">Roll Number</label>
            <input
              type="text"
              name="roll_no"
              placeholder="Ex: TYCOC233"
              required
            />

            <label htmlFor="division">Division</label>
            <input
              type="text"
              name="division"
              placeholder="Enter your division"
              required
            />

            <label htmlFor="school_name">School Name</label>
            <input
              type="text"
              name="school_name"
              placeholder="Enter your school name"
              required
            />

            <label htmlFor="event">School Name</label>
            <input
              type="text"
              name="event"
              placeholder="event"
              required
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button type="submit" className="pulse">
                Submit
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventRegister;
