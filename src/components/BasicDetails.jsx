import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updatePhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import "../styles/FormStyles.css";

export default function StepBasicDetails({ form, setForm, next }) {
  const [emailUser, setEmailUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!auth) {
      console.error("Firebase auth is not initialized");
    }
  }, []);

  const sendEmailVerificationLink = async () => {
    if (!auth) {
      alert("Firebase authentication is not initialized");
      return;
    }
    try {
      const password = Math.random().toString(36).slice(-8) + "A1!";
      const userCred = await createUserWithEmailAndPassword(auth, form.email, password);
      setEmailUser(userCred.user);
      await sendEmailVerification(userCred.user);
      alert("Verification email sent! Please verify your email.");
    } catch (err) {
      alert("Error sending email verification: " + err.message);
    }
  };

  useEffect(() => {
    if (!emailUser) return;
    const interval = setInterval(async () => {
      await emailUser.reload();
      if (emailUser.emailVerified) {
        setEmailVerified(true);
        alert("Email verified successfully!");
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [emailUser]);

  const setupRecaptcha = () => {
    if (!auth) {
      throw new Error("Firebase auth is not initialized");
    }
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
          },
        }
      );
    }
  };

  const sendPhoneOTP = async () => {
    if (!auth) {
      alert("Firebase authentication is not initialized");
      return;
    }
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, form.mobile, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setPhoneOtpSent(true);
      alert("OTP sent");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP: " + error.message);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
  };

  const verifyCode = async () => {
    if (!auth) {
      alert("Firebase authentication is not initialized");
      return;
    }
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otpCode);
      if (auth.currentUser) {
        await updatePhoneNumber(auth.currentUser, credential);
        setPhoneVerified(true);
        alert("Mobile number verified!");
      } else {
        await signInWithCredential(auth, credential);
        setPhoneVerified(true);
        alert("Mobile number verified!");
      }
    } catch (error) {
      alert("OTP verification failed: " + error.message);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName?.trim()) newErrors.fullName = "Full Name is required";
    if (!form.orgName?.trim()) newErrors.orgName = "Organization Name is required";
    if (!form.designation?.trim()) newErrors.designation = "Designation is required";
    if (!form.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!emailVerified) newErrors.emailVerified = "Please verify your email";

    if (!form.mobile?.trim()) newErrors.mobile = "Mobile number is required";
    if (!phoneVerified) newErrors.phoneVerified = "Please verify your mobile number";

    if (!form.country?.trim()) newErrors.country = "Country is required";
    if (!form.city?.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      next();
    } else {
      alert("Please fix errors before proceeding");
    }
  };

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form-card" noValidate>
      <h2 className="form-title">Finnovation Registration</h2>
      <p className="form-subtitle">Join our innovation ecosystem</p>

      <h3 className="section-title">Basic Details</h3>

      <div className="form-group">
        <label htmlFor="fullName" className="form-label">
          Full Name / Contact Person *
        </label>
        <input
          id="fullName"
          type="text"
          className={`form-input ${errors.fullName ? "input-error" : ""}`}
          value={form.fullName}
          onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
          required
        />
        {errors.fullName && <small className="error-text">{errors.fullName}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="orgName" className="form-label">
          Organization Name *
        </label>
        <input
          id="orgName"
          type="text"
          className={`form-input ${errors.orgName ? "input-error" : ""}`}
          value={form.orgName}
          onChange={(e) => setForm((f) => ({ ...f, orgName: e.target.value }))}
          required
        />
        {errors.orgName && <small className="error-text">{errors.orgName}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="designation" className="form-label">
          Designation *
        </label>
        <input
          id="designation"
          type="text"
          className={`form-input ${errors.designation ? "input-error" : ""}`}
          value={form.designation}
          onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
          required
        />
        {errors.designation && <small className="error-text">{errors.designation}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <div className="input-with-btn">
          <input
            id="email"
            type="email"
            className={`form-input ${errors.email ? "input-error" : ""}`}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            disabled={emailVerified}
            required
          />
          {!emailVerified ? (
            <button type="button" className="verify-btn" onClick={sendEmailVerificationLink}>
              Verify
            </button>
          ) : (
            <p style={{ color: "lightgreen", marginLeft: "12px" }}>Email verified ✔️</p>
          )}
        </div>
        {errors.email && <small className="error-text">{errors.email}</small>}
        {errors.emailVerified && !emailVerified && (
          <small className="error-text">{errors.emailVerified}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="mobile" className="form-label">
          Mobile Number * (with country code, e.g., +1234567890)
        </label>
        <div className="input-with-btn">
          <input
            id="mobile"
            type="tel"
            className={`form-input ${errors.mobile ? "input-error" : ""}`}
            value={form.mobile}
            onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
            disabled={phoneVerified}
            required
          />
          {!phoneOtpSent && !phoneVerified && (
            <button type="button" className="verify-btn" onClick={sendPhoneOTP}>
              Verify
            </button>
          )}
          {phoneVerified && <p style={{ color: "lightgreen", marginTop: "8px" }}>Mobile verified ✔️</p>}
        </div>
        {errors.mobile && <small className="error-text">{errors.mobile}</small>}
        {errors.phoneVerified && !phoneVerified && (
          <small className="error-text">{errors.phoneVerified}</small>
        )}
        {phoneOtpSent && !phoneVerified && (
          <div className="input-with-btn" style={{ marginTop: 10 }}>
            <input
              type="text"
              placeholder="Enter OTP"
              className="form-input"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
            <button type="button" className="verify-btn" onClick={verifyCode}>
              Verify OTP
            </button>
          </div>
        )}
      </div>

      <div id="recaptcha-container"></div>

      <div className="form-group">
        <label htmlFor="website" className="form-label">
          Website / LinkedIn (optional)
        </label>
        <input
          id="website"
          type="url"
          className="form-input"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        />
      </div>

      <div className="form-group">
        <label htmlFor="country" className="form-label">
          Country *
        </label>
        <select
          id="country"
          className="form-select"
          value={form.country}
          onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
          required
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Australia">Australia</option>  
          <option value="Canada">Canada</option>
          <option value="Singapore">Singapore</option>
          <option value="Other">Other</option>
        </select>
        {errors.country && <small className="error-text">{errors.country}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="city" className="form-label">
          City *
        </label>
        <input
          id="city"
          type="text"
          className={`form-input ${errors.city ? "input-error" : ""}`}
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          required
        />
        {errors.city && <small className="error-text">{errors.city}</small>}
      </div>

      <div className="form-actions" style={{ marginTop: "30px" }}>
        <button type="submit" className="action-btn primary" disabled={!(emailVerified && phoneVerified)}>
          Next &rarr;
        </button>
      </div>
    </form>
  );
}
