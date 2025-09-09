import React, { useState } from 'react';
import BasicDetails from './BasicDetails';
import SelectCategory from './SelectCategory';
import CategoryFields from './CategoryFields';
import UploadAndConsent from './UploadAndConsent';
import ReviewAndSubmit from './ReviewAndSubmit';
import '../styles/FormStyles.css';
import Stepper from './Stepper';

const steps = [
  { label: "Basic Details" },
  { label: "Select Category" },
  { label: "Category Info" },
  { label: "Uploads & Consent" },
  { label: "Review & Submit" }
];

const INIT = {
  fullName: '', orgName: '', designation: '', email: '', mobile: '', website: '', country: '', city: '',
  category: '',
  categoryFields: {},
  profileDoc: null, logoImg: null, agreeConsent: false, agreeDeclaration: false,
};

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INIT);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const handleSubmissionSuccess = () => {
    setIsSubmitted(true);
    setStep(steps.length); // set to 5 here
  };

  return (
    <div>
      <Stepper steps={steps} currentStep={isSubmitted ? steps.length : step - 1} />
      {step === 1 && <BasicDetails form={form} setForm={setForm} next={next} />}
      {step === 2 && <SelectCategory form={form} setForm={setForm} next={next} prev={prev} />}
      {step === 3 && <CategoryFields form={form} setForm={setForm} next={next} prev={prev} />}
      {step === 4 && <UploadAndConsent form={form} setForm={setForm} next={next} prev={prev} />}
      {step === 5 && (
        <ReviewAndSubmit
          form={form}
          prev={prev}
          onSubmissionSuccess={handleSubmissionSuccess}
        />
      )}
    </div>
  );
}

export default MultiStepForm;
