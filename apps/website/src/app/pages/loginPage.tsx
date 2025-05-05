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
        { username, password }
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
    <div className="background">
      <div className="card">
        <h1 className="title">Welcome</h1>

        {error && <div className="login-error">{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="input"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <div className="link">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="button">
            Login
          </button>
        </form>

        <div className="link">
          Don’t have an account? <a href="register">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
