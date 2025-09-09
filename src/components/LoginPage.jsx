import React from 'react';

export default function LandingPage({ onRegisterClick, onAdminLogin }) {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Welcome to Finnovation.Tech</h1>
      <button style={styles.loginBtn} onClick={onAdminLogin}>
        Admin Login
      </button>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    borderBottom: '1px solid #ddd',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.8rem',
    color: '#18204b',
  },
  loginBtn: {
    padding: '8px 18px',
    fontWeight: '600',
    backgroundColor: '#3468f5',
    color: '#fff',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};
