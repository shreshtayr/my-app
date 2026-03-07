import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from './AuthContext';

const Registration = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please choose a username');
      return;
    }

    if (!password.trim() || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    register({ username, password });
    setUsername('');
    setPassword('');
    setCurrentPage('home');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registration</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min 6 characters)"
            />
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>

          <p className="login-link">
            Already have an account?{' '}
            <a onClick={() => setCurrentPage('login')}>Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
