import { Box, Stack } from '@mui/material';
import { PLAYLIST } from '@constants/frontend';
import React from 'react';
import PlayListChildren from './PlayListChildren';

export const ContentPlayList = ({ children }) => {
  return (
    <Stack
      sx={{
        display: 'grid',
        justifyItems: 'center',
        gridTemplateColumns: 'repeat(5,1fr)',
        columnGap: '1rem',
        rowGap: '1rem',
        pt: 5,
      }}
    >
      {children.map((item, idx) => (
        <Box key={idx}>
          <PlayListChildren
            itemId={item.idList.split(';').at(-1)}
            childType={PLAYLIST}
          />
        </Box>
      ))}
    </Stack>
  );
};
