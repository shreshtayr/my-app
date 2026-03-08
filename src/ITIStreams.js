import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const ITIStreams = ({ setCurrentPage }) => {
  const itiStreams = [
    'Electrician',
    'Fitter',
    'Welder',
    'Turner',
    'Machinist',
    'Mechanic Diesel',
    'Mechanic Motor Vehicle (MMV)',
    'Mechanic Refrigeration and Air Conditioning',
    'Wireman',
    'Electronics Mechanic',
    'Plumber',
    'Draughtsman Civil',
    'Draughtsman Mechanical',
    'COPA (Computer Operator and Programming Assistant)',
    'Tool and Die Maker',
    'Surveyor',
    'Sewing Technology'
  ];

  const openStreamInfo = (stream) => {
    localStorage.setItem('selectedStreamName', stream);
    localStorage.setItem('selectedStreamBackPage', 'iti-streams');
    setCurrentPage('stream-info');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>ITI Streams</h1>
          <p>Available ITI trades/streams after SSLC/10th.</p>
          <div className="career-options-grid">
            {itiStreams.map((stream) => (
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
            <button className="page-next-btn" onClick={() => setCurrentPage('after-iti-education')}>
              Explore Here
            </button>
          </div>
          <div className="page-nav-buttons">
            <button className="page-back-btn" onClick={() => setCurrentPage('diploma-iti')}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ITIStreams;
