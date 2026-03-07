import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const getInfo = (streamName) => {
  if (!streamName) {
    return 'Select a stream to view details.';
  }

  const lower = streamName.toLowerCase();

  if (lower.includes('pcmb') || lower.includes('biology') || lower.includes('medical')) {
    return 'Best for students interested in medicine, life sciences, biotechnology, nursing, and health-related degree courses.';
  }
  if (lower.includes('pcmc') || lower.includes('computer') || lower.includes('information technology')) {
    return 'Strong path for computer science, software engineering, IT, data science, and technology-focused degrees.';
  }
  if (lower.includes('commerce') || lower.includes('accountancy') || lower.includes('business') || lower.includes('economics')) {
    return 'Good choice for CA, CS, B.Com, BBA, banking, finance, business management, and entrepreneurship.';
  }
  if (lower.includes('arts') || lower.includes('history') || lower.includes('sociology') || lower.includes('political')) {
    return 'Supports careers in civil services, law, psychology, journalism, social sciences, and humanities.';
  }
  if (lower.includes('engineering') || lower.includes('mechanical') || lower.includes('civil') || lower.includes('electrical')) {
    return 'Technical stream with strong opportunities in core engineering, design, manufacturing, and project roles.';
  }
  if (lower.includes('electrician') || lower.includes('fitter') || lower.includes('welder') || lower.includes('machinist')) {
    return 'Skill-based trade stream with direct practical training, apprenticeships, and fast entry to technical jobs.';
  }

  return 'This stream builds subject knowledge and opens higher-education options based on your interest and entrance exams.';
};

const StreamInfo = ({ setCurrentPage }) => {
  const streamName = localStorage.getItem('selectedStreamName') || '';
  const backPage = localStorage.getItem('selectedStreamBackPage') || 'career-explore';
  const showRelatedJobs = backPage === 'after-pu12th-education';

  const openRelatedJobs = () => {
    localStorage.setItem('preferredJobGroup', streamName);
    setCurrentPage('jobs-after-pu12th-education');
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>{streamName || 'Stream Details'}</h1>
          <p>{getInfo(streamName)}</p>
          <div className="page-nav-buttons">
            {showRelatedJobs && (
              <button className="page-next-btn" onClick={openRelatedJobs}>
                Related Jobs
              </button>
            )}
            <button className="page-back-btn" onClick={() => setCurrentPage(backPage)}>
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StreamInfo;
