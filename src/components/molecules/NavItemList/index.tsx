import * as React from 'react';

// src
import { UserRole } from 'generated/graphql';
import { useAppSelector } from 'app/store';
import AdminNavItemList from 'components/molecules/NavItemList/AdminNavItemList';
import OperatorNavItemList from 'components/molecules/NavItemList/OperatorNavItemList';
// import AssignmentIcon from '@mui/icons-material/Assignment';

export default function NavItemList() {
  const currentUser = useAppSelector((state) => state.auth.user);
  if (currentUser === null) return null;
  const { role } = currentUser;
  const isAdmin = role !== UserRole.Operator;
  return (
    isAdmin ? <AdminNavItemList /> : <OperatorNavItemList />
  );
}
