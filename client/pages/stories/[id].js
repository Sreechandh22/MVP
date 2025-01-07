import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function StoryDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [story, setStory] = useState(null);

  useEffect(() => {
    if (!id) return; // wait for router to load
    const fetchStory = async () => {
      try {
        const { data } = await api.get(`/stories/${id}`);
        setStory(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStory();
  }, [id]);

  if (!story) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{story.title}</h1>
      <p>By {story.author?.username || 'Unknown'}</p>
      {story.coverImageUrl && (
        <img src={story.coverImageUrl} alt="Cover" style={{ maxWidth: '300px' }} />
      )}
      <p>{story.content}</p>
    </div>
  );
}
