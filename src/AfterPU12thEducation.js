import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const AfterPU12thEducation = ({ setCurrentPage }) => {
  const educationStreams = [
    { label: 'Diploma Lateral Entry', page: 'diploma-streams' },
    { label: 'B.E / B.Tech (Engineering)' },
    { label: 'MBBS / BDS / BAMS / BHMS' },
    { label: 'B.Sc (Pure Science)' },
    { label: 'BCA (Computer Applications)' },
    { label: 'B.Pharm (Pharmacy)' },
    { label: 'B.Arch (Architecture)' },
    { label: 'B.Com (Commerce)' },
    { label: 'BBA (Business Administration)' },
    { label: 'BA (Arts and Humanities)' },
    { label: 'Integrated Courses (B.Sc + M.Sc / B.Tech + M.Tech)' },
    { label: 'Law (5-Year Integrated LLB)' },
    { label: 'Paramedical and Allied Health Courses' }
  ];

  const openOptionInfo = (option) => {
    localStorage.setItem('selectedStreamName', option);
    localStorage.setItem('selectedStreamBackPage', 'after-pu12th-education');
    setCurrentPage('stream-info');
  };

  const openDiplomaStreams = () => {
    localStorage.setItem('diplomaStreamsBackPage', 'after-pu12th-education');
    setCurrentPage('diploma-streams');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>After PU/12th Education Streams</h1>
          <p>Educational streams you can pursue after PU/12th.</p>
          <div className="career-options-grid">
            {educationStreams.map((stream) => (
              stream.page ? (
                <button
                  key={stream.label}
                  className="career-option-box"
                  onClick={stream.page === 'diploma-streams' ? openDiplomaStreams : () => setCurrentPage(stream.page)}
                  type="button"
                >
                  {stream.label}
                </button>
              ) : (
                <button
                  key={stream.label}
                  className="career-option-box"
                  onClick={() => openOptionInfo(stream.label)}
                  type="button"
                >
                  {stream.label}
                </button>
              )
            ))}
          </div>
          <div className="page-nav-buttons">
            <button className="page-back-btn" onClick={() => setCurrentPage('pu-science')}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AfterPU12thEducation;
