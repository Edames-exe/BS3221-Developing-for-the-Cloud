import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line @nx/enforce-module-boundaries
import 'apps/website/src/styles.css';

// Configure Axios to point to the NestJS backend
axios.defaults.baseURL = 'http://localhost:3000';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">LOGO</div>
    </nav>
  );
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post(
        '/api/auth/login',
        {},
        { headers: { username, password } }
      );
          localStorage.setItem('user',
            JSON.stringify({
              user: data,
              loginTime: Date.now(),
              })
          );
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
    <div className="App">
      <NavBar />
      <div className="container">
        <div className="enter-details">
          <h2>Fire Warden Login</h2>
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
