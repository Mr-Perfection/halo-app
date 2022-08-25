import React from 'react';

import { AdminGetUsersDocument } from 'generated/graphql';
import { useQuery } from 'urql';

function AdminPage({ id }: { id: number }) {
  const [getUsersResult] = useQuery({
    query: AdminGetUsersDocument,
    variables: {},
  });
  console.log('getUsersResult', getUsersResult);
  return (<div>Hello world</div>);
}

export default AdminPage;
