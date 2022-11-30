import Header from '../Header/Header';
import { Avatar, Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { userChannelTabs } from '@constants/frontend';
import { Link } from 'react-router-dom';
import UserAbout from './UserAbout';
import ChannelGrid from '../ChannelGrid';
import PlayListGrid from '../PlayListGrid';
import VideoGrid from '../VideoGrid/VideoGrid';

const UserPage = () => {
  const theme = useTheme();

  const SubscribeButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
    padding: '7px 15px',
    transition: '.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.shadows.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  const [subscribe, setSubscribe] = useState(true);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

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
              <Typography variant={'h5'}>UserName</Typography>
              <Typography variant={'subtitle2'}>100500 подписчиков</Typography>
            </Box>
            {subscribe ? (
              <SubscribeButton
                onClick={() => setSubscribe((prevState) => !prevState)}
                sx={{
                  backgroundColor: theme.palette.coplimentPink.main,
                  color: theme.palette.coplimentPink.contrastText,
                }}
              >
                Подписаться
              </SubscribeButton>
            ) : (
              <SubscribeButton
                onClick={() => setSubscribe((prevState) => !prevState)}
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
            <Tabs value={value} onChange={handleChange}>
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
          <TabPanel value={value} index={0}>
            Видиксы
            {/*<VideoGrid />*/}
          </TabPanel>
          <TabPanel value={value} index={1}>
            Плейлисты
            {/*{<PlayListGrid />}*/}
          </TabPanel>
          <TabPanel value={value} index={2}>
            Каналы
            {/*<ChannelGrid />*/}
          </TabPanel>
          <TabPanel value={value} index={3}>
            <UserAbout />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};

export default UserPage;
