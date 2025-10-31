import React from 'react';
import UserList from './UserList';

const RoleManager = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">
            <i className="fas fa-users-cog" style={{ marginRight: '0.5rem' }}></i>
            Admin Panel - User Management
          </h1>
          <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
            Manage user roles and permissions across the system
          </p>
        </div>
      </div>

      <UserList />
    </div>
  );
};

export default RoleManager;