import * as React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from '@mui/material';

import { DbCredentials } from 'generated/graphql';
import AddDatabaseButton from 'components/features/Integrations/AddDatabaseButton';

function IntegrationItem({ database }: { database: DbCredentials }) {
  const {
    type, host, port, name, username, password,
  } = database;
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {type}
        </Typography>
        <TextField
          label="Host"
          defaultValue={host}
          InputProps={{
            readOnly: true,
          }}
          margin="normal"
        />
        <TextField
          label="Port"
          defaultValue={port}
          InputProps={{
            readOnly: true,
          }}
          margin="normal"
        />
        <TextField
          label="Database Name"
          defaultValue={name}
          InputProps={{
            readOnly: true,
          }}
          margin="normal"
        />
        <TextField
          label="Database Username"
          defaultValue={username}
          InputProps={{
            readOnly: true,
          }}
          margin="normal"
        />
        <TextField
          label="Database Password"
          type="password"
          defaultValue={password}
          InputProps={{
            readOnly: true,
          }}
          margin="normal"
        />
      </CardContent>
      <CardActions>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
export default function IntegrationList({ integrations } : { integrations: DbCredentials[] }) {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
