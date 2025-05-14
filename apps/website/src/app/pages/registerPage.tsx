import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line @nx/enforce-module-boundaries
import 'apps/website/src/styles.css';

// Configure Axios if not already set globally
axios.defaults.baseURL = 'http://cloud-computing-backend.fac0djfpbcbscmha.uksouth.azurecontainer.io:3000'; //cloud link
// axios.defaults.baseURL = 'http://localhost:3000'; //local Link

const RegisterPage: React.FC = () => {
  const [staffNum, setStaffNum] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.post('/api/auth/register', {
        staffNum,
        username,
        password,
      });
      // On success, redirect to login
      navigate('/');
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Sign Up</h1>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="staffNum">Staff Number</label>
            <input
              id="staffNum"
              type="text"
              className="input"
              placeholder="Enter your staff number"
              value={staffNum}
              onChange={e => setStaffNum(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="Choose a username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="confirmPassword">Re-enter Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="input"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button login-button">Register</button>
        </form>

        <div className="login-footer">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
