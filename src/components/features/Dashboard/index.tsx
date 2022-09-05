import React, { useState } from 'react';

// MUI
import Box from '@mui/material/Box';
// import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// src
import Hotkeys from 'components/organisms/Hotkeys';
import Chart from 'components/molecules/Chart';
import InfoWidget from 'components/molecules/InfoWidget';
import Orders from 'components/molecules/Orders';

function DashboardContent() {
  return (
    // <Box sx={{ display: 'flex' }}>
    //   <Box
    //     component="main"
    //     sx={{
    //       backgroundColor: (theme) => (theme.palette.mode === 'light'
    //         ? theme.palette.grey[100]
    //         : theme.palette.grey[900]),
    //       flexGrow: 1,
    //       height: '100vh',
    //       overflow: 'auto',
    //     }}
    //   >
    <Box>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent InfoWidget */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <InfoWidget title="Hello" description="world" />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
      <Hotkeys />
    </Box>
  //   </Box>
  // </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
