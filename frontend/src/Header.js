import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from './AuthContext';

const Header = ({ setCurrentPage }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || 'https://via.placeholder.com/50');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        localStorage.setItem('profilePic', base64);
        setProfilePic(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('landing');
    }
  };

  return (
    <header className="webpage-header">
      {showProfileMenu && <div className="profile-backdrop" onClick={() => setShowProfileMenu(false)}></div>}
      <div className="header-content">
        <h1 className="brand">{isLoggedIn ? `Hai, ${user?.username}!` : 'Expl Career'}</h1>
        {isLoggedIn && (
          <div className="header-profile">
            <div className="profile-avatar" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <img src={profilePic} alt="Profile" />
            </div>
            {showProfileMenu && (
              <div className="profile-menu">
                <p><strong>{user?.username}</strong></p>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
