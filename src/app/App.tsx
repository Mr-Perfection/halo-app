import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

import paths from 'constants/nav';
import { SignupPage, LoginPage } from 'components/features/Auth';
import PrivateRoute from 'components/molecules/PrivateRoute';
import AppTemplate from 'components/template/AppTemplate';
import OperatorPage from 'components/features/Operator';
import NotFound from 'components/features/NotFound';
import Home from 'components/features/Home';
import PublicRoute from 'components/molecules/PublicRoute';
import Dashboard from 'components/features/Dashboard';
import UserList from 'components/features/UserList';
import { UserRole } from 'generated/graphql';

// TODO: create nested routes so we don't need to use this utility method.
// Also, AppTemplate can be inside nested routes that are signed in.
// This is not the most optimal approach...
const getCustomerPath = (path: string) => (`:customerSlug${path}`);

function App() {
  return (
    <AppTemplate>
      <Routes>
        {/* TODO: Based on permissions, render root page to operator or dashboard. */}
        <Route
          path={paths.ROOT}
          element={
            <PrivateRoute permissions={[UserRole.Admin, UserRole.Operator]} element={<Home />} />
          }
        />
        {/* <Route path={paths.SIGNUP} element={<SignupPage />} /> */}
        <Route
          path={getCustomerPath(paths.SIGNUP)}
          element={(
            <PublicRoute element={<SignupPage />} />
          )}
        />
        <Route path={paths.LOGIN} element={<LoginPage />} />
        <Route
          path={paths.DASHBOARD}
          element={(
            <PrivateRoute
              permissions={[UserRole.Admin]}
              element={<Dashboard />}
            />
          )}
        />
        <Route
          path={paths.USERS}
          element={(
            <PrivateRoute
              permissions={[UserRole.Admin]}
              element={<UserList />}
            />
          )}
        />
        {/* <Route path={paths.ADMIN}
        element={<PrivateRoute permissions={[UserRole.Admin]} element={
          <Navigate to={paths.DASHBOARD}/>} />} /> */}
        <Route
          path={paths.OPERATOR}
          element={<PrivateRoute permissions={[UserRole.Operator]} element={<OperatorPage />} />}
        />
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
