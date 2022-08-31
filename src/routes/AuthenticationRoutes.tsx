import React from 'react';
import loadable from '@loadable/component';

import { pathNames } from 'constants/nav';
import MinimalLayout from 'components/layout/MinimalLayout';
import InternalRoute from 'components/molecules/InternalRoute';

const Signup = loadable(() => import('components/features/Auth/Signup'));
const Login = loadable(() => import('components/features/Auth/Login'));

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
