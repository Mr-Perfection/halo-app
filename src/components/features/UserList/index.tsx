import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';
import { AdminGetUsersDocument, User } from 'generated/graphql';
import { useQuery } from 'urql';
import LoadingPage from 'components/pages/Loading';

const columns: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

function UserListTable({ rows } : { rows: User[] }) {
  return (
    // TODO: add pagination.
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
    />
  );
}
export default function UserList() {
  const [{ fetching, data, error }] = useQuery({
    query: AdminGetUsersDocument,
    variables: {},
  });

  if (fetching) return <LoadingPage />;
  const hasError = error || data === undefined;
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      { hasError
        ? <Box>Something went wrong.</Box>
        : <UserListTable rows={data.getUsers} />}
    </Paper>
  );
}
