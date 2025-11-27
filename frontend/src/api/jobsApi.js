import apiClient from './axios';

// WHY: Fetch all job listings from backend
export const getJobs = async () => {
  try {
    const response = await apiClient.get('/api/jobs');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// WHY: Fetch single job by ID
export const getJobById = async (jobId) => {
  try {
    const response = await apiClient.get(`/api/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
