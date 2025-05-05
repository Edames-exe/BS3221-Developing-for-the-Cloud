// src/app/pages/homePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line @nx/enforce-module-boundaries
import 'apps/website/src/styles.css';
// Import logo image
import logo from '../../assets/Univeristy-of-Winchester.webp';

interface LocationOption {
  id: number;
  name: string;
}

// NavBar component
function NavBar() {
  const navigate = useNavigate();
  return (
    <nav
      className="card"
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 2rem)',
        maxWidth: '1200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="University of Winchester Logo" style={{ height: '50px' }} />
      </div>
      <ul className="nav-links" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', gap: '1rem' }}>
        <li onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Home</li>
        <li onClick={() => navigate('/entries')} style={{ cursor: 'pointer' }}>Entered Records</li>
        <li style={{ cursor: 'pointer' }}>Other Stuff</li>
      </ul>
    </nav>
  );
}

// Entry form component
const EnterDetailsForm: React.FC = () => {
  const stored = localStorage.getItem('warden');
  let initialStaff = '';
  let initialName = '';
  if (stored) {
    try {
      const obj = JSON.parse(stored);
      initialStaff = obj.staffNum;
      initialName = obj.username;
    } catch {}
  }

  const [name, setName] = useState(initialName);
  const [staffNo, setStaffNo] = useState(initialStaff);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [locationId, setLocationId] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<LocationOption[]>('/api/locations')
      .then(res => setLocations(res.data))
      .catch(err => console.error('Failed to load locations:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!locationId) {
      setError('Please select a location.');
      return;
    }
    try {
      await axios.post('/api/records', {
        staffNum: staffNo,
        locationId,
        startTime: new Date().toISOString(),
        endTime: null,
      });
      setSuccess('Record saved successfully');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save record.');
    }
  };

  return (
    <div className="card" style={{ flex: 1, minWidth: '300px' }}>
      <h2 className="title">Enter Details</h2>
      {error && <div className="login-error">{error}</div>}
      {success && <div className="login-error" style={{ color: 'green' }}>{success}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="label">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Enter name"
          className="input"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <label htmlFor="staffNo" className="label">Staff No.:</label>
        <input
          id="staffNo"
          type="text"
          placeholder="Enter staff number"
          className="input"
          value={staffNo}
          onChange={e => setStaffNo(e.target.value)}
          required
        />
        <label htmlFor="location" className="label">Location:</label>
        <select
          id="location"
          className="input"
          value={locationId}
          onChange={e => setLocationId(Number(e.target.value))}
          required
        >
          <option value="">Select location</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

// Records list component
const RecordsList: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [error, setError] = useState('');
  const stored = localStorage.getItem('warden');
  let staffNum = '';
  if (stored) {
    try { staffNum = JSON.parse(stored).staffNum; } catch {};
  }

  const fetchRecords = () => {
    axios.get(`/api/records?staffNum=${staffNum}`)
      .then(res => setRecords(res.data))
      .catch(() => setError('Failed to load records'));
  };

  useEffect(() => { fetchRecords(); }, []);

  const handleEnd = async (id: number) => {
    try {
      await axios.patch(`/api/records/${id}`, { endTime: new Date().toISOString() });
      fetchRecords();
    } catch {
      setError('Failed to end record');
    }
  };

  return (
    <div className="card" style={{ flex: 1, minWidth: '300px' }}>
      <h2 className="title">Your Records</h2>
      {error && <div className="login-error">{error}</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {records.map(rec => (
          <li key={rec.id} style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <div><strong>Location:</strong> {rec.location.name}</div>
            <div><strong>Start:</strong> {new Date(rec.startTime).toLocaleString()}</div>
            <div><strong>End:</strong> {rec.endTime ? new Date(rec.endTime).toLocaleString() : '—'}</div>
            {!rec.endTime && (
              <button
                className="button"
                style={{ marginTop: '0.5rem' }}
                onClick={() => handleEnd(rec.id)}
              >End</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main HomePage layout: stats + records stacked left, entry form right
const HomePage: React.FC = () => {
  return (
    <div className="background" style={{ paddingTop: '80px', alignItems: 'flex-start' }}>
      <NavBar />
      <div
        className="home-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem',
        }}
      >
        {/* Left column: Stats + Records */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1.0rem', minWidth: '300px' }}>
          {/* Stats Card */}
          <div className="card">
            <h2 className="title">No. Wardens on Site</h2>
            <p>Areas</p>
            <p>% of rooms covered by wardens</p>
          </div>
          {/* Records List Card */}
          <RecordsList />
        </div>

        {/* Right column: Entry Form Card */}
        <EnterDetailsForm />
      </div>
    </div>
  );
};

export default HomePage;
