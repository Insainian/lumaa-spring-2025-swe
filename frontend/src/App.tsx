import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
      <nav className="bg-blue-600 p-4 flex items-center">
        {token && (
          <div className="ml-auto">
            <LogoutButton />
          </div>
        )}
      </nav>
      <div className="container mx-auto mt-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;