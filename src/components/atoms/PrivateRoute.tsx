import React from 'react';
import { Navigate } from 'react-router-dom';

import paths from 'constants/nav';
import { AuthContext } from 'app/App';

function PrivateRoute({ element }: { element: JSX.Element }) {
  const currentUser = React.useContext(AuthContext);
  if (currentUser === null) {
    return (<Navigate to={paths.LOGIN} replace />);
  }

  return element;
}

export default PrivateRoute;
