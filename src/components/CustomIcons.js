import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export function allDJsIcon(props) {
  return (
    <Stack direction="row" spacing={0}>
      <Avatar
        alt="allDJs"
        src="/icons/alldjs.png"
        sx={{ width: 'calc(15px + 5vmin)', height: 'calc(15px + 10vmin)' }}
      />
    </Stack>
  );
}

export function HomePageIcon(props) {
  return (
    <Stack direction="row" spacing={0}>
      <Avatar
        alt="Home Page"
        src="/icons/home-page.png"
        sx={{ width: 'calc(15px + 5vmin)', height: 'calc(15px + 5vmin)' }}
      />
    </Stack>
  );
}

export function GigsPageIcon(props) {
  return (
    <Stack direction="row" spacing={0}>
      <Avatar
        alt="Home Page"
        src="/icons/gigs.png"
        sx={{ width: 'calc(15px + 5vmin)', height: 'calc(15px + 5vmin)' }}
      />
    </Stack>
  );
}
