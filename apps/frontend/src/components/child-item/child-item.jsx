import styles from './child-item.module.scss';
import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetChildrenController from '../../controllers/GetChildrenController';
import { Loader } from '../index';

export const ChildItem = ({ childType }) => {
  const { id } = useParams();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  const location = useLocation();
  let [idList, setIdList] = useState(location.state.idList);

  useEffect(() => {
    const fetchData = async () => {
      const { id, title } = await GetChildrenController.getItemById(childType, id);
      setContent(
        <Typography className={styles.title}>
          { title }
        </Typography>
      );
      setIdList([...idList, id]);
    }
    fetchData().catch(() => {
      setContent(
        <Typography className={styles.title}>
          No data
        </Typography>
      );
      console.log(`${childType} ID: ${id} not found`);
    });
  },[]);

  const handleClick = () => {
    navigate(`/${childType}/get_one/:${id}`, { state: { idList } });
  }

  return (
    // <Link to={`/${childType}/get_one/:${id}`}></Link>
      <Box onClick={handleClick} className={styles.child}>
        {content}
      </Box>
  );
}
export default ChildItem;
