import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from './AuthContext';

const ForgotPassword = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    if (!newPassword.trim() || newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSubmitting(true);
    const resetDone = await resetPassword(username, newPassword);
    setSubmitting(false);

    if (resetDone) {
      setSuccess('Password reset successfully!');
      setUsername('');
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPage('login');
    } else {
      setError('Username not found');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

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
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Create a new password (min 6 characters)"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? 'Resetting...' : 'Reset Password'}
          </button>

          <p className="login-link">
            Remember your password?{' '}
            <a onClick={() => setCurrentPage('login')}>Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
