import { Box, Stack } from '@mui/material';
// import ChildItem from '../child-item/child-item';
import { CHANNEL } from '@constants/frontend';
import React from 'react';
import ChannelChildren from './ChannelChildren';

export const ContentChannel = ({ children }) => {
  return (
    <Stack
      direction={/*direction ||*/ 'row'}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
    >
      {children.map((item, idx) => (
        <Box key={idx}>
          <ChannelChildren itemId={item.idList.split(';').at(-1)} childType={CHANNEL} />
        </Box>
      ))}
    </Stack>
  );
}
