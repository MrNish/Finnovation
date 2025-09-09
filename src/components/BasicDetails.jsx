// StepBasicDetails.jsx
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
import '../styles/FormStyles.css';

export default function StepBasicDetails({ form, setForm, next }) {
  const [emailUser, setEmailUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);

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

  const canSubmit = emailVerified && phoneVerified;

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        canSubmit ? next() : alert("Verify email and mobile first.");
      }}
      className="form-card"
    >
      <h2 className="form-title">Finnovation Registration</h2>
      <p className="form-subtitle">Join our innovation ecosystem</p>

      <h3 className="section-title">Basic Details</h3>

      <div className="form-group">
        <label className="form-label" htmlFor="fullName">
          Full Name / Contact Person *
        </label>
        <input
          id="fullName"
          type="text"
          className="form-input"
          value={form.fullName}
          onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="orgName">
          Organization Name *
        </label>
        <input
          id="orgName"
          type="text"
          className="form-input"
          value={form.orgName}
          onChange={(e) => setForm((f) => ({ ...f, orgName: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="designation">
          Designation *
        </label>
        <input
          id="designation"
          type="text"
          className="form-input"
          value={form.designation}
          onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
          required
        />
      </div>

     {/* Email */}
<div className="form-group">
  <label className="form-label" htmlFor="email">
    Email *
  </label>
  <div className="input-with-btn">
    <input
      id="email"
      type="email"
      className="form-input"
      value={form.email}
      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      required
      disabled={emailVerified}
    />
    {!emailVerified ? (
      <button
        type="button"
        className="verify-btn"
        onClick={sendEmailVerificationLink}
      >
        Verify
      </button>
    ) : (
      <p style={{ color: "green", marginLeft: 12 }}>Email verified ✔️</p>
    )}
  </div>
</div>

{/* Mobile Number */}
<div className="form-group">
  <label className="form-label" htmlFor="mobile">
    Mobile Number * (with country code, e.g., +1234567890)
  </label>
  <div className="input-with-btn">
    <input
      id="mobile"
      type="tel"
      className="form-input"
      value={form.mobile}
      onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
      required
      disabled={phoneVerified}
    />
    {!phoneOtpSent && !phoneVerified && (
      <button
        type="button"
        className="verify-btn"
        onClick={sendPhoneOTP}
      >
        Verify
      </button>
    )}
  </div>
  {phoneOtpSent && !phoneVerified && (
    <div className="input-with-btn" style={{ marginTop: 10 }}>
      <input
        type="text"
        placeholder="Enter OTP"
        className="form-input"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
      />
      <button
        type="button"
        className="verify-btn"
        onClick={verifyCode}
      >
        Verify OTP
      </button>
    </div>
  )}
  {phoneVerified && <p style={{ color: "green", marginTop: 8 }}>Mobile verified ✔️</p>}
</div>


      <div id="recaptcha-container"></div>

      <div className="form-group">
        <label className="form-label" htmlFor="website">Website / LinkedIn (optional)</label>
        <input
          id="website"
          type="url"
          className="form-input"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="country">Country *</label>
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
          {/* Add more countries as needed */}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="city">City *</label>
        <input
          id="city"
          type="text"
          className="form-input"
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          required
        />
      </div>

      <div className="form-actions" style={{ marginTop: "30px" }}>
        <button type="submit" className="action-btn primary" disabled={!canSubmit}>
          Next &rarr;
        </button>
      </div>
    </form>
  );
}
