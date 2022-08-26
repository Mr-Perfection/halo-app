import * as React from 'react';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from 'components/atoms/Title';

// function preventDefault(event: React.MouseEvent) {
//   event.preventDefault();
// }

type InfoWidgetType = {
  title: string,
  description: any,
};

export default function InfoWidget({ title, description }: InfoWidgetType) {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography sx={{ flex: 1 }}>
        {description}
      </Typography>
    </React.Fragment>
  );
}
