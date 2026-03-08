import React from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';

const getJobInfo = (jobName) => {
  if (!jobName) {
    return 'Select a job role to view details.';
  }

  const lower = jobName.toLowerCase();

  if (lower.includes('lab') || lower.includes('pharmacy') || lower.includes('health')) {
    return 'This role is related to healthcare support services. You may need short-term certification and practical training.';
  }
  if (lower.includes('data') || lower.includes('computer') || lower.includes('it') || lower.includes('network')) {
    return 'This role fits technology and office systems. Basic computer skills, communication, and certifications improve your chances.';
  }
  if (lower.includes('sales') || lower.includes('insurance') || lower.includes('bank')) {
    return 'This role is customer and business-facing. Communication, target handling, and finance basics are useful.';
  }
  if (lower.includes('technician') || lower.includes('electrician') || lower.includes('mechanic') || lower.includes('fitter')) {
    return 'This is a technical hands-on role. Industrial training, apprentice experience, and safety practices are important.';
  }
  if (lower.includes('assistant') || lower.includes('clerk') || lower.includes('office')) {
    return 'This role is administrative/support oriented. Typing, documentation, and communication skills are commonly required.';
  }

  return 'This role offers entry-level opportunities. Check eligibility, required training, and exams based on the employer.';
};

const JobInfo = ({ setCurrentPage }) => {
  const jobName = localStorage.getItem('selectedJobName') || '';
  const jobCategory = localStorage.getItem('selectedJobCategory') || '';
  const backPage = localStorage.getItem('selectedJobBackPage') || 'jobs';

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>{jobName || 'Job Details'}</h1>
          <p>{jobCategory ? `Category: ${jobCategory}` : 'Job category details.'}</p>
          <p>{getJobInfo(jobName)}</p>
          <div className="page-nav-buttons">
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

export default JobInfo;
