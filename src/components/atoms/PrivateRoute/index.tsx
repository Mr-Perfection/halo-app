import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from 'urql';

import paths from 'constants/nav';
import { useAppDispatch, useAppSelector } from 'app/store';
import { PrivateRouteGetCurrentUserDocument } from 'generated/graphql';
import { setUser } from 'components/features/Auth/userSlice';
import { Box } from '@mui/material';
import { isEmpty } from 'lodash';

function PrivateRoute({ element }: { element: JSX.Element }) {
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
  if (fetching) return (<Box>Loading...</Box>);
  if (currentUser === null && isEmpty(getUserData)) {
    return (<Navigate to={paths.LOGIN} replace />);
  }

  return element;
}

export default PrivateRoute;
