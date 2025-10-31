import React from 'react';

const AuthForm = ({ 
  title, 
  subtitle, 
  buttonText, 
  loading, 
  message, 
  fields, 
  formData, 
  onChange, 
  onSubmit, 
  footer 
}) => {
  return (
    <div className="card">
      <div className="card-header" style={{ textAlign: 'center', border: 'none' }}>
        <h1 className="card-title" style={{ marginBottom: '0.5rem' }}>{title}</h1>
        <p style={{ color: 'var(--text-light)' }}>{subtitle}</p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type === 'error' ? 'error' : 'success'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={onSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label className="form-label">
              <i className={field.icon} style={{ marginRight: '0.5rem' }}></i>
              {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            </label>
            <input
              type={field.type}
              name={field.name}
              className="form-input"
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={onChange}
              required={field.required}
              disabled={loading}
            />
          </div>
        ))}

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading && <div className="spinner" style={{ marginRight: '0.5rem' }}></div>}
          {buttonText}
        </button>
      </form>

      {footer}
    </div>
  );
};

export default AuthForm;