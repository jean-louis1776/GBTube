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
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from '@mui/icons-material';
import Loader from '../Loader/Loader';
import ShowMoreText from 'react-show-more-text';
import { styled, useTheme } from '@mui/material/styles';
import VideoCommentary from '../VideoCommentary/VideoCommentary';
import VideoController from '../../controllers/VideoController';
import { API_URL, CHANNEL, VIDEO } from '@constants/frontend';
import { Player } from 'react-tuby';
import 'react-tuby/css/main.css';
import { shallowEqual, useSelector } from 'react-redux';
import { getAuthStatus, getRole, getUserId } from '../../store/selectors';
import CommentController from '../../controllers/CommentController';
import SendIcon from '@mui/icons-material/Send';
import EditItemController from '../../controllers/EditItemController';
import GetChildrenController from '../../controllers/GetChildrenController';

import styles from './VideoDetail.module.scss';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const VideoDetail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { idList } = useParams();
  const videoId = idList.split('_').at(-1);
  const authorId = idList.split('_')[0];
  const userId = useSelector(getUserId, shallowEqual);
  const isAuth = useSelector(getAuthStatus, shallowEqual);
  const channelId = idList.split('_').at(1);
  const userRole = useSelector(getRole, shallowEqual);
  const [videoContent, setVideoContent] = useState(<Loader />);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [category, setCategory] = useState('');
  const [channelName, setChannelName] = useState('');
  const [createTimestamp, setCreateTimestamp] = useState('');
  const [description, setDescription] = useState('');
  const [dislikesCount, setDislikesCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [authorNickName, setAuthorNickName] = useState('');
  const [title, setTitle] = useState('');
  const [subscribersCount, setSubscribersCount] = useState('0');
  const [viewsCount, setViewsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [currentReaction, setCurrentReaction] = useState('');
  const [commentId, setCommentId] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const channelNameLink = idList.split('_').slice(0, 2).join('_');

  const ReactionButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
    transition: '.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.shadows.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  useEffect(() => {
    setVideoContent(<Loader />);
    const fetchVideoData = async () => {
      const videoInfo = await VideoController.getVideoInfo(videoId, userId);
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
      setCurrentReaction(videoInfo.grade);
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

    fetchVideoData()
      .then()
      .catch((err) => {
        setVideoContent(<p style={{ color: 'white' }}>Видео не найдено</p>);
        console.log(err);
        console.log('Fail get info about video');
      });
    const fetchCommentData = async () => {
      setComments(await CommentController.getAllItemsByVideo(videoId, userId));
    };

    fetchCommentData()
      .then()
      .catch((err) => {
        setComments([]);
        console.log(err);
        console.log('Fail get info about comments');
      });
  }, []);

  useEffect(() => {
    const fetchChannelData = async () => {
      return await GetChildrenController.getItemById(
        CHANNEL,
        channelId,
        userId
      );
    };
    fetchChannelData()
      .then((channelData) => {
        setIsSubscribed(channelData.isSubscribed);
        setSubscribersCount(channelData.subscribersCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [channelName]);

  const handleChangeCommentText = (evt) => {
    setCommentText(evt.target.value);
  };

  const handleSendComment = async () => {
    console.log('Send comment');
    try {
      const { data: commentId } = await CommentController.send(
        idList,
        userId,
        commentText.trim()
      );
      setCommentId(commentId);
      const comments = await CommentController.getAllItemsByVideo(
        videoId,
        userId
      );
      setComments(comments);
      setCommentText('');
    } catch (err) {
      console.log('Send comment error');
      console.log(err);
    }
  };

  const enterHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      handleSendComment();
    }
  };

  const isCommentEmpty = () => commentText.length === 0;

  const isMayModerate = () => {
    return (
      authorId === userId || userRole === 'admin' || userRole === 'moderator'
    );
  };

  const handleDeleteComment = (comment) => async () => {
    const commentId = comment.idList.split('_').at(-1);
    try {
      await CommentController.delete(commentId);
      const newComments = await CommentController.getAllItemsByVideo(
        videoId,
        userId
      );
      setComments(newComments);
    } catch (err) {
      console.log(`Failed delete comment ${commentId}`);
      console.log(err);
    }
  };

  const handleLikeReaction = async () => {
    try {
      const { data: status } = await VideoController.sendLikeReactionVideo(
        videoId,
        userId
      );

      if (status && currentReaction === '') {
        setLikesCount(likesCount + 1);
        setCurrentReaction('like');
      } else if (status && currentReaction === 'dislike') {
        setDislikesCount(dislikesCount - 1);
        setLikesCount(likesCount + 1);
        setCurrentReaction('like');
      } else {
        setLikesCount(likesCount - 1);
        setCurrentReaction('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislikeReaction = async () => {
    try {
      const { data: status } = await VideoController.sendDislikeReactionVideo(
        videoId,
        userId
      );

      if (status && currentReaction === '') {
        setDislikesCount(dislikesCount + 1);
        setCurrentReaction('dislike');
      } else if (status && currentReaction === 'like') {
        setLikesCount(likesCount - 1);
        setDislikesCount(dislikesCount + 1);
        setCurrentReaction('dislike');
      } else {
        setDislikesCount(dislikesCount - 1);
        setCurrentReaction('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubscribe = async () => {
    const { isSubscribe, subscribersCount } =
      await EditItemController.subscribe(channelId, userId);
    setIsSubscribed(isSubscribe);
    setSubscribersCount(subscribersCount);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleModalUnSub = () => {
    handleSubscribe();
    handleCloseModal();
  };

  return (
    <Box className={styles.wrapper}>
        <Header />
        <Stack direction={{ xs: 'column', md: 'row' }} className={styles.stack}>
          <Box width={'1080px'}>
            {videoContent}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              py={3}
              px={2}
            >
              <Typography
                color="#fff"
                variant="h5"
                fontWeight="bold"
                maxWidth="800px"
              >
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
              px={2}
            >
              <Stack direction="row" className={styles.channel_info}>
                <Link
                  to={`/${CHANNEL}/${channelNameLink}`}
                  style={{ marginRight: '2rem' }}
                >
                  <Box className={styles.channel_sub}>
                    <Avatar sx={{ mr: '10px' }} />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight="500"
                          lineHeight={0.75}
                        >
                          {channelName}
                        </Typography>
                        <CheckCircle
                          sx={{ fontSize: '15px', color: 'gray', ml: '5px' }}
                        />
                      </Box>

                      <Typography
                        variant="caption"
                        fontWeight="500"
                        sx={{ opacity: 0.5, lineHeight: 1 }}
                      >
                        {subscribersCount} подписчиков
                      </Typography>
                    </Box>
                  </Box>
                </Link>

                {isMayModerate() ? (
                  ''
                ) : !isSubscribed ? (
                  <Button
                    onClick={handleSubscribe}
                    disabled={!isAuth}
                    sx={{
                      backgroundColor: theme.palette.coplimentPink.main,
                      color: theme.palette.coplimentPink.contrastText,
                    }}
                  >
                    Подписаться
                  </Button>
                ) : (
                  <Button
                    disabled={!isAuth}
                    onClick={handleOpenModal}
                    color="whiteButton"
                    sx={{
                      backgroundColor: theme.palette.shadows.main,
                    }}
                  >
                    Вы подписаны
                  </Button>
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
                      onClick={handleLikeReaction}
                      disabled={!isAuth}
                    >
                      {currentReaction === 'like' ? (
                        <ThumbUp
                          sx={{
                            color: theme.palette.coplimentPink.main,
                          }}
                        />
                      ) : (
                        <ThumbUpOutlined />
                      )}
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
                      onClick={handleDislikeReaction}
                      disabled={!isAuth}
                    >
                      {currentReaction === 'dislike' ? (
                        <ThumbDown
                          sx={{
                            color: theme.palette.baseBlue.main,
                          }}
                        />
                      ) : (
                        <ThumbDownOutlined />
                      )}
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
                {/* <Tooltip title="Поделиться">
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
              </Tooltip> */}
              </Stack>
            </Stack>

            <Box
              padding=".7rem"
              marginTop="2rem"
              width="100%"
              className={styles.descriptionWrapper}
            >
              {description}
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
                  <Avatar
                    alt="avatar"
                    src={`${API_URL}/user/avatar/${userId}`}
                  />
                  <input
                    type="text"
                    className={styles.commentaryInput}
                    placeholder="Оставьте комментарий"
                    onChange={handleChangeCommentText}
                    value={commentText}
                    onKeyDown={enterHandler}
                    disabled={!isAuth}
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
                    <VideoCommentary
                      key={index}
                      commentData={comment}
                      currentUserId={userId}
                      videoOwnerId={authorId}
                      commentId={commentId}
                      handleDelete={handleDeleteComment(comment)}
                    />
                  ))
                ) : (
                  <Typography
                    variant={'body1'}
                    sx={{ opacity: 0.7, userSelect: 'none' }}
                  >
                    Пока нет комментариев...
                  </Typography>
                )}
              </Box>
              <Box variant="body1" sx={{ opacity: 0.7 }}>
                <Typography
                  variant={'body1'}
                  sx={{ opacity: 0.7, userSelect: 'none' }}
                >
                  Дата публикации: {createTimestamp}
                </Typography>
              </Box>
              <Box variant="body1" sx={{ opacity: 0.7 }}>
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

              {/* <Typography */}
              {/* //   variant="h6"
            //   paddingLeft="1rem"
            //   marginTop="2rem"
            //   sx={{ userSelect: 'none' }}
            // >
            //   Комментарии
            // </Typography>

            // <Box */}
              {/* //   className={styles.commentSection}
            //   backgroundColor={theme.palette.shadows.main}
            // >
            //   { */}
              {/* //     <Box className={styles.userCommentary}>
            //       <Avatar */}
              {/* //         alt="avatar"
            //         src={`${API_URL}/user/avatar/${userId}`}
            //       />
            //       <input */}
              {/* //         type="text"
            //         className={styles.commentaryInput}
            //         placeholder="Оставьте комментарий"
            //         onChange={handleChangeCommentText}
            //         value={commentText}
            //         disabled={!isAuth}
            //       />
            //       <IconButton */}
              {/* //         disabled={isCommentEmpty()}
            //         onClick={handleSendComment}
            //         size="large"
            //         variant="contained"
            //       >
            //         <SendIcon />
            //       </IconButton>
            //     </Box>


          //       <Box>
          //         {comments?.length > 0 ? ( */}
              {/* //           comments?.map((comment, index) => (
          //             <VideoCommentary */}
              {/* //               key={index}
          //               commentData={comment}
          //               currentUserId={userId}
          //               videoOwnerId={authorId}
          //               handleDelete={handleDeleteComment(comment)}
          //             />
          //           ))
          //         ) : (
          //           <Typography variant={'body1'}>
          //             Пока нет комментариев...
          //           </Typography>
          //         )}
          //       </Box>
          //   </Box>
          // </Box> */}
              {/* <Box
           py={{ md: 1, xs: 5 }}
             justifyContent="center"
             alignItems="center" */}
            </Box>
          </Box>
        </Stack>
        <ConfirmModal
          submitAction={handleModalUnSub}
          openModal={openModal}
          closeModal={handleCloseModal}
          title="Вы уверены, что хотите отписаться?"
          content='Нажимая "Отказаться от подписки", вы перестанете быть подписчиком данного канала и не сможете отслеживать новые видео.'
          cancelButton="Отмена"
          submitButton="Отказаться от подписки"
        />
      </Box>
  );
};

export default VideoDetail;
