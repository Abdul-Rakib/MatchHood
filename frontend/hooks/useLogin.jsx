import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {GlobalContext} from "../src/context/globalContext"

const useLogin = () => {
  const {host} = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setMsg(null);

    try {
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });

      const { success, msg, data} = response.data;

      if (success) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user', JSON.stringify(data));
        setMsg(msg);
        window.location.href = '/'
      } else {
        setError(msg || 'Login failed');
      }

    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, msg };
};

export default useLogin;
