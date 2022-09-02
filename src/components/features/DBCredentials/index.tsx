import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';
import { AdminGetUsersDocument, User } from 'generated/graphql';
import { useQuery } from 'urql';
import LoadingPage from 'components/pages/Loading';

export default function DBCredentials() {
  return (
    <Paper sx={{ width: '100%' }}>
      Hello world.
    </Paper>
  );
}
