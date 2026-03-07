import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from './AuthContext';

const Login = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();

  const handleSubmit = (e) => {
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

    if (login(username, password)) {
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

          <button type="submit" className="submit-btn">
            Login
          </button>

          <p className="register-link">
            Don't have an account?{' '}
            <a onClick={() => setCurrentPage('register')}>Register here</a>
          </p>

          <p className="register-link">
            Forgot your password?{' '}
            <a onClick={() => setCurrentPage('forgot-password')}>Reset it here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
