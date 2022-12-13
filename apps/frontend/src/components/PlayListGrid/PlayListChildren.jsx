import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetChildrenController from '../../controllers/GetChildrenController';
import { Loader } from '../index';
import { VIDEO } from '@constants/frontend';
import { useTheme } from '@mui/material/styles';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

import styles from './PlayListChildren.module.scss';

export const PlayListChildren = ({ childType, itemId }) => {
  const theme = useTheme();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();

  let [idListState, setIdList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { title, idList } = await GetChildrenController.getItemById(
        childType,
        itemId.split('_').at(-1)
      );
      setIdList([...idList.split('_')]);
      setContent(
        title.length > 30 ? (
          <Tooltip title={title}>
            <Typography className={styles.title}>
              {title.slice(0, 30) + '...'}
            </Typography>
          </Tooltip>
        ) : (
          <Typography className={styles.title}>{title}</Typography>
        )
      );
    };
    fetchData().catch(() => {
      setContent(<Typography className={styles.title}>No data</Typography>);
      console.log(`${childType} ID: ${itemId} not found in ChildItem`);
    });
  }, []);

  const handleClick = () => {
    const url = `/${VIDEO}/get_all/${idListState.join('_')}`;
    console.log(idListState, 'idListState');
    navigate(url);
  };

  return (
    <Box className={styles.PlaylistWrapper} onClick={handleClick}>
      <PlaylistPlayIcon color="baseBlue" sx={{ fontSize: '3rem' }} />

      {content}
    </Box>
  );
};
export default PlayListChildren;
