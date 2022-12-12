import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Loader from '../Loader/Loader';
import VideoController from '../../controllers/VideoController';
import VideoCard from '../VideoCard/VideoCard';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import VideoListItem from '../VideoListItem/VideoListItem';
import { searchErrorLogo } from '@constants/frontend';

import styles from './SearchFeed.module.scss';

const SearchFeed = ({ query }) => {
  const [searchComp, setSearchComp] = useState(<Loader />);
  const refVideos = useRef([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    document.title = `${searchTerm} - результаты поиска | Geektube`;
    const getSearchTermCompilation = async () => {
      return VideoController.getSearchQueryCompilation(searchTerm);
    };
    getSearchTermCompilation()
      .then((videos) => {
        refVideos.current = videos;

        refVideos.current.length === 0
          ? setSearchComp(
              <Box className={styles.resultBox}>
                <Box className={styles.searchError}>
                  <img
                    src={searchErrorLogo}
                    alt="No results"
                    className={styles.searchErrorLogo}
                  />
                  <Typography className={styles.searchErrorText} variant="h5">
                    К сожалению, не найдено ни одного видео
                  </Typography>
                </Box>
              </Box>
            )
          : setSearchComp(
              <Box className={styles.resultBox}>
                {videos.map((idList) => (
                  <VideoListItem idList={idList} key={idList} />
                ))}
              </Box>
            );
      })
      .catch((err) => {
        console.log('Failed get favorite videos list');
        console.log(err);
      });
  }, [searchTerm]);

  return (
    <>
      <Header />

      <Box className={styles.searchWrapper}>
        <Box component="main" className={styles.searchMain}>
          <Typography className={styles.searchTitle} variant="h4">
            Поиск по запросу: <span>{searchTerm}</span>
          </Typography>

          {searchComp}
        </Box>
      </Box>
    </>
  );
};

export default SearchFeed;
