import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const PUArts = ({ setCurrentPage }) => {
  const artsStreams = [
    'HEPS (History, Economics, Political Science, Sociology)',
    'HEPyS (History, Economics, Psychology, Sociology)',
    'HEGS (History, Economics, Geography, Sociology)',
    'HESP (History, Economics, Sociology, Psychology)',
    'HEPA (History, Economics, Political Science, Optional Language)',
    'JESP (Journalism, Economics, Sociology, Political Science)',
    'HSPsy (History, Sociology, Psychology, Optional Language)',
    'HEPE (History, Economics, Political Science, Education)'
  ];

  const openStreamInfo = (stream) => {
    localStorage.setItem('selectedStreamName', stream);
    localStorage.setItem('selectedStreamBackPage', 'pu-arts');
    setCurrentPage('stream-info');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>Arts</h1>
          <p>Available arts stream combinations in PU/12th.</p>
          <div className="career-options-grid">
            {artsStreams.map((stream) => (
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
            <button className="page-next-btn" onClick={() => setCurrentPage('after-pu12th-arts')}>
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

export default PUArts;
