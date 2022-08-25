import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import App from 'App';
import { Signup } from 'pages/Auth';
import paths from 'constants/nav';
import { User } from 'generated/graphql';
import Login from 'pages/Auth/Login';

function AppRoutes() {
  const navigate = useNavigate();

  const handleLogin = async (user: User) => {
    navigate(paths.ROOT, { state: user });
  };
  return (
    <Routes>
      {/* TODO: Based on permissions, render root page to operator or dashboard. */}
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
    </Routes>
  );
}

export default AppRoutes;
