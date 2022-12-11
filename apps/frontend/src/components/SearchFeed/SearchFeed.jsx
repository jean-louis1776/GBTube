import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Loader from '../Loader/Loader';
import VideoController from '../../controllers/VideoController';
import VideoCard from '../VideoCard/VideoCard';

import styles from './SearchFeed.module.scss';
import { useParams } from 'react-router-dom';

const SearchFeed = ({ query }) => {
  const [searchComp, setSearchComp] = useState(<Loader />);
  const refVideos = useRef([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    document.title = `Результаты поиска ${searchTerm} | Geektube`;
    const getSearchTermCompilation = async () => {
      return VideoController.getSearchQueryCompilation(searchTerm);
    };
    getSearchTermCompilation()
      .then((videos) => {
        refVideos.current = videos;
        setSearchComp(
          <Box
            sx={{
              marginTop: 10,
              display: 'grid',
              columnGap: 4,
              rowGap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)',
              },
            }}
          >
            {videos.map((idList) => (
              <VideoCard idList={idList} key={idList} />
            ))}
          </Box>
        );
      })
      .catch((err) => {
        console.log('Failed get favorite videos list');
        console.log(err);
      });
  }, []);

  return (
    <Box>
      {refVideos.current.length > 0 ? (
        searchComp
      ) : (
        <Typography>
          Не найдено ни одного видео по запросу: {searchTerm}
        </Typography>
      )}
    </Box>
  );
};

export default SearchFeed;
