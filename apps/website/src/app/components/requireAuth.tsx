import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface WardenInfo {
  token: string;
  loginTime: number;
  staffNum: string;
  username: string;
  isAdmin: boolean;
}

const SESSION_TTL = 30 * 60 * 1000; // 30 minutes in ms

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const location = useLocation();
  const raw = localStorage.getItem('warden');

  if (!raw) {
    // no session
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  try {
    const session = JSON.parse(raw) as WardenInfo;
    const { loginTime } = session;
    const now = Date.now();

    if (now - loginTime > SESSION_TTL) {
      // session expired
      localStorage.removeItem('warden');
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    // valid session
    return children;
  } catch {
    // malformed data
    localStorage.removeItem('warden');
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
