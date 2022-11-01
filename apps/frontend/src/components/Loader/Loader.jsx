import React from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';

const Loader = () => (
  <Box minHeight="95vh">
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <CircularProgress color="red" />
    </Stack>
  </Box>
);

export default Loader;
