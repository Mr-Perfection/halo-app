import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

import { Signup } from 'components/features/Auth';
import paths from 'constants/nav';
import { User } from 'generated/graphql';
import LoginPage from 'components/features/Auth/Login';
import PrivateRoute from 'components/atoms/PrivateRoute';
import AdminPage from 'components/features/Admin';
import AppTemplate from 'components/template/AppTemplate';
import OperatorPage from 'components/features/Operator';
import NotFound from 'components/features/NotFound';
import Redirect from 'components/features/Redirect';

export const AuthContext = React.createContext<User | null>(null);

function App() {
  return (
    <AppTemplate>
      <Routes>
        {/* TODO: Based on permissions, render root page to operator or dashboard. */}
        <Route path={paths.ROOT} element={<PrivateRoute element={<Redirect />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={<NotFound />}
        />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path={paths.ADMIN} element={<PrivateRoute element={<AdminPage />} />} />
        <Route path={paths.OPERATOR} element={<PrivateRoute element={<OperatorPage />} />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
      </Routes>
    </AppTemplate>
  );
}

export default App;
