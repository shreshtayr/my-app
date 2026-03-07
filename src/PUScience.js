import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const PUScience = ({ setCurrentPage }) => {
  const scienceStreams = [
    'PCMB (Physics, Chemistry, Mathematics, Biology)',
    'PCMC (Physics, Chemistry, Mathematics, Computer Science)',
    'PCME (Physics, Chemistry, Mathematics, Electronics)',
    'PCMS (Physics, Chemistry, Mathematics, Statistics)',
    'PCBZ (Physics, Chemistry, Biology, Biotechnology)',
    'PCBH (Physics, Chemistry, Biology, Home Science)',
    'PMCs (Physics, Mathematics, Computer Science, Statistics)',
    'PCM (Physics, Chemistry, Mathematics)'
  ];

  const openStreamInfo = (stream) => {
    localStorage.setItem('selectedStreamName', stream);
    localStorage.setItem('selectedStreamBackPage', 'pu-science');
    setCurrentPage('stream-info');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>Science</h1>
          <p>Available science stream combinations in PU/12th.</p>
          <div className="career-options-grid">
            {scienceStreams.map((stream) => (
              <button
                key={stream}
                className="career-option-box"
                onClick={() => openStreamInfo(stream)}
                type="button"
              >
                {stream}
              </button>
            ))}
          </div>
          <p style={{ marginTop: '1rem' }}>What would you like to pursue after this?</p>
          <div className="page-nav-buttons">
            <button className="page-next-btn" onClick={() => setCurrentPage('after-pu12th-education')}>
              Explore Here
            </button>
          </div>
          <div className="page-nav-buttons">
            <button className="page-back-btn" onClick={() => setCurrentPage('pu-12th')}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PUScience;
