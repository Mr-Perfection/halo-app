import React from 'react';

// MUI
import { Typography, Link } from '@mui/material';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Social Karma Inc.
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}
