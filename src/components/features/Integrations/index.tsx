import * as React from 'react';
import {
  Box, Button, Container, Grid, Paper,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useQuery } from 'urql';
import LoadingPage from 'components/pages/Loading';
import Card from 'components/molecules/Card';

export default function IntegrationList() {
  return (
    <Paper>
      <Button variant="outlined" startIcon={<AddCircleIcon />}>
        Add Database
      </Button>
    </Paper>
  );
}
