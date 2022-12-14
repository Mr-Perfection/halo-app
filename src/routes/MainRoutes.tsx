import React, { lazy } from 'react';

import MainLayout from 'components/layout/MainLayout';
import PrivateRoute from 'components/molecules/PrivateRoute';
import { UserRole } from 'generated/graphql';
import { pathNames } from 'constants/nav';
import Loadable from 'routes/Loadable';

const Home = Loadable(lazy(() => import('components/features/Home')));
const Dashboard = Loadable(lazy(() => import('components/features/Dashboard')));
const Users = Loadable(lazy(() => import('components/features/UserList')));
const Operator = Loadable(lazy(() => import('components/features/Operator')));
const Integrations = Loadable(lazy(() => import('components/features/Integrations')));
const Queues = Loadable(lazy(() => import('components/features/Queues')));

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
      path: pathNames.INTEGRATION,
      element: <PrivateRoute
        permissions={[UserRole.Admin]}
        element={<Integrations />}
      />,
    },
    {
      path: pathNames.QUEUE,
      element: <PrivateRoute
        permissions={[UserRole.Admin]}
        element={<Queues />}
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
