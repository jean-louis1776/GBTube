import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

import { Loader } from '../';

import styles from './VideoGrid.module.scss';
import GetChildrenController from '../../controllers/GetChildrenController';
import ChildItem from '../child-item/child-item';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const VideoGrid = ({childrenType}) => {
  const { parent_id } = useParams();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const children = await GetChildrenController.getAllItemsById(childrenType, parent_id);
      setContent(
        <Stack
          direction={/*direction ||*/ 'row'}
          flexWrap="wrap"
          justifyContent="start"
          alignItems="start"
          gap={2}
        >
          {children.map((item, idx) => (
            <Box key={idx}>
              <ChildItem props={item} childType={childrenType} />
            </Box>
          ))}
        </Stack>
      );
    }
    fetchData().catch(() => {
      setContent('');
      console.log(`Load ${childrenType} fail`);
    });
  },[]);

  const handleCreateChild = () => {
    navigate(`/${childrenType}/create`, { state: { idList: location.state.idList } });
  }

  return (
    <>
      {content}
      <Button onClick={handleCreateChild}>Создать {childrenType}</Button>
      {/*<Link to={`/${childrenType}/create`}>Создать {childrenType}</Link>*/}
    </>
  );
};

export default VideoGrid;
