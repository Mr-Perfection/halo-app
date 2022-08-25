import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
// src
import { AuthLoginQueryDocument } from 'generated/graphql';
import { passwordRegex } from 'Utils/auth';

export default function Login() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .matches(passwordRegex, 'Min 8 letter password, with at least a symbol, upper and lower case letters and a number.')
      .required('Password is required'),
  });

  // Workaround: since there is no useLazyQuery in urql, we can use setState.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginResult, login] = useQuery({
    query: AuthLoginQueryDocument,
    variables: formData,
    pause: true,
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: () => {
      login();
    },
  });

  useEffect(() => {
    setFormData(formik.values);
  }, [formik.values, setFormData]);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, maxWidth: 400 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid> */}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
