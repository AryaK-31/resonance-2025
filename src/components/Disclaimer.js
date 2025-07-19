import React, { useEffect } from "react";
import "../styles/modal.css";

const Disclaimer = ({ onClose }) => {
  useEffect(() => {
    // Optional: prevent scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" id="guide" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2 className="modal-title">⚠️ Disclaimer</h2>
        <h3 className="modal-subtitle">
          Click on WEBSITE GUIDE to know how to register for an event
        </h3>
        <p className="modal-text">
          Use this site for legitimate work only. Fill the event forms with
          correct information. Miscreants or fake form fillers will face
          strict consequences.
        </p>
        <a
          href="https://example.com/website-guide"
          target="_blank"
          rel="noopener noreferrer"
          className="modal-link"
        >
          View Website Guide
        </a>
        <p className="modal-text">
          In case of any difficulty with the website (like viewing events
          or filling forms), please contact:
        </p>
        <p className="modal-email">📧 ac@myggis.org</p>
        <button onClick={onClose} className="close-btn">
          Okay, Got it!
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;
