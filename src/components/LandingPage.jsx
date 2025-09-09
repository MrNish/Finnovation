import React from 'react';
import styles from '../styles/LandingPage.module.css';

const categories = [
  { label: 'Financial Institution', icon: '🏦' },
  { label: 'Fintech Startup', icon: '🚀' },
  { label: 'Investor', icon: '💰' },
  { label: 'Ecosystem Partner', icon: '🤝' },
];

function LandingPage({ onRegisterClick, onAdminLogin }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>Finnovation.Tech</div>
        <button className={styles.loginButton} onClick={onAdminLogin}>
          Admin Login
        </button>
      </header>

      <main className={styles.main}>
        <h2 className={styles.subtitle}>
          Register with Finnovation – Connect, Collaborate,<br /> Co-Innovate
        </h2>
        <p className={styles.description}>
          Financial Institutions, Fintech Startups, Investors, and Ecosystem Partners can join
          Finnovation to explore opportunities, partnerships, and innovation.
        </p>

        <section className={styles.categories}>
          {categories.map((cat) => (
            <div key={cat.label} className={styles.categoryCard}>
              <span className={styles.categoryIcon}>{cat.icon}</span>
              {cat.label}
            </div>
          ))}
        </section>

        <button onClick={onRegisterClick} className={styles.registerButton}>
          Register Now &rarr;
        </button>
      </main>
    </div>
  );
}

export default LandingPage;
