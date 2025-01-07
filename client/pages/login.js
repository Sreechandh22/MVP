import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', formData);
      login(data.user, data.token);
      window.location.href = '/'; // redirect home
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
