import Header from '../Header/Header';
import { Avatar, Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { CHANNEL, userChannelTabs } from '@constants/frontend';
import { useParams } from 'react-router-dom';
import UserAbout from './UserAbout';
import PlayListGrid from '../PlayListGrid';
import VideoGrid from '../VideoGrid/VideoGrid';
import { shallowEqual, useSelector } from 'react-redux';
import { getAuthStatus, getUserId } from '../../store/selectors';
import TabPanel from './TabPanel';
import GetChildrenController from '../../controllers/GetChildrenController';
import EditItemController from '../../controllers/EditItemController';
import VideoController from '../../controllers/VideoController';

const UserPage = () => {
  const theme = useTheme();
  const { idList } = useParams();
  const userId = useSelector(getUserId, shallowEqual);
  const isAuth = useSelector(getAuthStatus, shallowEqual);
  const channelId = idList.split('_').at(-1);
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [subscribersCount, setSubscribersCount] = useState('0');
  const [tabNumber, setTabNumber] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isOwner = () => {
    const authorId = idList.split('_')[0];
    return authorId === userId;
  };

  const SubscribeButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
    padding: '7px 15px',
    transition: '.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.shadows.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  useEffect(() => {
    const fetchChannelData = async () => {
      return await GetChildrenController.getItemById(CHANNEL, channelId);
    };
    fetchChannelData()
      .then((channelData) => {
        console.log(channelData);
        setChannelName(channelData.title);
        setDescription(channelData.description);
        setSubscribersCount(channelData.subscribersCount);
        setIsSubscribed(channelData.isSubscribed);
      })
      .catch((err) => {
        console.log('Fetch channel data error');
        console.log(err);
      });
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabNumber(newValue);
  };

  const handleSubscribe = async () => {
    console.log(isSubscribed, 'isSubscribed');
    const { isSubscribe } = await EditItemController.subscribe(
      channelId,
      userId
    );
    console.log(isSubscribe, 'isSubscribe');
    setIsSubscribed(isSubscribe);
  };

  return (
    <>
      <Header withNavbar />
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 12,
            marginBottom: 4,
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Avatar sx={{ width: 100, height: 100 }} />
          <Box
            sx={{
              display: 'flex',
              width: '20vw',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant={'h5'}>{channelName}</Typography>
              <Typography variant={'subtitle2'}>
                {subscribersCount} подписчиков
              </Typography>
            </Box>
            {isOwner() ? (
              <SubscribeButton variant="outlined" color="whiteButton">
                Редактировать
              </SubscribeButton>
            ) : !isSubscribed ? (
              <SubscribeButton
                onClick={handleSubscribe}
                disabled={!isAuth}
                sx={{
                  backgroundColor: theme.palette.coplimentPink.main,
                  color: theme.palette.coplimentPink.contrastText,
                }}
              >
                Подписаться
              </SubscribeButton>
            ) : (
              <SubscribeButton
                disabled={!isAuth}
                onClick={handleSubscribe}
                color="whiteButton"
              >
                Отписаться
              </SubscribeButton>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{ borderBottom: 1, borderColor: theme.palette.shadows.main }}
          >
            <Tabs value={tabNumber} onChange={handleChangeTab}>
              {userChannelTabs.map((tab, index) => (
                // <Link to={tab.link} key={index}>
                <Tab
                  key={index}
                  label={tab.name}
                  sx={{
                    color: 'white',
                    paddingX: 12,
                  }}
                />
                // </Link>
              ))}
            </Tabs>
          </Box>
        </Box>
        <Box
          sx={{
            color: 'white',
            maxWidth: '70vw',
            margin: '20px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TabPanel tabNumber={tabNumber} index={0}>
            <VideoGrid
              isParent={false}
              getChildren={VideoController.getVideoByChannel}
              onChannelPage
            />
          </TabPanel>
          <TabPanel tabNumber={tabNumber} index={1}>
            <PlayListGrid isParent={false} />
          </TabPanel>
          <TabPanel tabNumber={tabNumber} index={2}>
            <UserAbout description={description} />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};

export default UserPage;
