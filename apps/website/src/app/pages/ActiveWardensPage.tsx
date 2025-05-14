// apps/website/src/app/pages/ActiveWardensPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'apps/website/src/styles.css';
import logo from '../../assets/Univeristy-of-Winchester.webp';

interface ActiveWarden {
  staffNum: string;
  username: string;
  location: string;
  startTime: string;
}

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const stored = localStorage.getItem('warden');
  const isAdmin = stored ? JSON.parse(stored).isAdmin : false;

  return (
    <header className="navbar">
      <img
        src={logo}
        alt="University Logo"
        className="navbar-logo"
        onClick={() => navigate('/home')}
      />
      <nav>
        <ul className="nav-links">
          <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/records')}>Records</li>
          {isAdmin && (
            <li onClick={() => navigate('/active-wardens')}>Active Wardens</li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const ActiveWardensPage: React.FC = () => {
  const [wardens, setWardens] = useState<ActiveWarden[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch ALL open records, no per-user filter
        const { data } = await axios.get<ActiveWarden[]>(
          '/api/stats/active-wardens'
        );
        setWardens(data);
      } catch {
        setError('Failed to load active records');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="background">
      <NavBar />
      <div style={{ padding: '80px 1rem 2rem' }}>
        <section
          className="card"
          style={{ width: '80%', maxWidth: '800px', margin: '0 auto' }}
        >
          <h2 className="title">Open Records</h2>
          {loading ? (
            <p>Loading…</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : wardens.length === 0 ? (
            <p>No open records found.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
              <tr>
                <th style={thStyle}>Staff #</th>
                <th style={thStyle}>Username</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Start Time</th>
              </tr>
              </thead>
              <tbody>
              {wardens.map(w => (
                <tr key={w.staffNum + w.startTime}>
                  <td style={tdStyle}>{w.staffNum}</td>
                  <td style={tdStyle}>{w.username}</td>
                  <td style={tdStyle}>{w.location}</td>
                  <td style={tdStyle}>
                    {new Date(w.startTime).toLocaleString()}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem',
  borderBottom: '1px solid #ddd',
};

const tdStyle: React.CSSProperties = {
  padding: '0.5rem',
  borderBottom: '1px solid #f0f0f0',
};

export default ActiveWardensPage;
