// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/loginPage';
// import HomePage from './pages/homePage';
//
// const App: React.FC = () => (
//   <Routes>
//     <Route path="/" element={<LoginPage />} />
//     <Route path="/home" element={<HomePage />} />
//     {/* Fallback to login */}
//     <Route path="*" element={<Navigate to="/" replace />} />
//   </Routes>
// );
//
// export default App;

// src/app/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage  from './pages/homePage';
import RequireAuth from './components/requireAuth';

const App: React.FC = () => (
  <Routes>
    {/* Public route */}
    <Route path="/" element={<LoginPage />} />

    {/* Protected routes */}
    <Route
      path="/home"
      element={
        <RequireAuth>
          <HomePage />
        </RequireAuth>
      }
    />
    {/* Catch-all */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
