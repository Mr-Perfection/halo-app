import * as React from 'react';
import { Navigate } from 'react-router-dom';

// src
import { UserRole } from 'generated/graphql';
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
