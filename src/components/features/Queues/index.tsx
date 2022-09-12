import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';
import { useQuery } from 'urql';
import { GetAllQueuesDocument, Queue } from 'generated/graphql';
// src
import LoadingPage from 'components/pages/Loading';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'widgetCount',
    headerName: 'Widget count',
    width: 150,
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    width: 150,
    editable: true,
  },
];

function QueueTable({ rows } : { rows: Queue[] }) {
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
export default function QueueList() {
  const [{ fetching, data, error }] = useQuery({
    query: GetAllQueuesDocument,
    variables: {},
  });

  if (fetching) return <LoadingPage />;
  const hasError = error || data === undefined;
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      { hasError
        ? <Box>Something went wrong.</Box>
        : <QueueTable rows={data.getAllQueues} />}
    </Paper>
  );
}
