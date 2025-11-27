import { useState, useEffect } from 'react';
import { getJobs } from '../api/jobsApi';

// WHY: Custom hook to fetch job listings with loading and error states
const useJobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getJobs();
      setData(result.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { data, loading, error, refetch: fetchJobs };
};

export default useJobs;
