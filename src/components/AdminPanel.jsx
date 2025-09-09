import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from '../styles/AdminPanel.module.css';

const categories = ['Financial Institution', 'Fintech Startup', 'Investor', 'Ecosystem Partner'];

export default function AdminPanel({ onLogout }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [filter, setFilter] = useState({ category: '', country: '', interest: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (onLogout) onLogout();
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    async function fetchData() {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'registrations'));
        const regs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRegistrations(regs);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        alert('Failed to load registrations!');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [isLoggedIn]);

  const filteredData = registrations.filter(
    (r) =>
      (!filter.category || r.category === filter.category) &&
      (!filter.country || r.country?.toLowerCase().includes(filter.country.toLowerCase())) &&
      (!filter.interest || r.interestArea?.toLowerCase().includes(filter.interest.toLowerCase()))
  );

  const registrationCount = registrations.length;

  const categoryCounts = categories.map((cat) => ({
    category: cat,
    count: registrations.filter((r) => r.category === cat).length,
  }));

  const exportCSV = () => {
    if (filteredData.length === 0) {
      alert('No records to export');
      return;
    }
    const headers = ['Name', 'Email', 'Category', 'Country', 'Interest Area'];
    const rows = filteredData.map((r) => [
      r.fullName || '',
      r.email || '',
      r.category || '',
      r.country || '',
      r.interestArea || '',
    ]);
    const csvContent =
      [headers, ...rows].map((e) => e.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Finnovation_registrations.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

if (!isLoggedIn) {
  return (
    <div className={styles['admin-login-box']}>
      <h2>Admin Login</h2>
      <p>Enter your credentials to access the Finnovation team dashboard.</p>
      <button className={styles.loginButton} onClick={handleLogin}>
        Login as Admin
      </button>
    </div>
  );
}


  return (
    <div className={styles['admin-dashboard']}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
        <h1>Finnovation Admin Dashboard</h1>
        <button className={`${styles.logoutButton || styles.loginButton}`} onClick={handleLogout}>
  Logout
</button>

      </header>

      <section className={styles['dashboard-metrics']}>
        <div>Total Registrations: {registrationCount}</div>
        {categoryCounts.map(({ category, count }) => (
          <div key={category}>
            {category}: {count}
          </div>
        ))}
      </section>

      <section className={styles['filters-row']}>
        <select
          value={filter.category}
          onChange={(e) => setFilter((f) => ({ ...f, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filter by country"
          value={filter.country}
          onChange={(e) => setFilter((f) => ({ ...f, country: e.target.value }))}
          style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: '#18192a', color: '#dde2f0', minWidth: 180 }}
        />

        <input
          type="text"
          placeholder="Filter by interest area"
          value={filter.interest}
          onChange={(e) => setFilter((f) => ({ ...f, interest: e.target.value }))}
          style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: '#18192a', color: '#dde2f0', minWidth: 180 }}
        />
      </section>

      {loading ? (
        <p>Loading registrations...</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Category</th>
                <th>Country</th>
                <th>Interest Area</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: 20 }}>
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filteredData.map((r) => (
                  <tr key={r.id}>
                    <td>{r.fullName || '-'}</td>
                    <td>{r.email || '-'}</td>
                    <td>{r.category || '-'}</td>
                    <td>{r.country || '-'}</td>
                    <td>{r.interestArea || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <button className={styles['export-btn']} onClick={exportCSV}>
            Export CSV
          </button>
        </>
      )}
    </div>
  );
}
