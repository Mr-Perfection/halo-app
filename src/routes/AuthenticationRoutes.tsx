import React, { lazy } from 'react';

import { pathNames } from 'constants/nav';
import MinimalLayout from 'components/layout/MinimalLayout';
import InternalRoute from 'components/molecules/InternalRoute';
import Loadable from 'routes/Loadable';

const Signup = Loadable(lazy(() => import('components/features/Auth/Signup')));
const Login = Loadable(lazy(() => import('components/features/Auth/Login')));

const AuthenticationRoutes = {
  path: pathNames.ROOT,
  element: <MinimalLayout />,
  children: [
    {
      path: `:customerSlug/${pathNames.SIGNUP}`,
      element: <InternalRoute element={<Signup />} />,
    },
    {
      path: pathNames.LOGIN,
      element: <Login />,
    },
  ],
};

export default AuthenticationRoutes;
