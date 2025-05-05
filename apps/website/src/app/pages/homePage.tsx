// src/app/pages/homePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import 'apps/website/src/styles.css';

// NavBar component as a floating thin box
function NavBar() {
  const navigate = useNavigate();
  return (
    <nav
      className="card"
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 2rem)',
        maxWidth: '1200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      <div className="logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
        LOGO
      </div>
      <ul className="nav-links" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', gap: '1rem' }}>
        <li onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Home</li>
        <li onClick={() => navigate('/entries')} style={{ cursor: 'pointer' }}>Entered Records</li>
        <li style={{ cursor: 'pointer' }}>Other Stuff</li>
      </ul>
    </nav>
  );
}

const HomePage: React.FC = () => {
  return (
    <div className="background" style={{ paddingTop: '80px' }}>
      <NavBar />
      <div
        className="home-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '1.5rem',
          padding: '2rem',
        }}
      >
        {/* Stats Card */}
        <div className="card" style={{ maxWidth: '360px', flex: '0 0 360px' }}>
          <h2 className="title">No. Wardens on Site</h2>
          <p>Areas</p>
          <p>% of rooms covered by wardens</p>
        </div>

        {/* Entry Form Card */}
        <div className="card" style={{ maxWidth: '360px', flex: '0 0 360px' }}>
          <h2 className="title">Enter Details</h2>
          <form className="form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input id="name" type="text" placeholder="Enter name" />
            </div>
            <div className="form-group">
              <label htmlFor="staffNo">Staff No.:</label>
              <input id="staffNo" type="text" placeholder="Enter staff number" />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input id="location" type="text" placeholder="Enter location" />
            </div>
            <button type="submit" className="button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
