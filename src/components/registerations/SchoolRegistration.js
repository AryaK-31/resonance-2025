import React, { useState, useEffect } from "react";
import "../../styles/schoolRegister.css";
import Navbar from "../Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth as firebaseAuth, firebaseApp } from "../../context/Firebase";
import Data from "../../API/card-data";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";

const SchoolRegistration = () => {
    const { eventName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const auth = getAuth(firebaseApp);
    const currentUser = auth.currentUser;

    const eventData = Data.find((item) => item.path === `/${eventName}`);
    const [userName, setUserName] = useState("");
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        school_name: "",
        school_address: "",
        principal_name: "",
        principal_contact: "",
        school_website: "",
        teacher_name: "",
        teacher_contact: "",
        teacher_email: "",
        drive_link: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName || "");
                setFormData((prev) => ({
                    ...prev,
                    teacher_name: user.displayName || "",
                    teacher_email: user.email || "",
                }));
            } else {
                toast.error("Session expired. Please log in again.", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored",
                });
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };
        const handlePopState = () => {
            const confirmLeave = window.confirm(
                "You are in the middle of a form. Leaving this page will lose all progress. Do you still want to continue?"
            );
            if (!confirmLeave) {
                navigate(location.pathname);
            }
        };
        if (location.pathname.includes("/register")) {
            window.addEventListener("beforeunload", handleBeforeUnload);
            window.addEventListener("popstate", handlePopState);
        }
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [location.pathname, navigate]);

    const validateStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.school_name.trim()) newErrors.school_name = "School name is required";
            if (!formData.school_address.trim()) newErrors.school_address = "School address is required";
            if (!formData.school_website.trim()) newErrors.school_website = "School website is required";
        }
        if (step === 2) {
            if (!formData.principal_name.trim()) newErrors.principal_name = "Principal name is required";
            if (!formData.principal_contact.trim()) newErrors.principal_contact = "Principal contact is required";
        }
        if (step === 3) {
            if (!formData.teacher_contact.trim()) newErrors.teacher_contact = "Teacher contact is required";
        }
        if (step === 4) {
            if (!formData.drive_link.trim()) {
                newErrors.drive_link = "Drive link is required";
            } else if (!/^https?:\/\/.+/i.test(formData.drive_link.trim())) {
                newErrors.drive_link = "Enter a valid URL starting with http:// or https://";
            }
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleNext = () => {
        const validationErrors = validateStep();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();

        if (!auth.currentUser) {
            toast.error("You are not logged in. Please log in first.", {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });
            navigate("/");
            return;
        }

        const validationErrors = validateStep();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fix the errors in the form", {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const submissionData = new FormData();
            submissionData.append("event_name", eventData?.event_name || eventName);

            const actualData = {
                ...formData,
                teacher_name: currentUser?.displayName || "",
                teacher_email: currentUser?.email || "",
            };

            Object.entries(actualData).forEach(([key, value]) =>
                submissionData.append(key, value)
            );

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbzaeHqE4DhvmHYwt7qtKJ2PXl2cJ13VQECsvdOp_gZx4dqgDOC1Cf6-BmC6Vn7uFoAhIQ/exec",
                {
                    method: "POST",
                    body: submissionData,
                }
            );

            if (response.ok) {
                toast.success("Successfully submitted!", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                });
                setShowModal(true);
                setFormData({
                    school_name: "",
                    school_address: "",
                    principal_name: "",
                    principal_contact: "",
                    school_website: "",
                    teacher_name: "",
                    teacher_contact: "",
                    teacher_email: "",
                    drive_link: "",
                });
                setStep(1);
                setErrors({});
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Submission failed. Try again.", {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h3>Step 1: School Details</h3>
                        <div className="form-group">
                            <label>School Name</label>
                            <input type="text" name="school_name" value={formData.school_name} onChange={handleChange} className={errors.school_name ? "input-error" : ""} />
                            {errors.school_name && <small className="error-text">{errors.school_name}</small>}
                        </div>
                        <div className="form-group">
                            <label>School Address</label>
                            <input type="text" name="school_address" value={formData.school_address} onChange={handleChange} className={errors.school_address ? "input-error" : ""} />
                            {errors.school_address && <small className="error-text">{errors.school_address}</small>}
                        </div>
                        <div className="form-group">
                            <label>School Website</label>
                            <input type="url" name="school_website" value={formData.school_website} onChange={handleChange} className={errors.school_website ? "input-error" : ""} />
                            {errors.school_website && <small className="error-text">{errors.school_website}</small>}
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <h3>Step 2: Principal Details</h3>
                        <div className="form-group">
                            <label>Principal Name</label>
                            <input type="text" name="principal_name" value={formData.principal_name} onChange={handleChange} className={errors.principal_name ? "input-error" : ""} />
                            {errors.principal_name && <small className="error-text">{errors.principal_name}</small>}
                        </div>
                        <div className="form-group">
                            <label>Principal Contact</label>
                            <input type="text" name="principal_contact" value={formData.principal_contact} onChange={handleChange} className={errors.principal_contact ? "input-error" : ""} />
                            {errors.principal_contact && <small className="error-text">{errors.principal_contact}</small>}
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h3>Step 3: Teacher Details</h3>
                        <div className="form-group">
                            <label>Teacher Name (Read-only)</label>
                            <input type="text" name="teacher_name" value={currentUser?.displayName || ""} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Teacher Contact</label>
                            <input type="text" name="teacher_contact" value={formData.teacher_contact} onChange={handleChange} className={errors.teacher_contact ? "input-error" : ""} />
                            {errors.teacher_contact && <small className="error-text">{errors.teacher_contact}</small>}
                        </div>
                        <div className="form-group">
                            <label>Teacher Email (Read-only)</label>
                            <input type="email" name="teacher_email" value={currentUser?.email || ""} readOnly />
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <h3>Step 4: Upload Link</h3>
                        <div className="form-group">
                            <label>Paste the Drive link with student list {"(SET ACCESS AS VIEW)"}</label>
                            <label>
                                NOTE : The list of students should be on the school letter head signed by the Principal
                            </label>
                            <h6 className="allowed-classes">Select strictly {eventData?.allowedClasses}</h6>
                            <input type="url" name="drive_link" value={formData.drive_link} onChange={handleChange} className={errors.drive_link ? "input-error" : ""} />
                            {errors.drive_link && <small className="error-text">{errors.drive_link}</small>}
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    if (!eventData) return <div>Event not found</div>;
    if (!eventData.isOpen) navigate('/not-found');

    return (
        <>
            <Navbar />
            <div className="form-container">
                <div className="form-card">
                    <div className="form-header">
                        <h2>School Registration for {eventData?.event_name}</h2>
                        <p>Step {step} of 4</p>

                    </div>
                    <form className="reg-form" onSubmit={handleEventSubmit}>
                        {renderStep()}
                        <div className="button-group">
                            {step > 1 && <button type="button" className="back-btn" onClick={handleBack}>Back</button>}
                            {step < 4 ? (
                                <button type="button" className="next-btn" onClick={handleNext}>Next</button>
                            ) : (
                                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            )}
                        </div>
                        <ToastContainer />
                    </form>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Check Your Email</h3>
                        <p>Please check for a confirmation email. If not received, contact the event in-charge.</p>
                        <button onClick={() => setShowModal(false)} className="close-btn">Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SchoolRegistration;
