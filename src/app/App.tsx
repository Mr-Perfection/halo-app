import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

import { SignupPage, LoginPage } from 'components/features/Auth';
import paths from 'constants/nav';
import PrivateRoute from 'components/molecules/PrivateRoute';
import AdminPage from 'components/features/Admin';
import AppTemplate from 'components/template/AppTemplate';
import OperatorPage from 'components/features/Operator';
import NotFound from 'components/features/NotFound';
import Redirect from 'components/features/Redirect';
import PublicRoute from 'components/molecules/PublicRoute';

// TODO: create nested routes so we don't need to use this utility method.
// Also, AppTemplate can be inside nested routes that are signed in.
// This is not the most optimal approach...
const getCustomerPath = (path: string) => (`:customerSlug${path}`);

function App() {
  return (
    <AppTemplate>
      <Routes>
        {/* TODO: Based on permissions, render root page to operator or dashboard. */}
        <Route path={paths.ROOT} element={<PrivateRoute element={<Redirect />} />} />
        {/* <Route path={paths.SIGNUP} element={<SignupPage />} /> */}
        <Route
          path={getCustomerPath(paths.SIGNUP)}
          element={(
            <PublicRoute element={<SignupPage />} />
      )}
        />
        <Route path={paths.LOGIN} element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path={paths.ADMIN} element={<PrivateRoute element={<AdminPage />} />} />
        <Route path={paths.OPERATOR} element={<PrivateRoute element={<OperatorPage />} />} />
        <Route
          path="*"
          element={<NotFound />}
        />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
      </Routes>
    </AppTemplate>
  );
}

export default App;
