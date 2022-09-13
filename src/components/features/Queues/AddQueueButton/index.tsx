import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMutation } from 'urql';
// src
import { useAppDispatch } from 'app/store';
// import LoadingPage from 'components/pages/Loading';
import { DbType, CreateQueueDocument } from 'generated/graphql';
import { addDatabase } from 'components/features/Integrations/integrationsSlice';

export default function AddQueueButton() {
  const [open, setOpen] = useState(false);
  const [queue, createQueue] = useMutation(CreateQueueDocument);
  const dispatch = useAppDispatch();

  const initialState = {
    name: '',
  };
  // Workaround: since there is no useLazyQuery in urql, we can use setState.
  // const [formData, setFormData] = useState(initialState);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Name is required.'),
  });

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const {
        name,
      } = values;
      const result = await createQueue({
        name,
      });
      const { data } = result;
      if (data !== undefined) {
        dispatch(addDatabase(data.createQueue));
        resetForm();
      }
      handleClose();
    },
  });
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        disabled={dbCredentials.fetching}
        startIcon={<AddCircleIcon />}
      >
        Add Database
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Database</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add credentials to connect your database.
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              variant="filled"
              sx={{ minWidth: 120 }}
              margin="normal"
            >
              <InputLabel id="add-database-type">Type</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                name="databaseType"
                id="databaseType"
                value={formik.values.databaseType}
                onChange={formik.handleChange}
                error={formik.touched.databaseType && Boolean(formik.errors.databaseType)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={DbType.Postgresql}>PostgresSQL</MenuItem>
                <MenuItem value={DbType.Mysql}>MySQL</MenuItem>
              </Select>
              <FormHelperText>
                {formik.touched.databaseType
               && formik.errors.databaseType}

              </FormHelperText>
            </FormControl>
            <TextField
              fullWidth
              id="host"
              name="host"
              label="Host"
              value={formik.values.host}
              onChange={formik.handleChange}
              error={formik.touched.host && Boolean(formik.errors.host)}
              helperText={formik.touched.host && formik.errors.host}
              margin="normal"
            />
            <TextField
              fullWidth
              id="port"
              name="port"
              label="Port"
              value={formik.values.port}
              onChange={formik.handleChange}
              error={formik.touched.port && Boolean(formik.errors.port)}
              helperText={formik.touched.port && formik.errors.port}
              margin="normal"
            />
            <TextField
              fullWidth
              id="databaseName"
              name="databaseName"
              label="Database Name"
              value={formik.values.databaseName}
              onChange={formik.handleChange}
              error={formik.touched.databaseName && Boolean(formik.errors.databaseName)}
              helperText={formik.touched.databaseName && formik.errors.databaseName}
              margin="normal"
            />
            <TextField
              fullWidth
              id="databaseUsername"
              name="databaseUsername"
              label="Database Username"
              value={formik.values.databaseUsername}
              onChange={formik.handleChange}
              error={formik.touched.databaseUsername && Boolean(formik.errors.databaseUsername)}
              helperText={formik.touched.databaseUsername && formik.errors.databaseUsername}
              margin="normal"
            />
            <TextField
              fullWidth
              id="databasePassword"
              name="databasePassword"
              label="Database Password"
              value={formik.values.databasePassword}
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.databasePassword && Boolean(formik.errors.databasePassword)}
              helperText={formik.touched.databasePassword && formik.errors.databasePassword}
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="submit"
                disabled={dbCredentials.fetching}
              >
                Submit

              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
