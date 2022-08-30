import * as React from 'react';
import { Link } from 'react-router-dom';

// src
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMutation } from 'urql';
import { AuthLogoutDocument } from 'generated/graphql';
import { redirectToLogin } from 'utils/auth';
import paths from 'constants/nav';
// import AssignmentIcon from '@mui/icons-material/Assignment';

export default function AdminNavItemList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logoutResult, authLogout] = useMutation(AuthLogoutDocument);
  const handleLogout = async () => {
    await authLogout({});
    redirectToLogin();
  };
  return (
    <React.Fragment>
      <Link style={{ textDecoration: 'none', color: 'inherit' }} to={paths.DASHBOARD}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link style={{ textDecoration: 'none', color: 'inherit' }} to={paths.USERS}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
}

// export const SecondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
