import { Box, Stack } from '@mui/material';
import { PLAYLIST } from '@constants/frontend';
import React from 'react';
import PlayListChildren from './PlayListChildren';

export const ContentPlayList = ({ children }) => {
  return (
    <Stack
      direction={/*direction ||*/ 'column'}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      {children.map((item, idx) => (
        <Box key={idx}>
          {/*<p style={{color: 'white'}}>Плейлист: {idx}</p>*/}
          <PlayListChildren
            itemId={item.idList.split(';').at(-1)}
            childType={PLAYLIST}
          />
        </Box>
      ))}
    </Stack>
  );
};
