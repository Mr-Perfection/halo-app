import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from 'urql';

import { AdminGetUsersDocument, UserRole } from 'generated/graphql';
import { AuthContext } from 'Routes';
import paths from 'constants/nav';

function AdminPage() {
  const currentUser = React.useContext(AuthContext);
  const [getUsersResult] = useQuery({
    query: AdminGetUsersDocument,
    variables: {},
  });
  // TODO: this can be abstracted as some kind for permission layer component.
  const role = currentUser?.role;
  if (role === undefined || role !== UserRole.Admin) {
    return (<Navigate to={paths.NOT_FOUND} />);
  }

  return (<div>Hello world</div>);
}

export default AdminPage;
