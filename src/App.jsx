import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MultiStepForm from './components/MultiStepForm';

function App() {
  const [view, setView] = React.useState('landing');

  const handleAdminLogin = () => {
    // Show admin panel, open login modal, or navigate to login page
    setView('adminLogin');
  };

  return (
    <>
      {view === 'landing' && (
        <LandingPage onRegisterClick={() => setView('form')} onAdminLogin={handleAdminLogin} />
      )}
      {view === 'form' && <MultiStepForm />}
      {/* Add admin login or panel view here */}
    </>
  );
}

export default App;
