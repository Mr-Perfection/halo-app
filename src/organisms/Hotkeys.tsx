import React, { type ReactElement } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
// MUI
import {
  ListItem, ListItemText, Box, List,
} from '@mui/material';

export interface IHotkey {
  value: string
  name: string
}

function Hotkey({ value, name }: IHotkey): ReactElement {
  useHotkeys(value, () => { console.log(`You have pressed ${name}`); });
  return (
    <ListItem>
      <ListItemText primary={`${name} (${value})`} />
    </ListItem>
  );
}

export default function Hotkeys(): ReactElement {
  const hotkeys: IHotkey[] = [{
    value: 'ctrl+b',
    name: 'Ban Account',
  },
  {
    value: 'ctrl+e',
    name: 'Escalate',
  }];

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {
          // eslint-disable-next-line max-len
          hotkeys.map((hotkey) => <Hotkey key={hotkey.value} value={hotkey.value} name={hotkey.name} />)
        }
      </List>
    </Box>
  );
}
