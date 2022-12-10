import React, { useEffect, useState } from 'react';
import UserController from '../../controllers/UsersController';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import styles from './VideoCommentary.module.scss';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import { ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CommentAnswers = (/*{commentData, currentUserId, videoOwnerId, handleDelete}*/) => {
  // const [isVisibleSetAnswer, setIsVisibleSetAnswer] = useState(false);
  // const [authorCommentNick, setAuthorCommentNick] = useState('');
  // const [date, _] = useState(new Date(commentData.createdTimestamp));

  // useEffect(() => {
  //   const resolveAuthorNick = async () => {
  //     return (await UserController.getUserNick(commentData.userId)).nickName;
  //   }
  //   resolveAuthorNick().then((nick) => {
  //     setAuthorCommentNick(nick);
  //   }).catch((err) => {
  //     console.log('Failed resolve author name');
  //     console.log(err);
  //   });
  // }, []);

  const CommentButton = styled(Button)(({ theme }) => ({
    padding: '7px 15px',
    borderRadius: '40px',
    backgroundColor: theme.palette.shadows.main,
    transition: '.4s ease',
    '&:hover': {
      backgroundColor: theme.palette.coplimentPink.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  const CancelButton = styled(Button)(({ theme }) => ({
    padding: '7px 15px',
    borderRadius: '40px',
    backgroundColor: theme.palette.shadows.main,
    transition: '.4s ease',
    '&:hover': {
      backgroundColor: theme.palette.baseBlue.main,
      color: theme.palette.baseBlue.contrastText,
    },
  }));

  const ReactionButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
    transition: '.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.shadows.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

/*  const isMayRemove = () => {
    return !(currentUserId === String(commentData.userId) || currentUserId === videoOwnerId);
  }*/

/*  const handleHideAnswer = () => {setIsVisibleSetAnswer(false)};
  const handleToggleVisibleAnswer = () => {setIsVisibleSetAnswer(!isVisibleSetAnswer)};*/

  return (
    <Stack direction="column" marginBottom={3}>
      <Box className={styles.comment} sx={{marginLeft: '5rem'}}>
        <Box className={styles.avatar}>
          <Link to="/user/:id">
            <Avatar />
          </Link>
        </Box>
        <Box>
          <Stack direction="row" alignItems="center">
            <Link to="/user/:id">
              {/*<Typography variant="subtitle1">{authorCommentNick}Автор</Typography>*/}
              <Typography variant="subtitle1">Автор</Typography>
            </Link>
{/*            <Typography
              variant={'overline'}
              fontSize=".6rem"
              fontWeight="200"
              marginLeft="10px"
            >
              Дата публикации: {date.toLocaleDateString()}
            </Typography>*/}
            <Typography
              variant={'overline'}
              fontSize=".6rem"
              fontWeight="200"
              marginLeft="10px"
            >
              Дата публикации:
            </Typography>
          </Stack>
{/*          <ShowMoreText
            className={styles.truncateText}
            lines={2}
            more="Читать далее"
            less="Свернуть"
            // anchorClass="show-more-less-clickable"
            expanded={false}
            keepNewLines={true}
            // width={800}
            truncatedEndingComponent={'... '}
          >
            {commentData.description}
          </ShowMoreText>*/}
          <ShowMoreText
            className={styles.truncateText}
            lines={2}
            more="Читать далее"
            less="Свернуть"
            // anchorClass="show-more-less-clickable"
            expanded={false}
            keepNewLines={true}
            // width={800}
            truncatedEndingComponent={'... '}
          >
            Text text
          </ShowMoreText>
          <Box>
            <Tooltip title="Нравится">
              <ReactionButton>
                <ThumbUpOutlined />
              </ReactionButton>
            </Tooltip>
            <Tooltip title="Не нравится">
              <ReactionButton>
                <ThumbDownOutlined />
              </ReactionButton>
            </Tooltip>
            {/*<IconButton size='large' disabled={isMayRemove()} onClick={handleDelete} variant="contained">
              <DeleteForeverIcon/>
            </IconButton>*/}
            <IconButton size='large' variant="contained">
              <DeleteForeverIcon/>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default CommentAnswers;
