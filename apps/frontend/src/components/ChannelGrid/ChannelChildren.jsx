import styles from './ChannelChildren.module.scss';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetChildrenController from '../../controllers/GetChildrenController';
import { Loader } from '../index';
import { CHANNEL, PLAYLIST } from '@constants/frontend';
import { useTheme } from '@mui/material/styles';

export const ChannelChildren = ({ childType, itemId }) => {
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
      setContent(<Typography className={styles.title}>{title}</Typography>);
    };
    fetchData().catch(() => {
      setContent(<Typography className={styles.title}>No data</Typography>);
      console.log(`${CHANNEL} ID: ${itemId} not found in ChildItem`);
    });
  }, []);

  const handleClick = () => {
    const url = `/${PLAYLIST}/get_all/${idListState.join('_')}`;
    navigate(url);
  };

  return (
    <Button
      sx={{ borderTop: 1, borderColor: theme.palette.shadows.main }}
      onClick={handleClick}
      className={styles.child}
    >
      {content}
    </Button>
  );
};
export default ChannelChildren;
