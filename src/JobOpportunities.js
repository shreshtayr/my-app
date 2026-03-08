import React, { useEffect, useMemo, useState } from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';
import { JOB_DATA } from './data/jobsData';

const getJobType = (jobName) => {
  const lower = jobName.toLowerCase();
  if (lower.includes('exam') || lower.includes('recruitment')) {
    return 'exam';
  }
  if (
    lower.includes('technician') ||
    lower.includes('engineer') ||
    lower.includes('mechanic') ||
    lower.includes('electrician') ||
    lower.includes('fitter') ||
    lower.includes('welder') ||
    lower.includes('operator')
  ) {
    return 'technical';
  }
  return 'office';
};

const JobOpportunities = ({ setCurrentPage, category }) => {
  const categoryJobs = JOB_DATA[category];
  const isGroupedJobs = Boolean(categoryJobs && !Array.isArray(categoryJobs));
  const streamOptions = useMemo(
    () => (isGroupedJobs ? Object.keys(categoryJobs) : []),
    [categoryJobs, isGroupedJobs]
  );
  const [selectedStream, setSelectedStream] = useState(streamOptions[0] || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');

  useEffect(() => {
    if (!isGroupedJobs) {
      setSelectedStream('');
      return;
    }
    const preferredJobGroup = localStorage.getItem('preferredJobGroup');
    if (preferredJobGroup && categoryJobs[preferredJobGroup]) {
      setSelectedStream(preferredJobGroup);
      localStorage.removeItem('preferredJobGroup');
      return;
    }
    const preferredPuJobStream = localStorage.getItem('preferredPuJobStream');
    if (preferredPuJobStream && categoryJobs[preferredPuJobStream]) {
      setSelectedStream(preferredPuJobStream);
      localStorage.removeItem('preferredPuJobStream');
      return;
    }
    if (!selectedStream || !categoryJobs[selectedStream]) {
      setSelectedStream(streamOptions[0] || '');
    }
  }, [category, categoryJobs, isGroupedJobs, selectedStream, streamOptions]);

  const jobs = useMemo(() => {
    if (isGroupedJobs) {
      return categoryJobs[selectedStream] || [];
    }
    return categoryJobs || [];
  }, [categoryJobs, isGroupedJobs, selectedStream]);

  const pageTitle = isGroupedJobs && selectedStream ? `${selectedStream} Jobs` : `${category} Jobs`;

  const pageDescription =
    isGroupedJobs && selectedStream
      ? `Job opportunities related to ${selectedStream}.`
      : `Job opportunities for ${category}.`;

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.toLowerCase().includes(searchTerm.toLowerCase().trim());
      const matchesType = jobTypeFilter === 'all' || getJobType(job) === jobTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [jobs, searchTerm, jobTypeFilter]);

  const openJobInfo = (jobName) => {
    const jobBackPageMap = {
      '12/PU': 'jobs-12pu',
      Diploma: 'jobs-diploma',
      ITI: 'jobs-iti',
      '10/SSLC': 'jobs-10sslc',
      'After PU/12th Education': 'jobs-after-pu12th-education',
      'After Diploma Education': 'jobs-after-diploma-education',
      'After ITI Education': 'jobs-after-iti-education'
    };
    localStorage.setItem('selectedJobName', jobName);
    localStorage.setItem('selectedJobCategory', category);
    localStorage.setItem('selectedJobBackPage', jobBackPageMap[category] || 'jobs');
    setCurrentPage('job-info');
  };

  const getBackPage = () => {
    if (
      category !== 'After PU/12th Education' &&
      category !== 'After Diploma Education' &&
      category !== 'After ITI Education'
    ) {
      return 'jobs';
    }
    const jobsBackPage = localStorage.getItem('selectedJobsBackPage');
    if (jobsBackPage) {
      localStorage.removeItem('selectedJobsBackPage');
      return jobsBackPage;
    }
    if (category === 'After Diploma Education') {
      return 'after-diploma-education';
    }
    if (category === 'After ITI Education') {
      return 'after-iti-education';
    }
    return 'after-pu12th-education';
  };

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <section className="career-explore-section">
          <h1>{pageTitle}</h1>
          <p>{pageDescription}</p>
          {isGroupedJobs && (
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label htmlFor="stream-select" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                Select Option
              </label>
              <select
                id="stream-select"
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem'
                }}
              >
                {streamOptions.map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="jobs-filters">
            <input
              type="text"
              className="jobs-search-input"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="jobs-filter-select"
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
            >
              <option value="all">All Job Types</option>
              <option value="technical">Technical</option>
              <option value="office">Office/Support</option>
              <option value="exam">Exam-Based</option>
            </select>
          </div>
          <p className="jobs-results-count">Showing {filteredJobs.length} job(s)</p>
          <div className="career-options-grid">
            {filteredJobs.map((job) => (
              <button
                key={job}
                className="career-option-box"
                onClick={() => openJobInfo(job)}
                type="button"
              >
                {job}
              </button>
            ))}
          </div>
          {filteredJobs.length === 0 && (
            <p className="jobs-empty-state">No jobs found for this search/filter.</p>
          )}
          <div className="page-nav-buttons">
            <button
              className="page-back-btn"
              onClick={() => setCurrentPage(getBackPage())}
            >
              Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JobOpportunities;
