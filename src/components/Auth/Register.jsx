import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await register(formData.username, formData.email, formData.password);

    if (result.success) {
      setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' });
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }

    setLoading(false);
  };

  const fields = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Choose a username',
      required: true,
      icon: 'fas fa-user'
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      icon: 'fas fa-envelope'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Create a password',
      required: true,
      icon: 'fas fa-lock'
    }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '80vh'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <AuthForm
          title="Create Account"
          subtitle="Sign up to get started"
          buttonText={loading ? 'Creating Account...' : 'Sign Up'}
          loading={loading}
          message={message}
          fields={fields}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          footer={
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                Sign in
              </Link>
            </p>
          }
        />
      </div>
    </div>
  );
};

export default Register;