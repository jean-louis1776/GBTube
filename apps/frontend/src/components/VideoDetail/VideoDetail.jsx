import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack, Button, Avatar, Tooltip } from '@mui/material';
import {
  AnnouncementOutlined,
  CheckCircle,
  PlaylistAdd,
  ReplyAllOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from '@mui/icons-material';
import Loader from '../Loader/Loader';
import VideoCard from '../VideoCard/VideoCard';
// import { fetchFromAPI } from '../utils/fetchFromAPI';
import ShowMoreText from 'react-show-more-text';

import styles from './VideoDetail.module.scss';
import { useTheme } from '@mui/material/styles';
import VideoCommentary from '../VideoCommentary/VideoCommentary';

const VideoDetail = () => {
  const theme = useTheme();

  // const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  // const { id } = useParams();

  //   useEffect(() => {
  //     fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
  //       setVideoDetail(data.items[0])
  //     );

  //     fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
  //       (data) => setVideos(data.items)
  //     );
  //   }, [id]);

  // if (!videoDetail?.snippet) return <Loader />;
  //
  // const {
  //   snippet: { title, channelId, channelTitle, publishedAt },
  //   statistics: { viewCount, likeCount },
  // } = videoDetail;
  const [likesCount, setLikesCount] = useState(1337);
  const [dislikesCount, setDislikesCount] = useState(42);

  const [like, setLike] = useState(['Nothing']);
  const likeOrDislikeHandler = (like) =>
    like.reduce((prev, cont) => (cont === prev ? 'Nothing' : cont), 'Nothing');

  const pushReactionBtn = (reaction) => {
    setLike(...like, reaction);
    likeOrDislikeHandler(like);
    console.log('LIKES STATE', like);
  };

  return (
    <Box className={styles.wrapper}>
      <Header />
      <Stack direction={{ xs: 'column', md: 'row' }} className={styles.stack}>
        <Box>
          <Box>
            {
              <div className={styles.playerWrapper}>
                <ReactPlayer
                  // url={`https://www.youtube.com/watch?v=${id}`}
                  url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                  pip
                  className={styles.reactPlayer}
                  controls={true}
                />
              </div>
            }
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              py={3}
              px={2}
            >
              <Typography color="#fff" variant="h5" fontWeight="bold">
                {/*{title}*/}
                Нева гона гив ю ап
              </Typography>
              <Typography variant={'body1'} sx={{ opacity: 0.85 }}>
                {parseInt(
                  '740'
                  // viewCount
                ).toLocaleString()}{' '}
                просмотров
              </Typography>
            </Stack>
            <Stack
              direction={{
                xs: 'column',
                md: 'row',
              }}
              justifyContent="space-between"
            >
              <Stack direction="row" className={styles.channel_info}>
                <Link to="/channel">
                  <Box className={styles.channel_sub}>
                    <Avatar sx={{ mr: '10px' }} />
                    <Typography
                      variant={{ sm: 'subtitle1', md: 'h6' }}
                      fontWeight="500"
                    >
                      {/*{channelTitle}*/}
                      Channel Name
                    </Typography>
                    <CheckCircle
                      sx={{ fontSize: '15px', color: 'gray', ml: '5px' }}
                    />
                  </Box>
                </Link>
                <Button>Подписаться</Button>
              </Stack>
              <Stack direction="row" gap="20px" className={styles.reactions}>
                <Stack
                  direction="row"
                  gap="10px"
                  className={styles.reactionsBtn}
                >
                  <Tooltip title="Нравится">
                    <Button>
                      <ThumbUpOutlined
                        onClick={() => pushReactionBtn('Like')}
                      />
                      <Typography
                        variant={'body1'}
                        sx={{ opacity: 0.7 }}
                        marginLeft={2}
                      >
                        {parseInt(
                          likesCount
                          // likeCount
                        ).toLocaleString()}{' '}
                      </Typography>
                    </Button>
                  </Tooltip>
                  <Tooltip title="Не нравится">
                    <Button>
                      <ThumbDownOutlined
                        onClick={() => pushReactionBtn('Dislike')}
                      />
                      <Typography
                        variant="body1"
                        sx={{ opacity: 0.7 }}
                        marginLeft={2}
                      >
                        {parseInt(
                          dislikesCount
                          // dislikeCount
                        ).toLocaleString()}{' '}
                      </Typography>
                    </Button>
                  </Tooltip>
                </Stack>
                <Tooltip title="Поделиться">
                  <Button>
                    <ReplyAllOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="Добавить в плейлист">
                  <Button>
                    <PlaylistAdd />
                  </Button>
                </Tooltip>
                <Tooltip title="Поддержка">
                  <Button>
                    <AnnouncementOutlined />
                  </Button>
                </Tooltip>
              </Stack>
            </Stack>

            <Box
              padding=".7rem"
              marginTop="2rem"
              width="100%"
              backgroundColor={theme.palette.shadows.main}
            >
              <Box variant="body1" sx={{ opacity: 0.85 }}>
                <Typography variant={'body1'} sx={{ opacity: 0.7 }}>
                  Дата публикации:
                  {/*{publishedAt.substring(0, 10)}*/}
                </Typography>
              </Box>
              <ShowMoreText
                className={styles.truncateText}
                lines={1}
                more="Читать далее"
                less="Свернуть"
                // anchorClass="show-more-less-clickable"
                expanded={false}
                keepNewLines={false}
                // width={800}
                truncatedEndingComponent={'... '}
              >
                <h4>Video Description</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab
                  aspernatur atque autem cum deleniti dolorem et facere impedit
                  in laboriosam maiores mollitia nobis nostrum obcaecati odit
                  officia omnis pariatur quam quia reiciendis sapiente similique
                  tempore totam unde velit, voluptas.
                </p>
                <p>
                  Деньги денежки монетки бабосики копейки кэш лавешечку капусту
                  лавандосик золотишко слать мне на пальтишко:
                </p>
                <p>1234 1234 1234 123</p>
              </ShowMoreText>
            </Box>

            <Typography paddingLeft="1rem" marginTop="2rem">
              CommentSection
            </Typography>

            <Box
              className={styles.commentSection}
              backgroundColor={theme.palette.shadows.main}
            >
              <VideoCommentary />
              <VideoCommentary />
              <VideoCommentary />
              <VideoCommentary />
              <VideoCommentary />
            </Box>
          </Box>
        </Box>
        <Box
          // py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <VideoCard videos={videos} direction="column" />
          <VideoCard videos={videos} direction="column" />
          <VideoCard videos={videos} direction="column" />
          <VideoCard videos={videos} direction="column" />
          <VideoCard videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
