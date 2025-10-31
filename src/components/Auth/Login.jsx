import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
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

    const result = await login(formData.email, formData.password);

    if (result.success) {
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }

    setLoading(false);
  };

  const fields = [
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
      placeholder: 'Enter your password',
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
          title="Welcome Back"
          subtitle="Sign in to your account"
          buttonText={loading ? 'Signing In...' : 'Sign In'}
          loading={loading}
          message={message}
          fields={fields}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          footer={
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                Sign up
              </Link>
            </p>
          }
        />
      </div>
    </div>
  );
};

export default Login;