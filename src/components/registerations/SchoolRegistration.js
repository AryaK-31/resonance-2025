import React, { useState, useEffect } from "react";
import "../../styles/schoolRegister.css";
import Navbar from "../Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseAuth } from "../../context/Firebase";
import Data from "../../API/card-data"
import { useParams } from "react-router-dom";

const SchoolRegistration = () => {


    const { eventName } = useParams();

    console.log('event name', eventName);

    const eventData = Data.find((item) => item.path === `/${eventName}`);
    console.log(eventData);


    const [userName, setUserName] = useState("");
    const [step, setStep] = useState(1); // Track the current form step
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

    useEffect(() => {
        const currentUser = firebaseAuth.currentUser;
        if (currentUser) {
            setUserName(currentUser.displayName || "");
        }
    }, []);

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
            if (!formData.teacher_name.trim()) newErrors.teacher_name = "Teacher name is required";
            if (!formData.teacher_contact.trim()) newErrors.teacher_contact = "Teacher contact is required";
            if (!formData.teacher_email.trim()) {
                newErrors.teacher_email = "Teacher email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.teacher_email)) {
                newErrors.teacher_email = "Invalid email format";
            }
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
            setErrors({ ...errors, [name]: "" }); // Clear error on change
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
            submissionData.append("event_name", eventData?.event_name || eventName)
            Object.entries(formData).forEach(([key, value]) =>
                submissionData.append(key, value)
            );

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbzdIPjBBQXvkqLVLYbydUegew4i4zOBWf1pL5YFM838gPu_YzH5xs7vzzF-n-bJPrJWEw/exec",
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
                        <h3 classname="">Step 1: School Details</h3>
                        <div className="form-group">
                            <label htmlFor="school_name">School Name</label>
                            <input
                                type="text"
                                name="school_name"
                                value={formData.school_name}
                                onChange={handleChange}
                                placeholder="Enter school name"
                                className={errors.school_name ? "input-error" : ""}
                            />
                            {errors.school_name && <small className="error-text">{errors.school_name}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="school_address">School Address</label>
                            <input
                                type="text"
                                name="school_address"
                                value={formData.school_address}
                                onChange={handleChange}
                                placeholder="Enter school address"
                                className={errors.school_address ? "input-error" : ""}
                            />
                            {errors.school_address && <small className="error-text">{errors.school_address}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="school_website">School Website</label>
                            <input
                                type="url"
                                name="school_website"
                                value={formData.school_website}
                                onChange={handleChange}
                                placeholder="Enter school website URL"
                                className={errors.school_website ? "input-error" : ""}
                            />
                            {errors.school_website && <small className="error-text">{errors.school_website}</small>}
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <h3 classname="]">Step 2: Principal Details</h3>
                        <div className="form-group">
                            <label htmlFor="principal_name">Principal Name</label>
                            <input
                                type="text"
                                name="principal_name"
                                value={formData.principal_name}
                                onChange={handleChange}
                                placeholder="Enter principal's name"
                                className={errors.principal_name ? "input-error" : ""}
                            />
                            {errors.principal_name && <small className="error-text">{errors.principal_name}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="principal_contact">Principal Contact</label>
                            <input
                                type="text"
                                name="principal_contact"
                                value={formData.principal_contact}
                                onChange={handleChange}
                                placeholder="Enter principal's contact"
                                className={errors.principal_contact ? "input-error" : ""}
                            />
                            {errors.principal_contact && <small className="error-text">{errors.principal_contact}</small>}
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h3 classname="]">Step 3: Teacher Details</h3>
                        <div className="form-group">
                            <label htmlFor="teacher_name">Teacher Name</label>
                            <input
                                type="text"
                                name="teacher_name"
                                value={formData.teacher_name}
                                onChange={handleChange}
                                placeholder="Enter teacher's name"
                                className={errors.teacher_name ? "input-error" : ""}
                            />
                            {errors.teacher_name && <small className="error-text">{errors.teacher_name}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="teacher_contact">Teacher Contact</label>
                            <input
                                type="text"
                                name="teacher_contact"
                                value={formData.teacher_contact}
                                onChange={handleChange}
                                placeholder="Enter teacher's contact"
                                className={errors.teacher_contact ? "input-error" : ""}
                            />
                            {errors.teacher_contact && <small className="error-text">{errors.teacher_contact}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="teacher_email">Teacher Email</label>
                            <input
                                type="email"
                                name="teacher_email"
                                value={formData.teacher_email}
                                onChange={handleChange}
                                placeholder="Enter teacher's email"
                                className={errors.teacher_email ? "input-error" : ""}
                            />
                            {errors.teacher_email && <small className="error-text">{errors.teacher_email}</small>}
                        </div>

                    </>
                );
            case 4:
                return (
                    <>
                        <h3 classname="">Step 4: Upload Link</h3>
                        <div className="form-group">
                            <label htmlFor="drive_link">Google Drive Link to Students List</label>
                            <h6 className="allowed-classes"> Kindly Note that you have select strictly {eventData?.allowedClasses}</h6>
                            <input
                                type="url"
                                name="drive_link"
                                value={formData.drive_link}
                                onChange={handleChange}
                                placeholder="Paste Google Drive link here"
                                className={errors.drive_link ? "input-error" : ""}
                            />
                            {errors.drive_link && <small className="error-text">{errors.drive_link}</small>}
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <div className="form-card">
                    <div className="form-header">
                        <h2>School Registration for {eventData?.event_name}</h2>
                        <p>Step {step} of 4</p>
                    </div>
                    <form className="reg-form" onSubmit={handleEventSubmit} id="form">
                        {renderStep()}
                        <div className="button-group">
                            {step > 1 && (
                                <button type="button" className="back-btn" onClick={handleBack}>
                                    Back
                                </button>
                            )}
                            {step < 4 ? (
                                <button type="button" className="next-btn" onClick={handleNext}>
                                    Next
                                </button>
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
        </>
    );
};

export default SchoolRegistration;
