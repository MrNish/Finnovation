import React from 'react';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import '../styles/FormStyles.css';

export default function StepReview({ form, prev, onSubmissionSuccess }) {
  const [submitted, setSubmitted] = React.useState(false);

  const renderValue = (val) => {
    if (!val || val.length === 0) return <span>Not provided</span>;
    if (Array.isArray(val)) return <span>{val.join(', ')}</span>;
    return <span>{val.toString()}</span>;
  };

  const prepareDataForFirestore = () => ({
    fullName: form.fullName,
    orgName: form.orgName,
    designation: form.designation,
    email: form.email,
    mobile: form.mobile,
    website: form.website,
    country: form.country,
    city: form.city,
    category: form.category,
    categoryFields: form.categoryFields || {},
    agreeConsent: form.agreeConsent,
    agreeDeclaration: form.agreeDeclaration,
    profileDocUrl: form.profileDocUrl || null,
    logoImgUrl: form.logoImgUrl || null,
    submittedAt: Timestamp.now(),
  });

  const handleSubmit = async () => {
    try {
      const dataToSave = prepareDataForFirestore();
      const docRef = await addDoc(collection(db, "registrations"), dataToSave);
      alert(`Thank you for registering! Your registration ID: ${docRef.id}`);
      setSubmitted(true);
      if (onSubmissionSuccess) onSubmissionSuccess();
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Failed to submit registration. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="form-card" style={{ textAlign: 'center', padding: 40 }}>
        <h2>Thank you for registering with Finnovation.Tech!</h2>
        <p>Our team will review your submission and connect with you shortly.</p>
      </div>
    );
  }

  return (
   <div className="form-card">
  <h3>Step 5 - Review & Submit</h3>

  <div className="review-card">
    <h4 className="review-section-title">Basic Details</h4>
    <p><span className="review-label">Full Name / Contact Person:</span> <span className="review-value">{renderValue(form.fullName)}</span></p>
    <p><span className="review-label">Organization Name:</span> <span className="review-value">{renderValue(form.orgName)}</span></p>
    <p><span className="review-label">Designation:</span> <span className="review-value">{renderValue(form.designation)}</span></p>
    <p><span className="review-label">Email:</span> <span className="review-value">{renderValue(form.email)}</span></p>
    <p><span className="review-label">Mobile Number:</span> <span className="review-value">{renderValue(form.mobile)}</span></p>
    <p><span className="review-label">Website / LinkedIn:</span> <span className="review-value">{renderValue(form.website)}</span></p>
    <p><span className="review-label">Country:</span> <span className="review-value">{renderValue(form.country)}</span></p>
    <p><span className="review-label">City:</span> <span className="review-value">{renderValue(form.city)}</span></p>

    <h4 className="review-section-title">Category</h4>
    <p><span className="review-value">{renderValue(form.category)}</span></p>

    <h4 className="review-section-title">{form.category} Details</h4>
    {form.categoryFields && Object.entries(form.categoryFields).map(([key, val]) => (
      <div key={key} style={{ marginBottom: '8px' }}>
        <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {renderValue(val)}
      </div>
    ))}

    <h4 className="review-section-title">Consents</h4>
    <p><span className="review-label">Consent to data storage:</span> <span className="review-value">{form.agreeConsent ? 'Yes' : 'No'}</span></p>
    <p><span className="review-label">Declaration of accuracy:</span> <span className="review-value">{form.agreeDeclaration ? 'Yes' : 'No'}</span></p>

    <h4 className="review-section-title">Uploaded Files</h4>
    <p>
  <span className="review-label">Company Profile:</span> 
  <span className="review-value">
    {(form.profileDocUrl || form.profileDoc) ? 'Uploaded' : 'Not Uploaded'}
  </span>
</p>
<p>
  <span className="review-label">Logo:</span> 
  <span className="review-value">
    {(form.logoImgUrl || form.logoImg) ? 'Uploaded' : 'Not Uploaded'}
  </span>
</p>

  </div>

  <br />

  <button type="button" onClick={prev} className="action-btn" style={{ marginRight: 10 }}>
    Back (Edit)
  </button>

  <button type="button" onClick={handleSubmit} className="action-btn primary">
    Submit
  </button>
</div>

  );
}
