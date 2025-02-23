import React from 'react';
import { useDispatch } from 'react-redux';
import { clearToken } from '../store/authSlice';
import { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    setAuthToken(null);
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
