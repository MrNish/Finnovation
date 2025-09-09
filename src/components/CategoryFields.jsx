import React from 'react';
import '../styles/FormStyles.css';

const categoryConfig = {
  "Financial Institution": {
    fields: [
      { name: "institutionType", label: "Institution Type", type: "select", options: ["Bank", "NBFC", "Insurance", "Cooperative"], required: true },
      { name: "regLicense", label: "Regulatory License Number", type: "text", placeholder: "Enter license number (optional)", required: false },
      { name: "keyInterestAreas", label: "Key Areas of Interest", type: "checkboxes", options: ["Payments", "Lending", "Blockchain", "AI", "Cybersecurity", "Open Banking", "Digital Identity", "RegTech", "WealthTech", "InsurTech"], required: true },
      { name: "collabGoals", label: "Collaboration Goals", type: "checkboxes", options: ["Tech Adoption", "Startup Engagement", "Co-Innovation", "Regulatory Sandbox"], required: true }
    ]
  },
  "Fintech Startup": {
    fields: [
      { name: "startupStage", label: "Startup Stage", type: "select", options: ["Idea", "Early", "Growth", "Scale"], required: true },
      { name: "yearIncorporation", label: "Year of Incorporation", type: "text", placeholder: "YYYY", required: true },
      { name: "fundingStage", label: "Funding Stage", type: "select", options: ["Bootstrapped", "Seed", "Series A", "Beyond"], required: true },
      { name: "focusArea", label: "Focus Area", type: "select", options: ["Payments", "Lending", "WealthTech", "InsurTech", "RegTech", "Digital Identity"], required: true },
      { name: "activeClients", label: "Active Clients / Pilots / Use Cases", type: "textarea", placeholder: "Describe your active clients, pilots, or use cases", required: false },
      { name: "partnershipGoals", label: "Partnership Goals", type: "checkboxes", options: ["Investor Connect", "FI Partnerships", "Mentorship", "Sandbox Access"], required: true }
    ]
  },
  "Investor": {
    fields: [
      { name: "investorType", label: "Investor Type", type: "select", options: ["VC", "Angel", "PE", "Bank VC", "Family Office"], required: true },
      { name: "fundSizeRange", label: "Fund Size", type: "text", placeholder: "e.g. $100M, ₹500Cr", required: true },
      { name: "ticketSizeRange", label: "Ticket Size Range", type: "text", placeholder: "e.g. $1M - $10M", required: true },
      { name: "preferredStage", label: "Preferred Investment Stage", type: "select", options: ["Seed", "Growth", "Late"], required: true },
      { name: "focusSectors", label: "Focus Sectors", type: "checkboxes", options: ["Fintech", "AI", "Blockchain", "ESG", "Cybersecurity", "Healthcare", "EdTech"], required: true },
      { name: "portfolioHighlights", label: "Portfolio Highlights", type: "textarea", placeholder: "Describe your key portfolio companies or investment highlights", required: false },
      { name: "engagementGoals", label: "Engagement Goals", type: "checkboxes", options: ["Deal Flow", "Co-Investments", "Strategic Partnerships"], required: true }
    ]
  },
  "Ecosystem Partner": {
    fields: [
      { name: "organizationType", label: "Organization Type", type: "select", options: ["Regulator", "Tech Provider", "Accelerator", "University", "Policy Body", "Association"], required: true },
      { name: "interestAreas", label: "Interest Areas", type: "checkboxes", options: ["Innovation Policy", "Startup Engagement", "Research", "Talent Development", "Sandbox Pilots"], required: true },
      { name: "currentInitiatives", label: "Current Initiatives / Programs", type: "textarea", placeholder: "Describe your current initiatives or programs", required: false },
      { name: "collaborationInterest", label: "Collaboration Interest", type: "checkboxes", options: ["Advisory", "Research", "Capacity Building", "Policy", "Regulatory Sandbox"], required: true }
    ]
  }
};

