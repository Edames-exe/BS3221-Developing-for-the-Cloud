import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  // Check for your “logged-in” flag; adjust key if you used something else
  const isLoggedIn = Boolean(localStorage.getItem('user'));
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to “/” (login), but keep the attempted URL in state
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
