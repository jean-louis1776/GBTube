import styles from './PlayListChildren.module.scss';
import { Button, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetChildrenController from '../../controllers/GetChildrenController';
import { Loader } from '../index';
import { VIDEO } from '@constants/frontend';
import { useTheme } from '@mui/material/styles';

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
        title.length > 220 ? (
          <Tooltip title={title}>
            <Typography className={styles.title}>
              {title.slice(0, 280) + '...'}
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
    console.log(url);
    console.log(idListState, 'idListState');
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
export default PlayListChildren;
