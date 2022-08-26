import React, { useEffect } from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';

import App from 'App';
import { Signup } from 'pages/Auth';
import paths from 'constants/nav';
import { User } from 'generated/graphql';
import Login from 'pages/Auth/Login';
import PrivateRoute from 'atoms/PrivateRoute';
import AdminPage from 'pages/Admin';
import AppTemplate from 'template/AppTemplate';
import OperatorPage from 'pages/Operator';
import NotFound from 'pages/NotFound';

export const AuthContext = React.createContext<User | null>(null);

function AppRoutes() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const location = useLocation();
  const locUser = location.state as User;
  const handleLogin = async (user: User) => {
    navigate(paths.ROOT, { state: user });
  };

  useEffect(() => {
    if (locUser) {
      setCurrentUser(locUser);
    }
  }, [locUser]);

  return (
    <AuthContext.Provider value={currentUser}>
      <AppTemplate>
        <Routes>
          {/* TODO: Based on permissions, render root page to operator or dashboard. */}
          <Route path={paths.ROOT} element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="*"
            element={<NotFound />}
          />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path={paths.ADMIN} element={<PrivateRoute element={<AdminPage />} />} />
          <Route path={paths.OPERATOR} element={<PrivateRoute element={<OperatorPage />} />} />
        </Routes>
      </AppTemplate>
      {/* <Route path="/admin" element={<AdminPage />} /> */}
    </AuthContext.Provider>
  );
}

export default AppRoutes;
