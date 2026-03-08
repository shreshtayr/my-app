import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const DiplomaITI = ({ setCurrentPage }) => {
  const options = [
    { label: 'Diploma', page: 'diploma-streams' },
    { label: 'ITI', page: 'iti-streams' }
  ];

  const openOption = (page) => {
    if (page === 'diploma-streams') {
      localStorage.setItem('diplomaStreamsBackPage', 'diploma-iti');
    }
    setCurrentPage(page);
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>Diploma/ITI</h1>
          <p>Explore diploma and ITI options for technical careers.</p>
          <div className="diploma-iti-options">
            {options.map((option) => (
              <button
                key={option.label}
                className="career-option-box"
                onClick={() => openOption(option.page)}
              >
                {option.label}
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

export default DiplomaITI;
