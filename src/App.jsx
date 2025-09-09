import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MultiStepForm from './components/MultiStepForm';
import AdminPanel from './components/AdminPanel'; // Create this component

function App() {
  const [view, setView] = useState('landing');

  const handleAdminLogin = () => {
    setView('adminLogin'); // Navigate to admin view
  };

  const handleAdminLogout = () => {
    setView('landing'); // Admin logout
  };

  return (
    <>
      {view === 'landing' && (
        <LandingPage
          onRegisterClick={() => setView('form')}
          onAdminLogin={handleAdminLogin}
        />
      )}

      {view === 'form' && (
        <MultiStepForm
          onCancel={() => setView('landing')} // Optional back navigation from form
          onComplete={() => setView('landing')} // Or wherever after submit
        />
      )}

      {view === 'adminLogin' && (
        <AdminPanel onLogout={handleAdminLogout} />
      )}
    </>
  );
}

export default App;
