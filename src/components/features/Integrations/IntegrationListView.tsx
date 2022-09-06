import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { DbCredentials, DeleteIntegrationsDbCredentialsDocument } from 'generated/graphql';
import AddDatabaseButton from 'components/features/Integrations/AddDatabaseButton';
import { useMutation } from 'urql';
import { useAppDispatch } from 'app/store';
import { removeDatabase } from 'components/features/Integrations/integrationsSlice';

// TODO: refactor this to new file (IntegrationItem) within this folder.
function IntegrationItem({ database }: { database: DbCredentials }) {
  const {
    id, type, host, port, name, username, password,
  } = database;
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deletedDBCredentialsResult, deleteDBCredentials] = useMutation(
    DeleteIntegrationsDbCredentialsDocument,
  );

  const handleDelete = () => {
    setOpen(false);
    deleteDBCredentials({ id });
  };

  const { data } = deletedDBCredentialsResult;
  useEffect(() => {
    if (data) {
      dispatch(removeDatabase(data.deleteDBCredentials));
    }
  }, [data, dispatch]);
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
        <Button size="small" onClick={handleClickOpen}>Delete</Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>
            Delete Database
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are deleting the database credentials. Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={handleClose} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
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
