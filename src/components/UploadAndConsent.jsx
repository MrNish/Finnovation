import React, { useState } from 'react';
import '../styles/FormStyles.css';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgfqrseb4/upload";
const UPLOAD_PRESET = "upload_preset";

export default function StepUploadAndConsent({ form, setForm, next, prev }) {
  const [errors, setErrors] = useState({});
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.profileDocUrl) newErrors.profileDocUrl = "Company Profile / Pitch Deck is required";
    if (!form.logoImgUrl) newErrors.logoImgUrl = "Logo is required";
    if (!form.agreeConsent) newErrors.agreeConsent = "Consent is required";
    if (!form.agreeDeclaration) newErrors.agreeDeclaration = "Declaration is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Upload file to Cloudinary function
  const uploadToCloudinary = (file, setUploadingFunc, callback) => {
    setUploadingFunc(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        // data.secure_url contains the uploaded file URL
        callback(data.secure_url);
        console.log('Upload successful:', data.secure_url);
        setUploadingFunc(false);
      })
      .catch(err => {
        alert('Upload failed. Please try again.');
        setUploadingFunc(false);
      });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fieldName === 'profileDocUrl') {
      uploadToCloudinary(file, setUploadingProfile, (url) => {
        setForm(f => ({ ...f, profileDocUrl: url }));
      });
    } else if (fieldName === 'logoImgUrl') {
      uploadToCloudinary(file, setUploadingLogo, (url) => {
        setForm(f => ({ ...f, logoImgUrl: url }));
      });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validate()) return;
    next();
  };

  return (
    <form onSubmit={handleNext} className="form-card">
      <h3 className="section-title">Uploads & Consent</h3>

      {/* Upload Company Profile */}
      <div className="form-group">
        <div className="form-label" style={{ fontWeight: 500 }}>
          Upload Company Profile / Pitch Deck (PDF, Max 10MB) *
        </div>

        <div className="upload-card-box">
          <span className="upload-icon">&#8682;</span>
          <div className="upload-desc">Drop your PDF file here or click to browse</div>
          <div className="upload-note">PDF format, Max 10MB</div>
          <label htmlFor="profileDocUrl">
            <input
              id="profileDocUrl"
              type="file"
              accept="application/pdf"
              style={{ display: 'none' }}
              disabled={uploadingProfile}
              onChange={(e) => handleFileChange(e, 'profileDocUrl')}
            />
            <button
              type="button"
              className="upload-btn"
              disabled={uploadingProfile}
              onClick={() => document.getElementById('profileDocUrl').click()}
            >
              {uploadingProfile ? "Uploading..." : "Choose File"}
            </button>
            {form.profileDocUrl && (
              <div style={{ marginTop: 8, color: "#166943", fontSize: "0.95rem" }}>File uploaded!</div>
            )}
          </label>
        </div>
        {errors.profileDocUrl && <span className="error-msg">{errors.profileDocUrl}</span>}
      </div>

      {/* Upload Logo */}
      <div className="form-group">
        <div className="form-label" style={{ fontWeight: 500 }}>
          Upload Logo (PNG/JPG, Max 2MB) *
        </div>
        <div className="upload-card-box">
          <span className="upload-icon">&#8682;</span>
          <div className="upload-desc">Drop your logo here or click to browse</div>
          <div className="upload-note">PNG/JPG format, Max 2MB</div>
          <label htmlFor="logoImgUrl">
            <input
              id="logoImgUrl"
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: 'none' }}
              disabled={uploadingLogo}
              onChange={(e) => handleFileChange(e, 'logoImgUrl')}
            />
            <button
              type="button"
              className="upload-btn"
              disabled={uploadingLogo}
              onClick={() => document.getElementById('logoImgUrl').click()}
            >
              {uploadingLogo ? "Uploading..." : "Choose File"}
            </button>
            {form.logoImgUrl && (
              <div style={{ marginTop: 8, color: "#166943", fontSize: "0.95rem" }}>File uploaded!</div>
            )}
          </label>
        </div>
        {errors.logoImgUrl && <span className="error-msg">{errors.logoImgUrl}</span>}
      </div>

      {/* Consent Checkboxes */}
      <div className="checkbox-row">
        <label>
          <input
            type="checkbox"
            checked={form.agreeConsent || false}
            onChange={e => setForm(f => ({ ...f, agreeConsent: e.target.checked }))}
            style={{ marginRight: 8 }}
          />
          I consent to Finnovation.Tech storing and processing my data for collaboration purposes. *
        </label>
        {errors.agreeConsent && <span className="error-msg">{errors.agreeConsent}</span>}
      </div>
      <div className="checkbox-row">
        <label>
          <input
            type="checkbox"
            checked={form.agreeDeclaration || false}
            onChange={e => setForm(f => ({ ...f, agreeDeclaration: e.target.checked }))}
            style={{ marginRight: 8 }}
          />
          I confirm all details provided are accurate. *
        </label>
        {errors.agreeDeclaration && <span className="error-msg">{errors.agreeDeclaration}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="action-btn" onClick={prev} disabled={uploadingProfile || uploadingLogo}>Previous</button>
        <button type="submit" className="action-btn primary" disabled={uploadingProfile || uploadingLogo}>
          Next
        </button>
      </div>
    </form>
  );
}
