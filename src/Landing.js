import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const Landing = ({ setCurrentPage }) => {
  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <div className="hero-section">
          <h1>Welcome to Expl Career</h1>
          <p>Please login or register to continue.</p>
          <div className="cta-buttons">
            <button onClick={() => setCurrentPage('login')} className="btn-primary">
              Login
            </button>
            <button onClick={() => setCurrentPage('register')} className="btn-secondary">
              Register
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
