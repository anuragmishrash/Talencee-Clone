import apiClient from './axios';

// WHY: Fetch all website content from backend
export const getContent = async () => {
  try {
    const response = await apiClient.get('/api/content');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// WHY: Update website content (admin only)
export const updateContent = async (contentData, apiKey) => {
  try {
    const response = await apiClient.put('/api/content', contentData, {
      headers: {
        'x-api-key': apiKey
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
