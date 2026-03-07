import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const CareerExplore = ({ setCurrentPage }) => {
  const options = [
    { label: 'PU/12th', page: 'pu-12th' },
    { label: 'Diploma/ITI', page: 'diploma-iti' },
    { label: 'Jobs', page: 'jobs' }
  ];

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>Welcome to Career Explore</h1>
          <p>Hope u completed our 10th/ SSLC</p>
          <div className="career-options-grid">
            {options.map((option) => (
              <button
                key={option.label}
                className="career-option-box"
                onClick={() => setCurrentPage(option.page)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="page-nav-buttons">
            <button className="page-back-btn" onClick={() => setCurrentPage('home')}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareerExplore;
