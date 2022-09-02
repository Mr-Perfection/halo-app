import React, { lazy } from 'react';

import MainLayout from 'components/layout/MainLayout';
import PrivateRoute from 'components/molecules/PrivateRoute';
import { UserRole } from 'generated/graphql';
import { pathNames } from 'constants/nav';
import Loadable from 'routes/Loadable';
import DBCredentials from 'components/features/DBCredentials';

const Home = Loadable(lazy(() => import('components/features/Home')));
const Dashboard = Loadable(lazy(() => import('components/features/Dashboard')));
const Users = Loadable(lazy(() => import('components/features/UserList')));
const Operator = Loadable(lazy(() => import('components/features/Operator')));

const MainRoutes = {
  path: pathNames.ROOT,
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <PrivateRoute
        permissions={[UserRole.Admin, UserRole.Operator]}
        element={<Home />}
      />,
    },
    {
      path: pathNames.DASHBOARD,
      element: <PrivateRoute
        permissions={[UserRole.Admin]}
        element={<Dashboard />}
      />,
    },
    {
      path: pathNames.USERS,
      element: <PrivateRoute
        permissions={[UserRole.Admin]}
        element={<Users />}
      />,
    },
    {
      path: pathNames.DB,
      element: <PrivateRoute
        permissions={[UserRole.Admin]}
        element={<DBCredentials />}
      />,
    },
    {
      path: pathNames.OPERATOR,
      element: <PrivateRoute
        permissions={[UserRole.Operator]}
        element={<Operator />}
      />,
    },
  ],
};

export default MainRoutes;
