import { useState } from 'react';
import axios from 'axios';

export const useKycUpload = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadKycDocuments = async (files, documentType, documentNumber) => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    setUploadProgress(0);

    try {
      // Validate inputs
      if (!files || files.length === 0) {
        setErrorMessage('Please select at least one document to upload');
        return { success: false };
      }

      if (!documentType || !documentNumber) {
        setErrorMessage('Document type and number are required');
        return { success: false };
      }

      // Create FormData
      const formData = new FormData();
      
      // Append multiple files
      for (let i = 0; i < files.length; i++) {
        formData.append('documents', files[i]);
      }
      
      formData.append('documentType', documentType);
      formData.append('documentNumber', documentNumber);

      const response = await axios.post(
        '/api/v1/user/kyc',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data?.success) {
        setSuccessMessage(response.data.msg || 'KYC documents uploaded successfully');
        setUploadProgress(100);
        return { success: true, data: response.data.data };
      } else {
        setErrorMessage(response.data?.msg || 'Failed to upload KYC documents');
        return { success: false };
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || 'Something went wrong while uploading KYC documents'
      );
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resetMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
    setUploadProgress(0);
  };

  return {
    uploadKycDocuments,
    loading,
    successMessage,
    errorMessage,
    uploadProgress,
    setSuccessMessage,
    setErrorMessage,
    resetMessages,
  };
};