import * as React from 'react';
import {
  Button,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useQuery } from 'urql';
import LoadingView from 'components/pages/Loading';
import AddDatabaseButton from 'components/features/Integrations/AddDatabaseButton';
import { DbCredentials, GetAllIntegrationsDbCredentialsDocument } from 'generated/graphql';
import IntegrationList from 'components/features/Integrations/IntegrationListView';
import ErrorPage from 'components/pages/Error';

function IntegrationsContent({ integrations }: { integrations: DbCredentials[] }) {
  return (<IntegrationList integrations={integrations} />);
}

export default function IntegrationsPage() {
  const [getAllIntegrationsResult, getAllIntegrations] = useQuery({
    query: GetAllIntegrationsDbCredentialsDocument,
  });
  const { data, error, fetching } = getAllIntegrationsResult;
  if (error !== undefined || data === undefined) return <ErrorPage />;
  const integrations = data.getAllDBCredentials;
  console.log('integrations is', integrations);
  return (
    <Paper sx={{ padding: 3 }}>
      { fetching ? <LoadingView /> : <IntegrationsContent integrations={integrations} />}
    </Paper>
  );
}
