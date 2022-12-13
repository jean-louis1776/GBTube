import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Loader from '../Loader/Loader';
import VideoController from '../../controllers/VideoController';
import { searchErrorLogo } from '@constants/frontend';
import VideoCard from '../VideoCard/VideoCard';

const VideoFeed = () => {
  const [videoComp, setVideoComp] = useState(<Loader />);
  const refVideos = useRef([]);

  useEffect(() => {
    document.title = 'GeekTube';
    const getRandomVideoCompilation = async () => {
      return VideoController.getVideoCompilation();
    };
    getRandomVideoCompilation()
      .then((videos) => {
        refVideos.current = videos;

        refVideos.current.length === 0
          ? setVideoComp(
              <Box
                sx={{
                  width: '100%',
                  mt: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    mt: '5rem',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={searchErrorLogo}
                    alt="No results"
                    style={{ width: '500px' }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, fontSize: '1.7rem' }}
                  >
                    К сожалению, на сервере нет ни одного видео
                  </Typography>
                </Box>
              </Box>
            )
          : setVideoComp(
              <Box
                sx={{
                  marginTop: 4,
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
                  justifyItems: 'center',
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

  return <Box sx={{ width: '100%' }}>{videoComp}</Box>;
};

export default VideoFeed;
