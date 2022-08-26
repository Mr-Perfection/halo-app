import React from 'react';

// MUI
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { ListItemText, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// src
import Title from 'atoms/Title';
import Hotkeys from 'organisms/Hotkeys';
import { mainListItems, secondaryListItems } from 'molecules/ListItems';
import OnlineSwitch from 'pages/Operator/OnlineSwitch';
import { MOCK_RESPONSE } from 'pages/Operator/mocks';

function OperatorViewContent() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900]),
        flexGrow: 1,
        minHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 2 }} display="flex" justifyContent="space-between">
          <Stack direction="column" spacing={2}>
            <Typography component="h1" variant="h4">Stephen&apos;s Operator View</Typography>
            <OnlineSwitch />
          </Stack>
          <Hotkeys />
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Typography component="h1" variant="h5" color="primary">Ticket #19238</Typography>
        <Grid container spacing={3}>
          {Object.keys(MOCK_RESPONSE).map((key) => (
            <Grid item xs={12} md={4} lg={3} key={key}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Title>{key}</Title>
                <List dense>
                  {Object.keys(MOCK_RESPONSE[key]).map(
                    (dkey) => (
                      <ListItemText
                        primary={dkey}
                        secondary={MOCK_RESPONSE[key][dkey]}
                        key={dkey}
                      />
                    ),
                  )}

                </List>
                <Typography sx={{ flex: 1 }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default function OperatorPage() {
  return <OperatorViewContent />;
}