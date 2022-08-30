import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';

// src
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMutation } from 'urql';
import { AuthLogoutDocument, UserRole } from 'generated/graphql';
import { redirectToLogin } from 'utils/auth';
import { useAppSelector } from 'app/store';
import paths from 'constants/nav';
import AdminNavItemList from 'components/molecules/NavItemList/AdminNavItemList';
import OperatorNavItemList from 'components/molecules/NavItemList/OperatorNavItemList';
// import AssignmentIcon from '@mui/icons-material/Assignment';

export default function NavItemList() {
  const currentUser = useAppSelector((state) => state.auth.user);
  if (currentUser === null) return (<Navigate to={paths.LOGIN} replace />);
  const { role } = currentUser;
  const isAdmin = role !== UserRole.Operator;
  return (
    isAdmin ? <AdminNavItemList /> : <OperatorNavItemList />
  );
}
