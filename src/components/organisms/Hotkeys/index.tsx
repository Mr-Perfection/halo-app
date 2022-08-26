import React, { useState, type ReactElement } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

// MUI
import {
  ListItem, ListItemText, Box, List, Typography,
} from '@mui/material';

// src
import { IHotkey } from 'components/organisms/Hotkeys/types';
import { HOT_KEYS, SHOW_HOT_KEYS } from 'components/organisms/Hotkeys/constants';
import Title from 'components/atoms/Title';

function Hotkey({ value, name }: IHotkey): ReactElement {
  useHotkeys(value, () => { console.log(`You have pressed ${name}`); });
  return (
    <ListItem sx={{ pl: 0 }}>
      <ListItemText primary={`${name} (${value})`} />
    </ListItem>
  );
}

function HotkeysContent(): ReactElement {
  return (
    <List>
      {
        // eslint-disable-next-line max-len
        HOT_KEYS.map((hotkey) => <Hotkey key={hotkey.value} value={hotkey.value} name={hotkey.name} />)
      }
    </List>
  );
}

export default function Hotkeys(): ReactElement {
  // Show/hide hotkeys
  const [showHotkey, setShowHotkey] = useState<boolean>(false);
  useHotkeys(SHOW_HOT_KEYS.value, () => setShowHotkey((hkey) => !hkey));
  return (
    <Box sx={{
      width: '100%', maxWidth: 360, pl: 2, pt: 2, bgcolor: 'background.paper',
    }}
    >
      <Title>Hotkeys (ctrl+h)</Title>
      {showHotkey ? (
        <HotkeysContent />
      ) : <Typography>Press ctrl+h to display the hotkeys.</Typography>}
    </Box>
  );
}
