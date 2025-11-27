import axios from 'axios';

// WHY: Submit application with resume file using multipart/form-data
export const submitApplication = async (formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/applications`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
