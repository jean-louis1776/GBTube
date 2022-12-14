import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Box, Avatar, Paper, Tabs, Tab, Typography } from '@mui/material';
import { theme } from '../../theme';
import TabPanel from '../UserPage/TabPanel';
import Personal from './Personal';
import Email from './Email';
import Password from './Password';
import UserController from '../../controllers/UsersController';
import { shallowEqual, useSelector } from 'react-redux';
import { getUserId } from '../../store/selectors';
import UploadAvatar from './uploadAvatar';
import { API_URL } from '@constants/frontend';

import styles from './userProfile.module.scss';

const UserProfile = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const tabsNameList = [
    'Персональная информация',
    'Электронная почта',
    'Пароль',
    'Аватар',
  ];
  const userId = useSelector(getUserId, shallowEqual);
  const [userData, setUserData] = useState({});
  const [isInfoUpdated, setIsInfoUpdated] = useState(false);

  const refreshData = () => {
    const fetchData = async () => {
      return UserController.getUserById(userId);
    };

    fetchData()
      .then((data) => {
        if (data.birthDate === '') {
          setUserData(data);
        } else {
          const date = new Date(data.birthDate);
          const year = date.getFullYear();
          const month =
            date.getMonth() + 1 > 10
              ? `${date.getMonth() + 1}`
              : `0${date.getMonth() + 1}`;
          const day =
            date.getDate() > 10 ? `${date.getDate()}` : `0${date.getDate()}`;
          setUserData({ ...data, birthDate: `${year}-${month}-${day}` });
        }
        setIsInfoUpdated(true);
        console.log(data);
      })
      .catch((err) => {
        console.log('Fetch user data failed');
        console.log(err);
      });
  };

  // useEffect(refreshData, []);
  useEffect(() => {
    document.title = 'Мой профиль | GeekTube';
    refreshData();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabNumber(newValue);
  };

  return (
    <>
      <Header />
      <Box className={styles.userForm} sx={{ bgcolor: 'darkBackground.main' }}>
        <Paper className={styles.userForm_container}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              pb: '2rem',
            }}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ textAlign: 'center' }}
            >
              Ваш профиль
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6rem' }}>
              <Box>
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    position: 'relative',
                  }}
                  alt="avatar"
                  src={`${API_URL}/user/avatar/${userId}`}
                />
              </Box>
              <Box>
                <Typography className={styles.userInfo}>
                  <span>ID пользователя:</span> {userData.id}
                </Typography>
                <Typography className={styles.userInfo}>
                  <span>Псевдоним:</span> {userData.nickName}
                </Typography>
                <Typography className={styles.userInfo}>
                  <span>Имя:</span> {userData.firstName}
                </Typography>
                <Typography className={styles.userInfo}>
                  <span>Фамилия:</span> {userData.lastName}
                </Typography>
                <Typography className={styles.userInfo}>
                  <span>Дата рождения:</span>{' '}
                  {new Date(userData.birthDate).toLocaleDateString()}
                </Typography>
                <Typography className={styles.userInfo}>
                  <span>Email:</span> {userData.email}
                </Typography>
                <Typography className={styles.userInfo}>
                  <span>Дата регистрации:</span>{' '}
                  {new Date(userData.createdTimestamp).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* <Typography>Роль: {userData.role}</Typography> */}

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
                {tabsNameList.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab}
                    sx={{
                      color: 'white',
                      paddingX: 12,
                      maxWidth: '250px',
                    }}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>
          <Box
            sx={{
              color: 'white',
              maxWidth: '70vw',
              height: '100%',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TabPanel tabNumber={tabNumber} index={0}>
              {isInfoUpdated ? (
                <Personal
                  currentNickName={userData.nickName}
                  currentFirstName={userData.firstName}
                  currentLastName={userData.lastName}
                  currentBirthDate={userData.birthDate}
                  refreshData={refreshData}
                  userId={userId}
                />
              ) : (
                ''
              )}
            </TabPanel>
            <TabPanel tabNumber={tabNumber} index={1}>
              {isInfoUpdated ? (
                <Email
                  currentEmail={userData.email}
                  refreshData={refreshData}
                  userId={userId}
                />
              ) : (
                ''
              )}
            </TabPanel>
            <TabPanel tabNumber={tabNumber} index={2}>
              {isInfoUpdated ? <Password userId={userId} /> : ''}
            </TabPanel>
            <TabPanel tabNumber={tabNumber} index={3}>
              {isInfoUpdated ? (
                <UploadAvatar refreshData={refreshData} userId={userId} />
              ) : (
                ''
              )}
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default UserProfile;
