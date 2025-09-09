import React, { useState } from 'react';
import '../styles/FormStyles.css';

const categoryData = [
  {
    value: "Financial Institution",
    icon: "🏦",
    label: "Financial Institution"
  },
  {
    value: "Fintech Startup",
    icon: "🚀",
    label: "Fintech Startup"
  },
  {
    value: "Investor",
    icon: "💰",
    label: "Investor"
  },
  {
    value: "Ecosystem Partner",
    icon: "🤝",
    label: "Ecosystem Partner"
  }
];

export default function StepSelectCategory({ form, setForm, next, prev }) {
  const [error, setError] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (!form.category) {
      setError('Please select a category to continue');
    } else {
      setError('');
      next();
    }
  };

  return (
    <form onSubmit={handleNext} className="form-card">
      <h3 className="section-title">Select Category</h3>

      <div style={{ marginBottom: '32px' }}>
        {categoryData.map(cat => (
          <div
            key={cat.value}
            className={`category-option${form.category === cat.value ? ' selected' : ''}`}
            onClick={() => setForm(f => ({ ...f, category: cat.value }))}
            tabIndex={0}
            role="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              cursor: 'pointer',
              background: form.category === cat.value ? '#f3f6fa' : '#fff',
              border: '1.5px solid #e0e5ed',
              borderRadius: '10px',
              padding: '18px 22px',
              boxShadow: 'none',
              fontWeight: 500,
              marginBottom: '18px',
              outline: form.category === cat.value ? '2px solid #3468f5' : 'none'
            }}
          >
            <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
            <span style={{ fontSize: '1.08rem', color: form.category === cat.value ? '#3468f5' : '#242c3e'}}>
              {cat.label}
            </span>
            <input
              type="radio"
              name="category"
              value={cat.value}
              checked={form.category === cat.value}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              style={{ display: 'none' }}
            />
          </div>
        ))}
      </div>

      <div style={{ color: 'red', minHeight: '16px', marginBottom: '8px' }}>{error}</div>
      
      <div className="form-actions">
        <button type="button" className="action-btn" onClick={prev}>Previous</button>
        <button type="submit" className="action-btn primary">Next</button>
      </div>
    </form>
  );
}
