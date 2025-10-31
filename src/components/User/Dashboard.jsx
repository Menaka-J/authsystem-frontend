import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';

const Dashboard = () => {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await updateProfile(profile);

    if (result.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } else {
      setMessage({ type: 'error', text: result.message });
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const getRoleDisplay = (role) => {
    const roleStyles = {
      user: { bg: '#dbeafe', color: '#1e40af', icon: 'fas fa-user' },
      moderator: { bg: '#fef3c7', color: '#92400e', icon: 'fas fa-user-shield' },
      admin: { bg: '#fce7f3', color: '#be185d', icon: 'fas fa-crown' }
    };
    
    const style = roleStyles[role] || roleStyles.user;
    
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        background: style.bg,
        color: style.color,
        fontWeight: '600',
        fontSize: '0.9rem'
      }}>
        <i className={style.icon}></i>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </div>
    );
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">
            <i className="fas fa-tachometer-alt" style={{ marginRight: '0.5rem' }}></i>
            Dashboard
          </h1>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type === 'error' ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* User Info Card */}
          <div className="card" style={{ margin: 0 }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text)' }}>
              <i className="fas fa-user-circle" style={{ marginRight: '0.5rem' }}></i>
              User Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <strong>Username:</strong>
                <div style={{ color: 'var(--text-light)' }}>{user.username}</div>
              </div>
              <div>
                <strong>Email:</strong>
                <div style={{ color: 'var(--text-light)' }}>{user.email}</div>
              </div>
              <div>
                <strong>Role:</strong>
                <div>{getRoleDisplay(user.role)}</div>
              </div>
              <div>
                <strong>User ID:</strong>
                <div style={{ 
                  color: 'var(--text-light)', 
                  fontSize: '0.9rem',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all'
                }}>
                  {user.id}
                </div>
              </div>
            </div>
          </div>

          {/* Update Profile Form */}
          <div className="card" style={{ margin: 0 }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text)' }}>
              <i className="fas fa-edit" style={{ marginRight: '0.5rem' }}></i>
              Update Profile
            </h3>
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  value={profile.username}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading && <div className="spinner" style={{ marginRight: '0.5rem' }}></div>}
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;