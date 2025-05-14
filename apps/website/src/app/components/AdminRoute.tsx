import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const stored = localStorage.getItem('warden');
  const isAdmin = stored ? JSON.parse(stored).isAdmin : false;

  if (!isAdmin) {
    // not an admin → send back to home
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
