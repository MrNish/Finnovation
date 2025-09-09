import React from 'react';
import '../styles/FormStyles.css';

export default function Confirmation({ email }) {
  return (
    <div className="center-content">
      <div className="success-icon">&#10004;</div>
      <div className="thank-title">Thank You!</div>
      <div className="thank-desc">
        Thank you for registering with Finnovation.Tech! Our team will review your submission and connect with you shortly.
      </div>
      <div className="email-banner">
        <span role="img" aria-label="mail">📧</span>
        A confirmation email has been sent to <b>{email}</b>
      </div>
    </div>
  );
}
