import React from 'react';
import { Navigate } from 'react-router-dom';

// src
import paths from 'constants/nav';
import { UserRole } from 'generated/graphql';
import { useAppSelector } from 'app/store';

// Redirect to the appropriate page based on the user role.
export default function Redirect() {
  const currentUser = useAppSelector((state) => state.auth.user);
  if (currentUser === null) {
    return (<Navigate to={paths.LOGIN} replace />);
  }
  const redirectPath = () => {
    switch (currentUser.role) {
      case UserRole.Admin:
        return paths.ADMIN;
      default:
        return paths.OPERATOR;
    }
  };

  return (<Navigate to={redirectPath()} state={currentUser} />);
}
