import React, { useState, useEffect } from 'react';
import './Auth.css';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const Home = ({ setCurrentPage }) => {
  const { user, logout } = useAuth();
  const [currentThought, setCurrentThought] = useState(0);

  const thoughts = [
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The beautiful thing about learning is that no one can take it away from you. - B.B. King",
    "The more that you read, the more things you will know. The more that you learn, the more places you'll go. - Dr. Seuss",
    "Learning never exhausts the mind. - Leonardo da Vinci",
    "An investment in knowledge pays the best interest. - Benjamin Franklin"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [thoughts.length]);

  return (
    <div className="webpage">
      <Header setCurrentPage={setCurrentPage} />
      <main className="webpage-main">
        <div className="home-content">
          <div className="greeting-section">
            <h1>Welcome to Career Expl</h1>
          </div>

          <div className="thought-wrapper">
            <div className="nav-overlay left" onClick={() => setCurrentThought((prev) => (prev - 1 + thoughts.length) % thoughts.length)}></div>
            <div className="thought-section">
              <h2>Educational That Helps You for Career Building</h2>
              <p className="thought">{thoughts[currentThought]}</p>
            </div>
            <div className="nav-overlay right" onClick={() => setCurrentThought((prev) => (prev + 1) % thoughts.length)}></div>
          </div>

          <div className="next-btn-wrapper">
            <button className="next-btn" onClick={() => setCurrentPage('career-explore')}>
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
