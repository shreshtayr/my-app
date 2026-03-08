import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from './AuthContext';

const Login = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    setSubmitting(true);
    const authenticated = await login(username, password);
    setSubmitting(false);

    if (authenticated) {
      setUsername('');
      setPassword('');
      setCurrentPage('home');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Login'}
          </button>

          <p className="register-link">
            Don't have an account?{' '}
            <button type="button" className="text-link-btn" onClick={() => setCurrentPage('register')}>
              Register here
            </button>
          </p>

          <p className="register-link">
            Forgot your password?{' '}
            <button type="button" className="text-link-btn" onClick={() => setCurrentPage('forgot-password')}>
              Reset it here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
