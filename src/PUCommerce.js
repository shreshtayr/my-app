import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const PUCommerce = ({ setCurrentPage }) => {
  const commerceStreams = [
    'CEBA (Computer Science, Economics, Business Studies, Accountancy)',
    'SEBA (Statistics, Economics, Business Studies, Accountancy)',
    'HEBA (History, Economics, Business Studies, Accountancy)',
    'ABMS (Accountancy, Business Studies, Mathematics, Statistics)',
    'ABEC (Accountancy, Business Studies, Economics, Computer Science)',
    'ABEM (Accountancy, Business Studies, Economics, Mathematics)'
  ];

  const openStreamInfo = (stream) => {
    localStorage.setItem('selectedStreamName', stream);
    localStorage.setItem('selectedStreamBackPage', 'pu-commerce');
    setCurrentPage('stream-info');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>Commerce</h1>
          <p>Available commerce stream combinations in PU/12th.</p>
          <div className="career-options-grid">
            {commerceStreams.map((stream) => (
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
            <button className="page-next-btn" onClick={() => setCurrentPage('after-pu12th-commerce')}>
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

export default PUCommerce;
