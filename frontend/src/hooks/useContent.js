import { useState, useEffect } from 'react';
import { getContent } from '../api/contentApi';

// WHY: Custom hook to fetch website content with loading and error states
const useContent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getContent();
      setData(result.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch content');
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { data, loading, error, refetch: fetchContent };
};

export default useContent;
