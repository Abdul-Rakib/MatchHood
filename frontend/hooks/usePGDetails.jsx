import { useState } from 'react';
import axios from 'axios';

const usePGDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pgDetails, setPgDetails] = useState(null);

  const fetchPGDetails = async (pgId) => {
    setLoading(true);
    setError(null);
    setPgDetails(null);

    try {
      const response = await axios.get(`/api/v1/pgs/pg-by-id/${pgId}`);
      const { success, data } = response.data;

      if (success) {
        setPgDetails(data);
      } else {
        setError('PG not found');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred while fetching PG details');
    } finally {
      setLoading(false);
    }
  };

  return { 
    fetchPGDetails, 
    loading, 
    error, 
    pgDetails,
    setPgDetails,
    setError
  };
};

export default usePGDetails;