import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Loader from '../Loader/Loader';
import VideoController from '../../controllers/VideoController';
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
        setVideoComp(
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
        videoComp
      ) : (
        <Typography sx={{ color: 'white' }}>
          На сервере нет ни одного видео
        </Typography>
      )}
    </Box>
  );
};

export default VideoFeed;
