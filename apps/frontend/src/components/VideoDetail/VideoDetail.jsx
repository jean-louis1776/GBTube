import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AnnouncementOutlined,
  CheckCircle,
  PlaylistAdd,
  ReplyAllOutlined,
} from '@mui/icons-material';
import Loader from '../Loader/Loader';
import ShowMoreText from 'react-show-more-text';
import styles from './VideoDetail.module.scss';
import { styled, useTheme } from '@mui/material/styles';
import VideoCommentary from '../VideoCommentary/VideoCommentary';
import VideoController from '../../controllers/VideoController';
import {API_URL, CHANNEL, VIDEO} from '@constants/frontend';
import { Player } from 'react-tuby';
import 'react-tuby/css/main.css';
import { shallowEqual, useSelector } from 'react-redux';
import { getRole, getUserId } from '../../store/selectors';
import CommentController from '../../controllers/CommentController';
import SendIcon from '@mui/icons-material/Send';

const VideoDetail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { idList } = useParams();
  const videoId = idList.split('_').at(-1);
  const authorId = idList.split('_')[0];
  const userId = useSelector(getUserId, shallowEqual);
  const userRole = useSelector(getRole, shallowEqual);
  const [videoContent, setVideoContent] = useState(<Loader />);
  const [subscribe, setSubscribe] = useState(true);
  const [category, setCategory] = useState('');
  const [channelName, setChannelName] = useState('');
  const [createTimestamp, setCreateTimestamp] = useState('');
  const [description, setDescription] = useState('');
  const [dislikesCount, setDislikesCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [authorNickName, setAuthorNickName] = useState('');
  const [title, setTitle] = useState('');
  const [viewsCount, setViewsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const channelNameLink = idList.split('_').slice(0, 2).join('_');

  const ReactionButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
    transition: '.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.shadows.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  const SubscribeButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
    padding: '7px 15px',
    transition: '.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.shadows.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  // const likeOrDislikeHandler = (likes) =>
  //   likes.reduce((prev, cont) => (cont === prev ? null : cont), likes);

  // const currentReaction = likeOrDislikeHandler(reaction);

  useEffect(() => {
    setVideoContent(<Loader />);
    const fetchVideoData = async () => {
      const videoInfo = await VideoController.getVideoInfo(videoId);
      document.title = videoInfo.title;
      setCategory(videoInfo.category);
      setChannelName(videoInfo.channelName);
      setCreateTimestamp(
        new Date(videoInfo.createTimestamp).toLocaleDateString()
      );
      setDescription(videoInfo.description);
      setDislikesCount(videoInfo.dislikesCount);
      setLikesCount(videoInfo.likesCount);
      setAuthorNickName(videoInfo.nickName);
      setTitle(videoInfo.title);
      setViewsCount(videoInfo.viewsCount);
      const { hashName } = await VideoController.getVideoName(videoId);
      const url = `${API_URL}/video/download?hash_name=${hashName}&user_id=${userId}&video_id=${videoId}`;
      setVideoContent(
        <div className={styles.outerPlayerContainer}>
          <Player
            src={url}
            poster={videoInfo.thumbnail}
            seekDuration={5}
            primaryColor={theme.palette.baseBlue.main}
            keyboardShortcut={false}
          />
        </div>
      );
    };

    fetchVideoData().then().catch((err) => {
      setVideoContent(<p style={{ color: 'white' }}>Видео не найдено</p>);
      console.log(err);
      console.log('Fail get info about video');
    });
    const fetchCommentData = async () => {
      setComments(await CommentController.getAllItemsByVideo(videoId, userId));
    }

    fetchCommentData().then().catch((err) => {
      setComments([]);
      console.log(err);
      console.log('Fail get info about comments');
    })
  }, []);

  const handleDeleteVideo = async () => {
    try {
      await VideoController.deleteVideo(idList.split('_').at(-1));
      const idListToPlayList = idList.split('_').slice(0, -1).join('_');
      navigate(`/${VIDEO}/get_all/${idListToPlayList}`, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeCommentText = (evt) => {
    setCommentText(evt.target.value);
  };

  const handleSendComment = async () => {
    console.log('Send comment');
    try {
      await CommentController.send(idList, userId, commentText.trim());
      setCommentText('');
      setComments(await CommentController.getAllItemsByVideo(videoId));
    } catch (err) {
      console.log('Send comment error');
      console.log(err);
    }
  };

  const isCommentEmpty = () => commentText.length === 0;

  const isMayModerate = () => {
    return (
      authorId === userId || userRole === 'admin' || userRole === 'moderator'
    );
  };

  const handleDeleteComment = (id) => async () => {
    try {
      await CommentController.delete(id);
      setComments(await CommentController.getAllItemsByVideo(videoId));
    } catch (err) {
      console.log(`Failed delete comment ${id}`);
      console.log(err);
    }
  };

  return (
    <Box className={styles.wrapper}>
      <Header />
      <Stack direction={{ xs: 'column', md: 'row' }} className={styles.stack}>
        <Box>
          <Box>
            {<div className={styles.playerWrapper}>{videoContent}</div>}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              py={3}
              px={2}
            >
              <Typography color="#fff" variant="h5" fontWeight="bold">
                {title}
              </Typography>
              <Typography variant={'body1'} sx={{ opacity: 0.85 }}>
                {viewsCount} просмотров
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
                <Link to={`/${CHANNEL}/${channelNameLink}`}>
                  <Box className={styles.channel_sub}>
                    <Avatar sx={{ mr: '10px' }} />
                    <Typography variant="subtitle1" fontWeight="500">
                      {channelName}
                    </Typography>
                    <CheckCircle
                      sx={{ fontSize: '15px', color: 'gray', ml: '5px' }}
                    />
                  </Box>
                </Link>
                {isMayModerate() ? (
                  <Button onClick={handleDeleteVideo}>Удалить видео</Button>
                ) : subscribe ? (
                  <SubscribeButton
                    onClick={() => setSubscribe((prevState) => !prevState)}
                    sx={{
                      marginLeft: '1rem',
                      backgroundColor: theme.palette.coplimentPink.main,
                      color: theme.palette.coplimentPink.contrastText,
                    }}
                  >
                    Подписаться
                  </SubscribeButton>
                ) : (
                  <SubscribeButton
                    onClick={() => setSubscribe((prevState) => !prevState)}
                    sx={{
                      marginLeft: '1rem',
                    }}
                  >
                    Отписаться
                  </SubscribeButton>
                )}
              </Stack>
              <Stack direction="row" gap="10px">
                <Stack
                  direction="row"
                  gap="10px"
                  className={styles.reactionsBtn}
                >
                  <Tooltip title="Нравится">
                    <ReactionButton
                    // onClick={() => dispatch(setReaction('Like'))}
                    >
                      {/*                      {currentReaction === 'Like' ? (
                        <ThumbUp
                          sx={{
                            color: theme.palette.coplimentPink.main,
                          }}
                        />
                      ) : (
                        <ThumbUpOutlined />
                      )}*/}
                      <Typography
                        variant={'body1'}
                        sx={{ opacity: 0.7 }}
                        marginLeft={2}
                      >
                        {likesCount}{' '}
                      </Typography>
                    </ReactionButton>
                  </Tooltip>
                  <Tooltip title="Не нравится">
                    <ReactionButton
                    // onClick={() => dispatch(setReaction('Dislike'))}
                    >
                      {/*                      {currentReaction === 'Dislike' ? (
                        <ThumbDown
                          sx={{
                            color: theme.palette.coplimentPink.main,
                          }}
                        />
                      ) : (
                        <ThumbDownOutlined />
                      )}*/}
                      <Typography
                        variant="body1"
                        sx={{ opacity: 0.7 }}
                        marginLeft={2}
                      >
                        {dislikesCount}{' '}
                      </Typography>
                    </ReactionButton>
                  </Tooltip>
                </Stack>
                <Tooltip title="Поделиться">
                  <ReactionButton>
                    <ReplyAllOutlined />
                  </ReactionButton>
                </Tooltip>
                <Tooltip title="Добавить в плейлист">
                  <ReactionButton>
                    <PlaylistAdd />
                  </ReactionButton>
                </Tooltip>
                <Tooltip title="Поддержка">
                  <ReactionButton>
                    <AnnouncementOutlined />
                  </ReactionButton>
                </Tooltip>
              </Stack>
            </Stack>

            <Box
              padding=".7rem"
              marginTop="2rem"
              width="100%"
              className={styles.descriptionWrapper}
            >
              <Box variant="body1" sx={{ opacity: 0.7 }}>
                <Typography variant={'body1'} sx={{ opacity: 0.7 }}>
                  Дата публикации: {createTimestamp}
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
                {description}
              </ShowMoreText>
            </Box>

            <Typography paddingLeft="1rem" marginTop="2rem">
              Комментарии
            </Typography>

            <Box
              className={styles.commentSection}
              backgroundColor={theme.palette.shadows.main}
            >
              {
                <Box className={styles.userCommentary}>
                  <Avatar />
                  <input
                    type="text"
                    className={styles.commentaryInput}
                    placeholder="Оставьте комментарий"
                    onChange={handleChangeCommentText}
                    value={commentText}
                  />
                  <IconButton
                    disabled={isCommentEmpty()}
                    onClick={handleSendComment}
                    size="large"
                    variant="contained"
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              }

              <Box>
                {comments?.length > 0 ? (
                  comments?.map((comment, index) => (
                    // <p style={{color: 'white'}} key={index}>{comment.description}</p>
                    <VideoCommentary
                      key={index}
                      commentData={comment}
                      currentUserId={userId}
                      videoOwnerId={authorId}
                      handleDelete={handleDeleteComment(comment.id)}
                    />
                  ))
                ) : (
                  <Typography variant={'body1'}>
                    Пока нет комментариев...
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          // py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          {/*<VideoGrid />*/}
          {/*<VideoCard videos={videos} direction="column" />*/}
          {/*<VideoCard videos={videos} direction="column" />*/}
          {/*<VideoCard videos={videos} direction="column" />*/}
          {/*<VideoCard videos={videos} direction="column" />*/}
          {/*<VideoCard videos={videos} direction="column" />*/}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
