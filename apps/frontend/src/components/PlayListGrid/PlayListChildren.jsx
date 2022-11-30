import styles from './PlayListChildren.module.scss';
import { Button, Tooltip, Typography } from '@mui/material';
import { /*useLocation,*/ useNavigate /*, useParams*/ } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetChildrenController from '../../controllers/GetChildrenController';
import { Loader } from '../index';
import { VIDEO } from '@constants/frontend';
import { useTheme } from '@mui/material/styles';

export const PlayListChildren = ({ childType, itemId }) => {
  const theme = useTheme();
  // const { channel_id } = useParams();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  // const location = useLocation();
  let [idListState, setIdList] = useState([] /*location.state.idList*/);
  // let [currentId, setCurrentId] = useState(props.idList.split(';').at(-1));

  // useEffect(() => {
  //
  // })
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
    navigate(url, { state: [...idListState] });
  };

  return (
    // <Link to={`/${childType}/get_one/:${id}`}></Link>
    <Button
      sx={{ borderTop: 1, borderColor: theme.palette.shadows.main }}
      onClick={handleClick}
      className={styles.child}
    >
      {/*Title: {props.title}*/}
      {content}
    </Button>
  );
};
export default PlayListChildren;
