import React from 'react';
import {
  Grid,
} from '@mui/material';

import { DbCredentials } from 'generated/graphql';
import AddDatabaseButton from 'components/features/Integrations/AddDatabaseButton';
import IntegrationItem from './IntegrationItem';

export default function IntegrationList({ integrations } : { integrations: DbCredentials[] }) {
  return (
    <Grid
      container
      rowSpacing={3}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {integrations.map((integration) => (
        <Grid item xs={6} key={integration.id}>
          <IntegrationItem
            database={integration}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <AddDatabaseButton />
      </Grid>
    </Grid>
  );
}
