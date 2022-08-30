import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useMutation } from 'urql';
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
import { AuthSignupDocument } from 'generated/graphql';
import { passwordRegex } from 'utils/auth';
import { useAppDispatch } from 'app/store';
import { setUser } from 'components/features/Auth/userSlice';
import paths from 'constants/nav';

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { customerSlug } = useParams();

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required('First name is required'),
    lastName: yup
      .string()
      .required('Last name is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .matches(passwordRegex, 'Min 8 letter password, with at least a symbol, upper and lower case letters and a number.')
      .required('Password is required'),
  });

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  // Workaround: since there is no useLazyQuery in urql, we can use setState.
  const [formData, setFormData] = useState(initialState);

  const [signupResult, signup] = useMutation(AuthSignupDocument);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit: () => {
      if (customerSlug !== undefined) {
        signup({ ...formData, customerSlug });
      }
    },
  });
  const user = signupResult.data?.signup.user;
  const formikValues = formik.values;
  useEffect(() => {
    if (!isEmpty(formikValues)) {
      setFormData(formikValues);
    }
  }, [formikValues, setFormData]);

  useEffect(() => {
    if (user !== undefined && user !== null) {
      console.log('user', user);
      dispatch(setUser(user));
      navigate(paths.ROOT, { replace: true });
    }
  }, [formik.values, user, setFormData, dispatch, navigate]);

  if (customerSlug === undefined) {
    return <Navigate to={paths.NOT_FOUND} />;
  }

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
        Signup
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, maxWidth: 400 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              onChange={formik.handleChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              onChange={formik.handleChange}
              autoComplete="family-name"
            />
          </Grid>
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
              required
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
          Create account
        </Button>
        {/* <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
}

// export default function Signup() {
//   const [signupResult, signup] = useMutation(AuthSignupDocument);
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     signup({
//       customerSlug: 'ACME',
//       email: data.get('email') as string,
//       password: data.get('password') as string,
//       firstName: data.get('firstName') as string,
//       lastName: data.get('lastName') as string,
//     });
//   };

//   return (
//     <Box
//       sx={{
//         marginTop: 8,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//         <LockOutlinedIcon />
//       </Avatar>
//       <Typography component="h1" variant="h5">
//         Sign up
//       </Typography>
//       <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               autoComplete="given-name"
//               name="firstName"
//               required
//               fullWidth
//               id="firstName"
//               label="First Name"
//               autoFocus
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               fullWidth
//               id="lastName"
//               label="Last Name"
//               name="lastName"
//               autoComplete="family-name"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="new-password"
//             />
//           </Grid>
//           {/* <Grid item xs={12}>
//             <FormControlLabel
//               control={<Checkbox value="allowExtraEmails" color="primary" />}
//               label="I want to receive inspiration, marketing promotions and updates via email."
//             />
//           </Grid> */}
//         </Grid>
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3, mb: 2 }}
//         >
//           Sign Up
//         </Button>
//         <Grid container justifyContent="flex-end">
//           <Grid item>
//             <Link href="#" variant="body2">
//               Already have an account? Sign in
//             </Link>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }
