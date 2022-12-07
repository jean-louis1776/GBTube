import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Loader from '../Loader/Loader';
import VideoController from '../../controllers/VideoController';
import GetChildrenController from '../../controllers/GetChildrenController';
import { VIDEO } from '@constants/frontend';
import { Link } from 'react-router-dom';
import VideoCard from '../VideoCard/VideoCard';

const VideoFeed = () => {
  const [videoComp, setVideoComp] = useState(null);

  const getRandomVideoCompilation = async () => {
    try {
      const data = await VideoController.getVideoCompilation();
      const promises = data.map((id) =>
        GetChildrenController.getItemById(VIDEO, id)
      );
      const videos = await Promise.all(promises);

      setVideoComp(
        <Box
          sx={{
            // display: 'flex',
            // flexFlow: 'row wrap',
            // gap: 1,
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
          {videos.map((item) => (
            <Link
              key={item.idList.split('_').at(-1)}
              to={`/${VIDEO}/get_one/${item.idList}`}
            >
              <VideoCard video={item} />
            </Link>
          ))}
        </Box>
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = 'GeekTube';
    getRandomVideoCompilation();
  }, []);

  return <Box>{videoComp ?? <Loader />}</Box>;
};

export default VideoFeed;
