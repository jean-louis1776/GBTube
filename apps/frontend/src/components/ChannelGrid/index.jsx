import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { Loader } from '../';
import GetChildrenController from '../../controllers/GetChildrenController';
import { useNavigate, useParams } from 'react-router-dom';
import { CHANNEL, searchErrorLogo } from '@constants/frontend';
import { ContentChannel } from './ContentChannel';
import { useTheme } from '@mui/material/styles';
import Header from '../Header/Header';
import { shallowEqual, useSelector } from 'react-redux';
import { getUserId } from '../../store/selectors';
import UserController from '../../controllers/UsersController';

const ChannelGrid = () => {
  const { authorId } = useParams();
  const [content, setContent] = useState(<Loader />);
  const [authorNick, setAuthorNik] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const userId = useSelector(getUserId, shallowEqual);

  useEffect(() => {
    const fetchData = async () => {
      setContent(<Loader />);
      const children = await GetChildrenController.getAllItemsById(
        authorId,
        CHANNEL
      );
      if (children.length === 0) {
        setContent(
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
                sx={{ fontWeight: 600, fontSize: '1.7rem', userSelect: 'none' }}
              >
                К сожалению, у вас не создано ни одного канала
              </Typography>
            </Box>
          </Box>
        );
      } else {
        setContent(<ContentChannel children={children} />);
      }
      setAuthorNik((await UserController.getUserNick(authorId)).nickName);
    };
    fetchData().catch(() => {
      setContent('');
      console.log(`Load ${CHANNEL} fail in ChannelGrid`);
    });

    document.title = `Каналы ${authorNick} | GeekTube`;
  }, [authorNick]);

  const handleCreateChild = () => {
    navigate(`/${CHANNEL}/create/${userId}`);
  };

  const isAuthor = () => authorId === userId;

  return (
    <>
      <Header />

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          p: '80px 32px 16px',
          background:
            'linear-gradient(0deg, rgba(31, 31, 31, 0.36) 40%, rgba(25, 118, 210, 0.17) 100%)',
        }}
      >
        <Stack>
          <Box>
            {authorNick.length > 60 ? (
              <Tooltip title={authorNick}>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  sx={{ userSelect: 'none' }}
                >
                  Каналы пользователя:
                </Typography>
                <Typography
                  variant="h6"
                  marginBottom={2}
                  sx={{ userSelect: 'none' }}
                >
                  {authorNick.slice(0, 60) + '...'}
                </Typography>
              </Tooltip>
            ) : (
              <>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  sx={{ userSelect: 'none' }}
                >
                  Каналы пользователя:
                </Typography>
                <Typography
                  variant="h6"
                  marginBottom={2}
                  sx={{ userSelect: 'none' }}
                >
                  {authorNick}
                </Typography>
              </>
            )}
          </Box>
        </Stack>

        <Box
          sx={{
            margin: '0 auto',
          }}
        >
          {isAuthor() ? (
            <Button
              variant="contained"
              color="baseBlue"
              onClick={handleCreateChild}
            >
              Создать канал
            </Button>
          ) : (
            ''
          )}
        </Box>

        {content}
      </Box>
    </>
  );
};

export default ChannelGrid;
