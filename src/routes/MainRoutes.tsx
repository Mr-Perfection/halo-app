import React from 'react';
import loadable from '@loadable/component';

import MainLayout from 'components/layout/MainLayout';
import PrivateRoute from 'components/molecules/PrivateRoute';
import { UserRole } from 'generated/graphql';
import { pathNames } from 'constants/nav';

const Home = loadable(() => import('components/features/Home'));
const Dashboard = loadable(() => import('components/features/Dashboard'));
const Users = loadable(() => import('components/features/UserList'));
const Operator = loadable(() => import('components/features/Operator'));

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
      path: pathNames.OPERATOR,
      element: <PrivateRoute
        permissions={[UserRole.Operator]}
        element={<Operator />}
      />,
    },
  ],
};

export default MainRoutes;
