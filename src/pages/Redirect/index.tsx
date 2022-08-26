import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// src
import { AuthContext } from 'Routes';
import paths from 'constants/nav';
import { User, UserRole } from 'generated/graphql';

// Redirect to appropriate pages.
export default function Redirect() {
  const location = useLocation();
  const currentUser = location.state as User;
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
