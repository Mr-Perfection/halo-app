import * as React from 'react';
import { useMutation } from 'urql';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import StorageIcon from '@mui/icons-material/Storage';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';

// src
import { AuthLogoutDocument } from 'generated/graphql';
import { redirectToLogin } from 'utils/auth';
import paths from 'constants/nav';
import NavItem from 'components/molecules/NavItemList/NavItem';

export default function AdminNavItemList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logoutResult, authLogout] = useMutation(AuthLogoutDocument);
  const handleLogout = async () => {
    await authLogout({});
    redirectToLogin();
  };
  return (
    <React.Fragment>
      <NavItem to={paths.DASHBOARD} icon={<DashboardIcon />} text="Dashboard" />
      <NavItem to={paths.USERS} icon={<PeopleIcon />} text="Users" />
      <NavItem to={paths.INTEGRATION} icon={<StorageIcon />} text="Integrations" />
      <NavItem to={paths.QUEUE} icon={<TaskIcon />} text="Queues" />
      <ListItemButton style={{ color: 'red' }} onClick={handleLogout}>
        <ListItemIcon style={{ color: 'red' }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
}
