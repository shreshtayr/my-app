import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './AuthContext';
import Registration from './Registration';
import Login from './Login';
import Landing from './Landing';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import CareerExplore from './CareerExplore';
import PU12th from './PU12th';
import DiplomaITI from './DiplomaITI';
import JobsPage from './JobsPage';
import PUScience from './PUScience';
import PUCommerce from './PUCommerce';
import PUArts from './PUArts';
import DiplomaStreams from './DiplomaStreams';
import ITIStreams from './ITIStreams';
import JobOpportunities from './JobOpportunities';
import JobInfo from './JobInfo';
import AfterPU12thEducation from './AfterPU12thEducation';
import AfterPU12thCommerce from './AfterPU12thCommerce';
import AfterPU12thArts from './AfterPU12thArts';
import StreamInfo from './StreamInfo';

function AppContent() {
  const { isLoggedIn, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        setCurrentPage('home');
      } else {
        setCurrentPage('landing');
      }
    }
  }, [isLoggedIn, loading]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <Landing setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'register' && (
        <Registration setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'login' && (
        <Login setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'forgot-password' && (
        <ForgotPassword setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'home' && (
        <Home setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'career-explore' && (
        <CareerExplore setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'pu-12th' && (
        <PU12th setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'diploma-iti' && (
        <DiplomaITI setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'diploma-streams' && (
        <DiplomaStreams setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'iti-streams' && (
        <ITIStreams setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'jobs' && (
        <JobsPage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'jobs-12pu' && (
        <JobOpportunities setCurrentPage={setCurrentPage} category="12/PU" />
      )}
      {currentPage === 'jobs-diploma' && (
        <JobOpportunities setCurrentPage={setCurrentPage} category="Diploma" />
      )}
      {currentPage === 'jobs-iti' && (
        <JobOpportunities setCurrentPage={setCurrentPage} category="ITI" />
      )}
      {currentPage === 'jobs-10sslc' && (
        <JobOpportunities setCurrentPage={setCurrentPage} category="10/SSLC" />
      )}
      {currentPage === 'jobs-after-pu12th-education' && (
        <JobOpportunities setCurrentPage={setCurrentPage} category="After PU/12th Education" />
      )}
      {currentPage === 'pu-science' && (
        <PUScience setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'pu-commerce' && (
        <PUCommerce setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'pu-arts' && (
        <PUArts setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'after-pu12th-education' && (
        <AfterPU12thEducation setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'after-pu12th-commerce' && (
        <AfterPU12thCommerce setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'after-pu12th-arts' && (
        <AfterPU12thArts setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'stream-info' && (
        <StreamInfo setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'job-info' && (
        <JobInfo setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
