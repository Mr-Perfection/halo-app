import React, { useEffect } from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';

import { Signup } from 'components/features/Auth';
import paths from 'constants/nav';
import { User } from 'generated/graphql';
import Login from 'components/features/Auth/Login';
import PrivateRoute from 'components/atoms/PrivateRoute';
import AdminPage from 'components/features/Admin';
import AppTemplate from 'components/template/AppTemplate';
import OperatorPage from 'components/features/Operator';
import NotFound from 'components/features/NotFound';
import Redirect from 'components/features/Redirect';

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
          <Route path={paths.ROOT} element={<Redirect />} />
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
