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
import { AuthLoginDocument } from 'generated/graphql';
import { passwordRegex } from 'utils/auth';
import { useAppDispatch } from 'app/store';
import { setUser } from 'components/features/Auth/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import paths from 'constants/nav';

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { companyId } = useParams();
  console.log('companyId i', companyId);
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
    query: AuthLoginDocument,
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
  const user = loginResult.data?.login?.user;
  useEffect(() => {
    setFormData(formik.values);
    if (user !== undefined && user !== null) {
      dispatch(setUser(user));
      navigate(paths.ROOT, { replace: true });
    }
  }, [formik.values, user, setFormData, dispatch, navigate]);

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
