import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const PU12th = ({ setCurrentPage }) => {
  const streams = [
    { label: 'Science', page: 'pu-science' },
    { label: 'Commerce', page: 'pu-commerce' },
    { label: 'Arts', page: 'pu-arts' }
  ];

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>PU/12th</h1>
          <p>Explore courses and career paths for PU/12th students.</p>
          <div className="career-options-grid">
            {streams.map((stream) => (
              <button
                key={stream.label}
                className="career-option-box"
                onClick={() => setCurrentPage(stream.page)}
              >
                {stream.label}
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

export default PU12th;
