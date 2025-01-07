import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Home() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await api.get('/stories');
        setStories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStories();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Latest Stories</h1>
      {stories.map(story => (
        <div key={story._id} style={{ marginTop: '10px' }}>
          <h2>{story.title}</h2>
          <p>by {story.author.username}</p>
          <p>{story.content.substring(0, 100)}...</p>
          <a href={`/stories/${story._id}`}>Read more</a>
        </div>
      ))}
    </div>
  );
}
