import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const AfterITIEducation = ({ setCurrentPage }) => {
  const itiEducationStreams = [
    'Advanced ITI / CTS Courses',
    'Diploma (Lateral Entry)',
    'Apprenticeship Training',
    'NAC (National Apprenticeship Certificate)',
    'B.Voc (Skill-based Degree)',
    'Government Technical Exams'
  ];

  const openOptionInfo = (option) => {
    localStorage.setItem('selectedStreamName', option);
    localStorage.setItem('selectedStreamBackPage', 'after-iti-education');
    setCurrentPage('stream-info');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>After ITI Education</h1>
          <p>Educational options you can pursue after ITI.</p>
          <div className="career-options-grid">
            {itiEducationStreams.map((stream) => (
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
            <button className="page-back-btn" onClick={() => setCurrentPage('iti-streams')}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AfterITIEducation;
