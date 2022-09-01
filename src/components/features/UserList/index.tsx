import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
// import { useQuery } from 'urql';
// import { AdminGetUsersDocument } from 'generated/graphql';

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
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
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

const rows = [
  {
    id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,
  },
  {
    id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42,
  },
  {
    id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45,
  },
  {
    id: 4, lastName: 'Stark', firstName: 'Arya', age: 16,
  },
  {
    id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null,
  },
  {
    id: 6, lastName: 'Melisandre', firstName: null, age: 150,
  },
  {
    id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44,
  },
  {
    id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36,
  },
  {
    id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65,
  },
];

export default function UserList() {
  // const [{fetching, data, error}] = useQuery({
  //   query: AdminGetUsersDocument,
  //   variables: {},
  // });
  // // TODO: this can be abstracted as some kind for permission layer component.
  // // const role = currentUser?.role;
  // // if (role === undefined || role !== UserRole.Admin) {
  // //   return (<Navigate to={paths.NOT_FOUND} />);
  // // }

  // const rows =
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
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
    </Paper>
  );
}
