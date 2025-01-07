import { useState } from 'react';
import api from '../services/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful. You can now log in.');
      window.location.href = '/login';
    } catch (err) {
      console.error('Register error:', err);
      alert('Registration failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input name="username" onChange={handleChange} value={formData.username} />
        </div>
        <div>
          <label>Email: </label>
          <input name="email" onChange={handleChange} value={formData.email} />
        </div>
        <div>
          <label>Password: </label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
