import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const AfterPU12thCommerce = ({ setCurrentPage }) => {
  const commerceEducationStreams = [
    'B.Com (General / Honors)',
    'BBA (Business Administration)',
    'BMS (Management Studies)',
    'BBM (Business Management)',
    'BA Economics',
    'BCA (Computer Applications)',
    'B.Com LLB (Integrated Law)',
    'CA (Chartered Accountancy)',
    'CS (Company Secretary)',
    'CMA (Cost and Management Accounting)',
    'Bachelor in Banking and Insurance',
    'Bachelor in Financial Markets'
  ];

  const openOptionInfo = (option) => {
    localStorage.setItem('selectedStreamName', option);
    localStorage.setItem('selectedStreamBackPage', 'after-pu12th-commerce');
    setCurrentPage('stream-info');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>After PU/12th Commerce</h1>
          <p>Educational streams you can pursue after PU/12th Commerce.</p>
          <div className="career-options-grid">
            {commerceEducationStreams.map((stream) => (
              <button
                key={stream}
                className="career-option-box"
                onClick={() => openOptionInfo(stream)}
                type="button"
              >
                {stream}
              </button>
            ))}
          </div>
          <div className="page-nav-buttons">
            <button className="page-back-btn" onClick={() => setCurrentPage('pu-commerce')}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AfterPU12thCommerce;
