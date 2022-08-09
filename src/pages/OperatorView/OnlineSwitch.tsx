import * as React from 'react';
import { Switch, Stack, Typography } from '@mui/material';

export default function OnlineSwitch() {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Switch checked={checked} onChange={handleChange} />
      <Typography>{checked ? '' : 'Turn on the switch to receive new tickets.'}</Typography>
    </Stack>
  );
}
