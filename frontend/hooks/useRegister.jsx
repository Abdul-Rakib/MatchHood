import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {GlobalContext} from "../src/context/globalContext";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    setMsg(null);

    const submitData = {
      name: formData.businessName,
      email: formData.email,
      mobileNumber: formData.phoneNumber,
      password: formData.password,
    };

    try {
      const response = await axios.post('/api/v1/auth/register', submitData);
      const { success, msg, data } = response.data;

      if (success) {
        setMsg(msg || 'Registered successfully');
        navigate('/login');
      } else {
        setError(msg || 'Registration failed');
      }

    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, msg };
};

export default useRegister;
