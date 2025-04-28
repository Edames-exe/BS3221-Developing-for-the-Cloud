// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import React from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import 'apps/website/src/styles.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">LOGO</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Entered Records</li>
        <li>Other Stuff</li>
      </ul>
    </nav>
  );
}

function Stats() {
  return (
    <div className="stats">
      <h2>No. Wardens on Site</h2>
      <p>Areas</p>
      <p>% of rooms covered by wardens</p>
    </div>
  );
}

function EnterDetailsForm() {
  return (
    <div className="enter-details">
      <h2>Enter Details</h2>
      <form>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Stats />
        <EnterDetailsForm />
      </div>
    </div>
  );
}

export default App;
