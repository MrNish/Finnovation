import React from 'react';
import '../styles/Stepper.css';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper-wrap">
      <div className="stepper-progress">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className={`stepper-circle ${idx === currentStep ? 'active' : idx < currentStep ? 'done' : ''}`}>
              {idx < currentStep ? <span>&#10003;</span> : idx + 1}
            </div>
            {idx !== steps.length - 1 &&
              <div className={`stepper-bar ${idx < currentStep ? 'done' : ''}`}></div>
            }
          </React.Fragment>
        ))}
      </div>
      <div className="stepper-labels">
        {steps.map((step, idx) => (
          <div key={idx} className="stepper-label">{step.label}</div>
        ))}
      </div>
    </div>
  );
}
