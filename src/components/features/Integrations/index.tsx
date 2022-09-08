import React, { useEffect } from 'react';
import {
  Paper,
} from '@mui/material';

import { useQuery } from 'urql';
import { DbCredentials, GetAllIntegrationsDbCredentialsDocument } from 'generated/graphql';
import IntegrationList from 'components/features/Integrations/IntegrationListView';
import ErrorPage from 'components/pages/Error';
import { useAppDispatch, useAppSelector } from 'app/store';
import { setDatabases } from 'components/features/Integrations/integrationsSlice';
import LoadingPage from 'components/pages/Loading';

function IntegrationsContent({ integrations }: { integrations: DbCredentials[] }) {
  return (<IntegrationList integrations={integrations} />);
}

export default function IntegrationsPage() {
  const dispatch = useAppDispatch();
  const databases = useAppSelector((state) => state.integrations.databases);
  const [getAllIntegrationsResult, getAllIntegrations] = useQuery({
    query: GetAllIntegrationsDbCredentialsDocument,
    pause: true,
  });
  const { data, error, fetching } = getAllIntegrationsResult;

  useEffect(() => {
    getAllIntegrations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (databases === null && data !== undefined) {
      dispatch(setDatabases(data.getAllDBCredentials));
    }
  }, [databases, data, dispatch]);

  if (error !== undefined) return <ErrorPage />;
  if (fetching || data === undefined) return <LoadingPage />;

  return (
    <Paper sx={{ padding: 3 }}>
      <IntegrationsContent integrations={databases ?? []} />
    </Paper>
  );
}
