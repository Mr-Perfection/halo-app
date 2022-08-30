import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from 'urql';

import paths from 'constants/nav';
import { useAppDispatch, useAppSelector } from 'app/store';
import { PrivateRouteGetCurrentUserDocument, UserRole } from 'generated/graphql';
import { setUser } from 'components/features/Auth/userSlice';
import { Box } from '@mui/material';
import { includes, isEmpty } from 'lodash';
import NotFound from 'components/features/NotFound';

function PrivateRoute({ element, permissions }: { element: JSX.Element, permissions: UserRole[] }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  if (fetching) return (<Box>Loading...</Box>);
  if (currentUser === null && isEmpty(getUserData)) {
    return (<Navigate to={paths.LOGIN} replace />);
  }
  const userRole = getUserData?.role;
  if (userRole === undefined || !includes(permissions, userRole)) {
    navigate(-1);
    return (<NotFound />);
  }
  return element;
}

export default PrivateRoute;
