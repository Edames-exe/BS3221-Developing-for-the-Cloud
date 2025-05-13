// apps/website/src/app/pages/RecordsPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import 'apps/website/src/styles.css';
import logo from '../../assets/Univeristy-of-Winchester.webp';
import { toDateTimeLocal } from '../utils/dateHelpers';

interface Record {
  id: number;
  location: { id: number; name: string };
  startTime: string;
  endTime?: string | null;
}

interface LocationOption {
  id: number;
  name: string;
}

const RecordsPage: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editLocationId, setEditLocationId] = useState<number | ''>('');
  const [editEndTime, setEditEndTime] = useState<string>('');
  const navigate = useNavigate();
  const staffNum = JSON.parse(localStorage.getItem('warden') || '{}').staffNum;


  const deleteRecord = async (id: number) => {
    // eslint-disable-next-line no-restricted-globals
      if (!confirm('Are you sure you want to delete this record?')) return;
      try {
          await axios.delete(`/api/records/${id}`);
          loadRecords(); // refresh the list
        } catch {
          alert('Failed to delete record');
        }
    };

  // load records
  const loadRecords = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Record[]>(`/api/records?staffNum=${staffNum}`);
      setRecords(data);
    } catch {
      setError('Failed to load records');
    } finally {
      setLoading(false);
    }
  };

  // load locations for edit dropdown
  useEffect(() => {
    axios.get<LocationOption[]>('/api/locations')
      .then(res => setLocations(res.data))
      .catch(() => {/* ignore */});
  }, []);

  // initial load
  useEffect(() => {
    loadRecords();
  }, []);

  const startEdit = (r: Record) => {
    setEditingId(r.id);
    setEditLocationId(r.location.id);
    const initialIso = r.endTime ?? r.startTime;
    setEditEndTime(toDateTimeLocal(initialIso));
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    try {
      // Build payload with only the fields the user changed
      const payload: any = {};
      if (editLocationId) {
        payload.locationId = editLocationId;
      }
      // If the user cleared the endTime input, send null; otherwise convert back to ISO format
      payload.endTime = editEndTime
        ? new Date(editEndTime).toISOString()
        : null;

      // Call your API
      await axios.patch(`/api/records/${editingId}`, payload);

      // Reload the newest data
      await loadRecords();

      // Exit edit mode
      setEditingId(null);
    } catch (err) {
      alert('Failed to save changes');
      console.error(err);
    }
  };

  return (
    <div className="background">
      <header className="navbar">
        <img
          src={logo} alt="Logo"
          className="navbar-logo"
          onClick={() => navigate('/home')}
        />
        <nav>
          <ul className="nav-links">
            <li onClick={() => navigate('/home')}>Home</li>
            <li onClick={() => navigate('/records')}>Records</li>
          </ul>
        </nav>
      </header>

      <div style={{ padding: '80px 1rem 2rem' }}>
        <section
          className="card"
          style={{ width: '80%', maxWidth: '1200px', margin: '0 auto' }}
        >
          <h2 className="title">All Your Records</h2>
          {loading ? (
            <p>Loading…</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : !records.length ? (
            <p>No records found.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
              <tr>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Start Time</th>
                <th style={thStyle}>End Time</th>
                <th style={thStyle}>Actions</th>
              </tr>
              </thead>
              <tbody>
              {records.map(r => (
                <tr key={r.id}>
                  {editingId === r.id ? (
                    <>
                      <td style={tdStyle}>
                        <select
                          className="input"
                          value={editLocationId}
                          onChange={e => setEditLocationId(Number(e.target.value))}
                        >
                          <option value="">Select…</option>
                          {locations.map(loc => (
                            <option key={loc.id} value={loc.id}>{loc.name}</option>
                          ))}
                        </select>
                      </td>
                      <td style={tdStyle}>
                        {new Date(r.startTime).toLocaleString()}
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="datetime-local"
                          className="input"
                          value={editEndTime}
                          onChange={e => setEditEndTime(e.target.value)}
                        />
                      </td>
                      <td style={tdStyle}>
                        <button className="button" onClick={saveEdit} style={{ marginRight: '0.5rem' }}>
                          Save
                        </button>
                        <button className="button" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={tdStyle}>{r.location.name}</td>
                      <td style={tdStyle}>{new Date(r.startTime).toLocaleString()}</td>
                      <td style={tdStyle}>{r.endTime ? new Date(r.endTime).toLocaleString() : '—'}</td>
                      <td style={tdStyle}>
                        <button className="button" onClick={() => deleteRecord(r.id)} style={{ marginRight: '0.5rem' }}>
                          Delete
                        </button>
                        <button className="button" onClick={() => startEdit(r)}>
                          Edit
                        </button>
                      </td>
                    </>
                  )}
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
  textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ddd'
};

const tdStyle: React.CSSProperties = {
  padding: '0.5rem', borderBottom: '1px solid #f0f0f0'
};

export default RecordsPage;
