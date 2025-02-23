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
      <nav className="bg-blue-600 p-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">Task Management</div>
        <div>
          {!token ? (
            <>
              <Link to="/login" className="text-white mx-2 hover:underline">Login</Link>
              <Link to="/register" className="text-white mx-2 hover:underline">Register</Link>
            </>
          ) : (
            <>
              <Link to="/tasks" className="text-white mx-2 hover:underline">Tasks</Link>
              <LogoutButton />
            </>
          )}
        </div>
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