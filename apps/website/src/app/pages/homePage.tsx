// src/app/pages/homePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line @nx/enforce-module-boundaries
import 'apps/website/src/styles.css';
import logo from '../../assets/Univeristy-of-Winchester.webp';

interface LocationOption { id: number; name: string; }
interface Record { id: number; location: { name: string }; startTime: string; endTime?: string; }

const NavBar: React.FC = () => {
  const navigate = useNavigate();
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
          <li onClick={() => navigate('/entries')}>Records</li>
          <li>Other</li>
        </ul>
      </nav>
    </header>
  );
};

interface StatsCardProps { refreshKey: number }
const StatsCard: React.FC<StatsCardProps> = ({ refreshKey }) => {
  const [stats, setStats] = useState({
    activeWardens: 0,
    areasCovered: 0,
    coveragePercent: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/stats');
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load statistics');
        setLoading(false);
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, [refreshKey]);

  return (
    <section className="card stats-card">
      <h2 className="title">Wardens on Site</h2>
      {loading ? (
        <div className="loading">Loading statistics...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{stats.activeWardens}</div>
            <div className="stat-label">Active Wardens</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.areasCovered}</div>
            <div className="stat-label">Areas Covered</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.coveragePercent}%</div>
            <div className="stat-label">Coverage</div>
          </div>
        </div>
      )}
    </section>
  );
};

const EnterFormCard: React.FC<{ onReportSubmitted?: () => void }> = ({ onReportSubmitted }) => {
  const stored = localStorage.getItem('warden');
  const { staffNum = '', username = '' } = stored ? JSON.parse(stored) : {};
  const [name, setName] = useState(username);
  const [staffNo, setStaffNo] = useState(staffNum);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [locationId, setLocationId] = useState<number | ''>('');
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  useEffect(() => {
    axios.get('/api/locations')
      .then(res => setLocations(res.data))
      .catch(() => setMessage({ text: 'Failed to load locations', type: 'error' }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationId) return setMessage({ text: 'Select a location', type: 'error' });
    try {
      await axios.post('/api/records', {
        staffNum,
        locationId,
        startTime: new Date().toISOString(),
        endTime: null
      });
      setMessage({ text: 'Record saved', type: 'success' });
      // Clear form
      setLocationId('');
      // Refresh records if callback provided
      if (onReportSubmitted) onReportSubmitted();
    } catch {
      setMessage({ text: 'Save failed', type: 'error' });
    }
  };

  return (
    <section className="card">
      <h2 className="title">Enter Location</h2>
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Name</label>
          <input
            className="input"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Staff No.</label>
          <input
            className="input"
            value={staffNo}
            onChange={e => setStaffNo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Location</label>
          <select
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
        </div>

        <button className="button" type="submit">Submit</button>
      </form>
    </section>
  );
};

const RecordsCard: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState('');
  const staffNum = JSON.parse(localStorage.getItem('warden') || '{}').staffNum;

  const load = () => {
    axios.get(`/api/records?staffNum=${staffNum}`)
      .then(res => {
        // Sort by startTime (newest first) and take first 5
        const sortedRecords = res.data.sort((a: Record, b: Record) =>
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        );
        setRecords(sortedRecords.slice(0, 5));
      })
      .catch(() => setError('Could not load records'));
  };

  useEffect(load, []);

  const endRecord = async (id: number) => {
    try {
      await axios.patch(`/api/records/${id}`, { endTime: new Date().toISOString() });
      load(); // Refresh the list after ending a record
    } catch {
      setError('Could not end record');
    }
  };

  return (
    <section className="card records-card">
      <div className="records-header">
        <h2 className="title">Your Recent Records</h2>
        {records.length > 0 && (
          <span className="records-count">{records.length} of 5 shown</span>
        )}
      </div>
      {error && <div className="error">{error}</div>}
      <ul className="records-list">
        {records.map(r => (
          <li key={r.id} className="record-item">
            <div className="record-content">
              <div><strong>Location:</strong> {r.location.name}</div>
              <div><strong>Start:</strong> {new Date(r.startTime).toLocaleString()}</div>
              <div><strong>End:</strong> {r.endTime ? new Date(r.endTime).toLocaleString() : '—'}</div>
            </div>
            {!r.endTime && (
              <button className="button end-button" onClick={() => endRecord(r.id)}>
                End
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

const HomePage: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReportSubmitted = () => {
    setRefreshKey(prev => prev + 1); // This will force RecordsCard to refresh
  };

  return (
    <div className="background">
      <NavBar />
      <main className="content">
        <div className="two-column-layout">
          <div className="left-column">
            <StatsCard refreshKey={refreshKey} />
            <div className="form-card-spacing"></div>
            <EnterFormCard onReportSubmitted={handleReportSubmitted} />
          </div>
          <div className="right-column">
            <RecordsCard key={refreshKey} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
