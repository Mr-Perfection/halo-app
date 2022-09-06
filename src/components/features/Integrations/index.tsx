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
import LoadingPage from 'components/pages/Loading';
import Card from 'components/molecules/Card';
import AddDatabaseButton from 'components/features/Integrations/AddDatabaseButton';

export default function IntegrationList() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper sx={{ minHeight: '50vh', paddingTop: 3, paddingLeft: 3 }}>
      <AddDatabaseButton />
    </Paper>
  );
}
