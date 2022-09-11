import React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Link } from 'react-router-dom';

export interface INavItem { icon: JSX.Element, to: string, text: string }

export default function NavItem({ to, icon, text }: INavItem) {
  return (
    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={to}>
      <ListItemButton>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </Link>
  );
}
