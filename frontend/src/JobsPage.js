import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const JobsPage = ({ setCurrentPage }) => {
  const jobButtons = [
    { label: '12/PU', page: 'jobs-12pu' },
    { label: 'Diploma', page: 'jobs-diploma' },
    { label: 'ITI', page: 'jobs-iti' },
    { label: '10/SSLC', page: 'jobs-10sslc' }
  ];

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>Jobs</h1>
          <p>Select your qualification to view job opportunities.</p>
          <div className="career-options-grid jobs-button-grid">
            {jobButtons.map((item) => (
              <button
                key={item.label}
                className="career-option-box"
                onClick={() => setCurrentPage(item.page)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="page-nav-buttons">
            <button className="page-back-btn" onClick={() => setCurrentPage('career-explore')}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JobsPage;
