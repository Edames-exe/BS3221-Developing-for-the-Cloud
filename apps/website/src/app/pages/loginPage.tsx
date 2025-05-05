import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line @nx/enforce-module-boundaries
import 'apps/website/src/styles.css';
// Import logo image
import logo from '../../assets/Univeristy-of-Winchester.webp';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post('/api/auth/login', { username, password });
      // Decode token to extract user details
      const token = data.access_token;
      const decoded = JSON.parse(window.atob(token.split('.')[1]));
      const wardenInfo = {
        token,
        loginTime: Date.now(),
        staffNum: decoded.sub,
        username: decoded.username,
        isAdmin: decoded.isAdmin,
      };
      // Store full warden info
      localStorage.setItem('warden', JSON.stringify(wardenInfo));
      // Set default Authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigate('/home');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="University Logo" className="login-logo" />
        <h1 className="login-title">Log In</h1>
        {error && <div className="login-error">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="label">Username</label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button login-button">Log In</button>
        </form>
        <div className="login-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
