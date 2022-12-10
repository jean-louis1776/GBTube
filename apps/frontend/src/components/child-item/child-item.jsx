import styles from './child-item.module.scss';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetChildrenController from '../../controllers/GetChildrenController';
import { Loader } from '../index';
import { CHANNEL, PLAYLIST } from '@constants/frontend';

export const ChildItem = ({ childType, itemId }) => {
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
      console.log(`${childType} ID: ${itemId} not found in ChildItem`);
    });
  }, []);

  const handleClick = () => {
    const type = childType === CHANNEL ? PLAYLIST : CHANNEL;
    const url = `/${type}/get_all/${idListState.join('_')}`;
    navigate(url, { state: [...idListState] });
  };

  return (
    // <Link to={`/${childType}/get_one/:${id}`}></Link>
    <Button onClick={handleClick} className={styles.child}>
      {/*Title: {props.title}*/}
      {content}
    </Button>
  );
};
export default ChildItem;
