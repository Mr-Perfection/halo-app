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

import { DbCredentials, DeleteIntegrationsDbCredentialsDocument, TestIntegrationsDbConnectionDocument } from 'generated/graphql';
import { useMutation } from 'urql';
import { useAppDispatch } from 'app/store';
import { removeDatabase } from 'components/features/Integrations/integrationsSlice';
import { PaswordTextField } from 'components/atoms';
import { setAlert } from 'components/features/Alert/AlertSlice';

// TODO: refactor this to new file (IntegrationItem) within this folder.
export default function IntegrationItem({ database }: { database: DbCredentials }) {
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
  const [testDBConnectionResult, testDBConnection] = useMutation(
    TestIntegrationsDbConnectionDocument,
  );

  const handleDelete = () => {
    setOpen(false);
    deleteDBCredentials({ id });
  };

  const handleTestConnection = () => {
    testDBConnection(database);
  };

  useEffect(() => {
    if (deletedDBCredentialsResult.data) {
      dispatch(removeDatabase(deletedDBCredentialsResult.data.deleteDBCredentials));
      dispatch(setAlert({
        open: true,
        type: 'success',
        message: 'Successfully deleted the database credentials.',
      }));
    }
  }, [deletedDBCredentialsResult.data, dispatch]);

  useEffect(() => {
    if (testDBConnectionResult.error) {
      dispatch(setAlert({
        open: true,
        type: 'error',
        message: 'Error trying to connect to the database.',
      }));
    } else if (testDBConnectionResult.data) {
      dispatch(setAlert({
        open: true,
        type: 'success',
        message: 'Successfully tested connection with the database.',
      }));
    }
  }, [testDBConnectionResult, dispatch]);

  useEffect(() => {
    if (deletedDBCredentialsResult.error) {
      dispatch(setAlert({
        open: true,
        type: 'error',
        message: 'Error while trying to delete database credentials.',
      }));
    }
  }, [deletedDBCredentialsResult, dispatch]);

  const keys = [
    'Host',
    'Port',
    'Database Name',
    'Database Username'];
  const attributes = {
    [keys[0]]: host,
    [keys[1]]: port,
    [keys[2]]: name,
    [keys[3]]: username,
  };
  return (
    <Card variant="outlined" sx={{ padding: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {type}
        </Typography>
        <Grid
          container
          rowSpacing={1}
          alignItems="center"
        >
          {keys.map((key) => (
            <Grid item xs={6} key={key}>
              <TextField
                key={key}
                label={key}
                defaultValue={attributes[key]}
                InputProps={{
                  readOnly: true,
                }}
                margin="dense"
              />
            </Grid>
          ))}
          <Grid item xs={6}>
            <PaswordTextField
              label="Database Password"
              defaultValue={password}
              readOnly
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          rowSpacing={1}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Button sx={{ color: 'red' }} size="small" onClick={handleClickOpen}>Delete</Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Button size="small" onClick={handleTestConnection}>Test Connection</Button>
          </Grid>
        </Grid>
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
