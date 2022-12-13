import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Header } from '../';
import SearchHistoryForm from './SearchHistoryForm';
import VideoListItem from '../VideoListItem/VideoListItem';
import VideoController from '../../controllers/VideoController';
import { store } from '../../store';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { historyListSelector } from '../../store/selectors';
import { setHistoryList } from '../../store/slice';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './History.module.scss';

const History = () => {
  const selectedCategory = 'История';

  const { profileReducer } = store.getState();
  const currentUserId = Number(profileReducer.id);

  const dispatch = useDispatch();
  const historyList = useSelector(historyListSelector);

  useEffect(() => {
    document.title = 'История | GeekTube';
    const videoHistory = async (userId) => {
      return VideoController.getVideoHistory(userId);
    };
    videoHistory(currentUserId).then((videos) =>
      dispatch(setHistoryList(videos))
    );
    return () => {
      setHistoryList([]);
    };
  }, []);

  if (!historyList.length)
    return (
      <Typography variant="h5" sx={{ userSelect: 'none' }}>
        Похоже вы не еще не посмотрели свое первое видео
      </Typography>
    );

  return (
    <>
      <Header selectedCategory={selectedCategory} />

      <Box className={styles.historyWrapper}>
        <Box component="main" className={styles.historyMain}>
          <Typography className={styles.historyTitle} variant="h4">
            История просмотров
          </Typography>

          <SearchHistoryForm />

          <Button variant="outlined" color="whiteButton" sx={{ mb: 4 }}>
            <DeleteIcon sx={{ mr: 1 }} />
            Очистить историю
          </Button>

          <Box>
            {historyList
              .slice()
              .reverse()
              .map((idList) => (
                <VideoListItem idList={idList} key={idList} deleteFromHistory />
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default History;
