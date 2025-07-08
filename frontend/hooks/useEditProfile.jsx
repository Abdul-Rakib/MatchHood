import { useState } from 'react';
import axios from 'axios';

export const useEditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateProfile = async (formData) => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {

      const response = await axios.post(
        '/api/v1/user/update-profile',
        formData,
      );

      if (response.data?.success) {
        const updatedUser = response.data.data;
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Update user in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));

        setSuccessMessage(response.data.msg || 'Profile updated successfully');
        return { success: true, data: updatedUser };
      } else {
        setErrorMessage(response.data?.msg || 'Failed to update profile');
        return { success: false };
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || 'Something went wrong while updating profile'
      );
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    loading,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
  };
};
