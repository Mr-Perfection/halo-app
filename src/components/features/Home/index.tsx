import React from 'react';
import { Navigate } from 'react-router-dom';

// src
import paths from 'constants/nav';
import { UserRole } from 'generated/graphql';
import { useAppSelector } from 'app/store';

// Redirect to the appropriate page based on the user role.
export default function Home() {
  const currentUser = useAppSelector((state) => state.auth.user);
  if (currentUser === null) {
    return (<Navigate to={paths.LOGIN} replace />);
  }
  const redirectPath = () => {
    switch (currentUser.role) {
      case UserRole.Root:
        return paths.DASHBOARD;
      case UserRole.Admin:
        return paths.DASHBOARD;
      case UserRole.Operator:
        return paths.OPERATOR;
      default:
        return paths.OPERATOR;
    }
  };

  return (<Navigate to={redirectPath()} state={currentUser} />);
}
