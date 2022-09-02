import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from 'urql';

import paths from 'constants/nav';
import { useAppDispatch, useAppSelector } from 'app/store';
import { PrivateRouteGetCurrentUserDocument, UserRole } from 'generated/graphql';
import { setUser } from 'components/features/Auth/userSlice';
import { isEmpty } from 'lodash';
import NotFound from 'components/features/NotFound';
import { hasPermission } from 'utils/auth';
import LoadingPage from 'components/pages/Loading';

function PrivateRoute({ element, permissions }: { element: JSX.Element, permissions: UserRole[] }) {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.auth.user);

  const [userResult] = useQuery({
    query: PrivateRouteGetCurrentUserDocument,
  });
  const { data, fetching } = userResult;
  const getUserData = data?.getUser;

  useEffect(() => {
    if (!fetching && !isEmpty(getUserData)) {
      dispatch(setUser(getUserData));
    }
  }, [getUserData, fetching, dispatch]);

  // TODO: create loading screen.
  if (fetching) return (<LoadingPage />);
  if (currentUser === null && isEmpty(getUserData)) {
    return (<Navigate to={paths.LOGIN} replace />);
  }
  const userRole = getUserData?.role;
  if (userRole === undefined || !hasPermission(userRole, permissions)) {
    return (<NotFound />);
  }
  return element;
}

export default PrivateRoute;
