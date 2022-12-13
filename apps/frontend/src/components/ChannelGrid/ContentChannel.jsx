import React from 'react';
import { Box, Stack } from '@mui/material';
import { CHANNEL } from '@constants/frontend';
import ChannelChildren from './ChannelChildren';

export const ContentChannel = ({ children }) => {
  return (
    <Stack
      sx={{
        display: 'grid',
        justifyItems: 'center',
        gridTemplateColumns: 'repeat(5,1fr)',
        columnGap: '1rem',
        rowGap: '1rem',
        pt: 5,
        margin: '0 auto',
        width: '75vw',
      }}
    >
      {children.map((item, idx) => (
        <Box key={idx}>
          <ChannelChildren
            itemId={item.idList.split('_').at(-1)}
            childType={CHANNEL}
          />
        </Box>
      ))}
    </Stack>
  );
};