export default function StepCategoryFields({ form, setForm, next, prev }) {
  const category = form.category;
  const config = categoryConfig[category];
  const [errors, setErrors] = React.useState({});

  if (!config) {
    return (
      <div className="form-card">
        <p>Please select a category first in Step 2.</p>
        <div className="form-actions">
          <button type="button" className="action-btn" onClick={prev}>Previous</button>
        </div>
      </div>
    );
  }

  const handleChange = (name, value, type) => {
    setForm(f => {
      let updated = { ...f.categoryFields };
      if (type === 'checkbox') {
        const currentArr = updated[name] || [];
        if (currentArr.includes(value)) {
          updated[name] = currentArr.filter(i => i !== value);
        } else {
          updated[name] = [...currentArr, value];
        }
      } else {
        updated[name] = value;
      }
      return { ...f, categoryFields: updated };
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};
    config.fields.forEach(field => {
      const val = form.categoryFields[field.name];
      if (field.required) {
        if (field.type === 'checkboxes' && (!val || val.length === 0)) {
          newErrors[field.name] = `Required`;
        } else if (field.type !== 'checkboxes' && (!val || val.toString().trim() === '')) {
          newErrors[field.name] = `Required`;
        }
      }
      if (field.name === 'yearIncorporation' && val) {
        const yearRegex = /^[0-9]{4}$/;
        if (!yearRegex.test(val)) newErrors[field.name] = 'Enter valid year (YYYY)';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      next();
    }
  };

  // UI
  return (
    <form onSubmit={handleNext} className="form-card">
      <h3 className="section-title">Category-Specific Information</h3>
      <div style={{ fontWeight: '500', marginBottom: '22px', color: '#181E41' }}>
        {category} Details
      </div>

      {config.fields.map(field => {
        const value = form.categoryFields[field.name] || (field.type === 'checkboxes' ? [] : '');
        switch (field.type) {
          case "select":
            return (
              <div className="form-group" key={field.name}>
                <label className="form-label">{field.label}{field.required ? " *" : ""}</label>
                <select
                  className="form-select"
                  value={value}
                  onChange={e => handleChange(field.name, e.target.value)}
                  required={field.required}
                >
                  <option value="">{field.placeholder ? field.placeholder : `Select Type`}</option>
                  {field.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors[field.name] && <span className="error-msg">{errors[field.name]}</span>}
              </div>
            );
          case "checkboxes":
            return (
              <div className="form-group" key={field.name}>
                <label className="form-label">{field.label}{field.required ? " *" : ""}</label>
                <div className="checkbox-list">
                  {field.options.map(opt => (
                    <label key={opt} style={{ fontWeight: 400 }}>
                      <input
                        type="checkbox"
                        checked={value.includes(opt)}
                        onChange={() => handleChange(field.name, opt, 'checkbox')}
                        style={{ marginRight: 8 }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {errors[field.name] && <span className="error-msg">{errors[field.name]}</span>}
              </div>
            );
          case "textarea":
            return (
              <div className="form-group" key={field.name}>
                <label className="form-label">{field.label}{field.required ? " *" : ""}</label>
                <textarea
                  className="form-textarea"
                  placeholder={field.placeholder || ""}
                  value={value}
                  onChange={e => handleChange(field.name, e.target.value)}
                  rows={4}
                  required={field.required}
                />
                {errors[field.name] && <span className="error-msg">{errors[field.name]}</span>}
              </div>
            );
          case "text":
          default:
            return (
              <div className="form-group" key={field.name}>
                <label className="form-label">{field.label}{field.required ? " *" : ""}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={field.placeholder || ""}
                  value={value}
                  onChange={e => handleChange(field.name, e.target.value)}
                  required={field.required}
                />
                {errors[field.name] && <span className="error-msg">{errors[field.name]}</span>}
              </div>
            );
        }
      })}

      <div className="form-actions">
        <button type="button" className="action-btn" onClick={prev}>Previous</button>
        <button type="submit" className="action-btn primary">Next</button>
      </div>
    </form>
  );
}
