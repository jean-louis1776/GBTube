import styles from './child-item.module.scss';
import { Button, Typography } from '@mui/material';
import { /*useLocation,*/ useNavigate/*, useParams*/ } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetChildrenController from '../../controllers/GetChildrenController';
import { Loader } from '../index';
import { CHANNEL, PLAYLIST } from '@constants/frontend';

export const ChildItem = ({ childType, itemId }) => {
  // const { channel_id } = useParams();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  // const location = useLocation();
  let [idListState, setIdList] = useState([]/*location.state.idList*/);
  // let [currentId, setCurrentId] = useState(props.idList.split(';').at(-1));

  // useEffect(() => {
  //
  // })
  useEffect(() => {
    const fetchData = async () => {
      const {title, idList} = await GetChildrenController.getItemById(childType, itemId.split('_').at(-1));
      setIdList([...idList.split('_')]);
      setContent(<Typography className={styles.title}>{ title }</Typography>);
    }
    fetchData().catch(() => {
      setContent(<Typography className={styles.title}>No data</Typography>);
      console.log(`${childType} ID: ${itemId} not found in ChildItem`);
    });
  },[]);

  const handleClick = () => {
    const type = childType === CHANNEL ? PLAYLIST : CHANNEL;
    const url = `/${type}/get_all/${idListState.join('_')}`
    console.log(url);
    console.log(idListState, 'idListState');
    navigate(url, { state:  [...idListState]  });
  }

  return (
    // <Link to={`/${childType}/get_one/:${id}`}></Link>
      <Button onClick={handleClick} className={styles.child}>
        {/*Title: {props.title}*/}
        {content}
      </Button>
  );
}
export default ChildItem;
