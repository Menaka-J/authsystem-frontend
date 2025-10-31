import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await adminAPI.listUsers();
      setUsers(response.data.users);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load users' });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminAPI.assignRole({ userId, role: newRole });
      setMessage({ type: 'success', text: 'Role updated successfully!' });
      
      // Update local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update role' });
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      user: 'badge-user',
      moderator: 'badge-moderator',
      admin: 'badge-admin'
    };
    return <span className={`badge ${badges[role]}`}>{role}</span>;
  };

  if (loading) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', margin: '0 auto 1rem' }}></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="card-title">
          <i className="fas fa-users" style={{ marginRight: '0.5rem' }}></i>
          User Management
        </h2>
        <span className="badge badge-admin">{users.length} Users</span>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type === 'error' ? 'error' : 'success'}`}>
          {message.text}
        </div>
      )}

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Actions</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <strong>{user.username}</strong>
                  {user.role === 'admin' && (
                    <i className="fas fa-crown" style={{ marginLeft: '0.5rem', color: '#f59e0b' }}></i>
                  )}
                </td>
                <td>{user.email}</td>
                <td>{getRoleBadge(user.role)}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="form-select"
                    style={{ width: 'auto', minWidth: '120px' }}
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
          <i className="fas fa-users" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
          <p>No users found</p>
        </div>
      )}
    </div>
  );
};

export default UserList;