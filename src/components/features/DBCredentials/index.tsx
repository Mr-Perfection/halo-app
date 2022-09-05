import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import {
  Box, Container, Grid, Paper,
} from '@mui/material';
import { AdminGetUsersDocument, User } from 'generated/graphql';
import { useQuery } from 'urql';
import LoadingPage from 'components/pages/Loading';
import Card from 'components/molecules/Card';

export default function DBCredentials() {
  return (
    <Grid container spacing={3}>
      <Paper>
        <Card />
      </Paper>
    </Grid>
  );
}
