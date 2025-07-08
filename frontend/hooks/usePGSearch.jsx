import { useState } from 'react';
import axios from 'axios';

const usePGSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchByArea = async (area) => {
    setLoading(true);
    setError(null);
    setSearchQuery(area);

    try {
      const response = await axios.get(`/api/v1/pg/pg-by-area/${area}`);
      const { success, data } = response.data;

      if (success) {
        setResults(data.results);
      } else {
        setError('No PGs found in this area');
        setResults([]);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred while searching');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const matchPGs = async (preferences) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/v1/pg/match', preferences);
      const { success, data } = response.data;

      if (success) {
        setResults(data.results);
      } else {
        setError('No matching PGs found');
        setResults([]);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred while matching PGs');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { 
    searchByArea, 
    matchPGs, 
    loading, 
    error, 
    results, 
    searchQuery,
    setResults,
    setError
  };
};

export default usePGSearch;