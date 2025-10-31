import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getRoleBadge = (role) => {
    const badges = {
      user: 'badge-user',
      moderator: 'badge-moderator',
      admin: 'badge-admin'
    };
    return <span className={`badge ${badges[role]}`}>{role}</span>;
  };

  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '1rem 0'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            textDecoration: 'none',
            color: 'var(--primary)',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            <i className="fas fa-shield-alt"></i> Authys
          </Link>

          <nav>
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span>Welcome, <strong>{user.username}</strong></span>
                  {getRoleBadge(user.role)}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/dashboard" className="btn btn-secondary btn-sm">
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="btn btn-secondary btn-sm">
                      <i className="fas fa-users-cog"></i> Admin
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn btn-danger btn-sm">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/login" className="btn btn-primary btn-sm">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
                <Link to="/register" className="btn btn-secondary btn-sm">
                  <i className="fas fa-user-plus"></i> Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;