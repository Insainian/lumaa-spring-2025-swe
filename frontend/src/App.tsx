// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
import LogoutButton from './components/LogoutButton';

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Router>
      <nav>
        {!token ? (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/tasks">Tasks</Link> | <LogoutButton />
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
