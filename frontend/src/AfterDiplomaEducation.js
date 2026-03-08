import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const AfterDiplomaEducation = ({ setCurrentPage }) => {
  const diplomaEducationStreams = [
    'B.E / B.Tech (Lateral Entry)',
    'AMIE (Engineering Certification)',
    'B.Voc (Bachelor of Vocation)',
    'Advanced Diploma / PG Diploma',
    'Government Competitive Exams',
    'Apprenticeship Programs'
  ];

  const openOptionInfo = (option) => {
    localStorage.setItem('selectedStreamName', option);
    localStorage.setItem('selectedStreamBackPage', 'after-diploma-education');
    setCurrentPage('stream-info');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>After Diploma Education</h1>
          <p>Educational options you can pursue after Diploma.</p>
          <div className="career-options-grid">
            {diplomaEducationStreams.map((stream) => (
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
            <button className="page-back-btn" onClick={() => setCurrentPage('diploma-streams')}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AfterDiplomaEducation;
