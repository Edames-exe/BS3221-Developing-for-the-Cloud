// src/app/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import HomePage from './pages/homePage';
import RequireAuth from './components/requireAuth';
import RecordsPage from './pages/recordsPage';

const App: React.FC = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    {/* Protected routes */}
    <Route
      path="/home"
      element={
        <RequireAuth>
          <HomePage />
        </RequireAuth>
      }
    />
    <Route
         path="/records"
         element={
           <RequireAuth>
               <RecordsPage />
             </RequireAuth>
         }
       />

    {/* Catch-all */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
