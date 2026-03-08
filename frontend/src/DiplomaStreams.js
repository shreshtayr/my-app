import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const DiplomaStreams = ({ setCurrentPage }) => {
  const diplomaStreams = [
    'Civil Engineering',
    'Computer Science and Engineering',
    'Electrical and Electronics Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Information Technology',
    'Automobile Engineering',
    'Mechatronics',
    'Architecture Assistantship',
    'Robotics and Automation',
    'Artificial Intelligence and Machine Learning'
  ];

  const openStreamInfo = (stream) => {
    localStorage.setItem('selectedStreamName', stream);
    localStorage.setItem('selectedStreamBackPage', 'diploma-streams');
    setCurrentPage('stream-info');
  };

  const goBack = () => {
    const backPage = localStorage.getItem('diplomaStreamsBackPage') || 'diploma-iti';
    setCurrentPage(backPage);
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>Diploma Streams</h1>
          <p>Available diploma streams after SSLC/10th.</p>
          <div className="career-options-grid">
            {diplomaStreams.map((stream) => (
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
            <button className="page-next-btn" onClick={() => setCurrentPage('after-diploma-education')}>
              Explore Here
            </button>
          </div>
          <div className="page-nav-buttons">
            <button className="page-back-btn" onClick={goBack}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DiplomaStreams;
