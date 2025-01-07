import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

export default function NewStoryPage() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImageUrl: '',
    genre: ''
  });

  if (!user) {
    // If not logged in, redirect or show a message
    return <div>Please <a href="/login">login</a> first.</div>;
  }

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/stories', formData);
      alert('Story created!');
      window.location.href = '/'; // redirect home or to story page
    } catch (err) {
      console.error('Create story error:', err);
      alert('Failed to create story');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create a New Story</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input name="title" onChange={handleChange} value={formData.title} />
        </div>
        <div>
          <label>Content: </label>
          <textarea name="content" onChange={handleChange} value={formData.content} />
        </div>
        <div>
          <label>Cover Image URL: </label>
          <input
            name="coverImageUrl"
            onChange={handleChange}
            value={formData.coverImageUrl}
          />
        </div>
        <div>
          <label>Genre: </label>
          <input name="genre" onChange={handleChange} value={formData.genre} />
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
