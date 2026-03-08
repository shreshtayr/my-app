import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const AfterPU12thArts = ({ setCurrentPage }) => {
  const artsEducationStreams = [
    'BA (History / Political Science / Sociology / Psychology)',
    'BA Journalism and Mass Communication',
    'BA English Literature',
    'BA Economics',
    'BFA (Fine Arts)',
    'BPA (Performing Arts)',
    'BSW (Bachelor of Social Work)',
    'B.Des (Design)',
    'LLB (5-Year Integrated Law)',
    'BHM (Hotel Management)',
    'BTTM (Travel and Tourism Management)',
    'Diploma Courses in Animation / Media / Languages'
  ];

  const openOptionInfo = (option) => {
    localStorage.setItem('selectedStreamName', option);
    localStorage.setItem('selectedStreamBackPage', 'after-pu12th-arts');
    setCurrentPage('stream-info');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>After PU/12th Arts</h1>
          <p>Educational streams you can pursue after PU/12th Arts.</p>
          <div className="career-options-grid">
            {artsEducationStreams.map((stream) => (
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
            <button className="page-back-btn" onClick={() => setCurrentPage('pu-arts')}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AfterPU12thArts;
