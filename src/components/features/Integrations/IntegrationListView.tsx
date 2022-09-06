import * as React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

import { DbCredentials } from 'generated/graphql';
import AddDatabaseButton from 'components/features/Integrations/AddDatabaseButton';

function IntegrationItem({ type, connectionString }: { type: string, connectionString: string }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {type}
        </Typography>
        <Typography variant="body2">
          {connectionString}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
export default function IntegrationList({ integrations } : { integrations: DbCredentials[] }) {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {integrations.map((integration) => (
        <Grid item xs={6}>
          <IntegrationItem
            type={integration.type}
            connectionString={integration.connectionString}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <AddDatabaseButton />
      </Grid>
    </Grid>
  );
}
