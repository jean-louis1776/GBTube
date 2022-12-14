import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Box, Avatar, Paper, Tabs, Tab, Typography } from '@mui/material';
import styles from './userProfile.module.scss';
import { theme } from '../../theme';
import TabPanel from '../UserPage/TabPanel';
import Personal from './Personal';
import Email from './Email';
import Password from './Password';
import UserController from '../../controllers/UsersController';
import { shallowEqual, useSelector } from 'react-redux';
import { getUserId } from '../../store/selectors';
import UploadAvatar from './uploadAvatar';

const UserProfile = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const tabsNameList = ['Персональная информация', 'Электронная почта', 'Пароль', 'Аватар'];
  const userId = useSelector(getUserId, shallowEqual);
  const [userData, setUserData] = useState({});
  const [isInfoUpdated, setIsInfoUpdated] = useState(false);

  const refreshData = () => {
    const fetchData = async () => {
      return UserController.getUserById(userId);
    }

    fetchData().then((data) => {
      if (data.birthDate === '') {
        setUserData(data);
      } else {
        const date = new Date(data.birthDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
        const day = (date.getDate() + 1) > 10 ? `${date.getDate() + 1}` : `0${date.getDate() + 1}`;
        setUserData({ ...data, birthDate: `${year}-${month}-${day}`});
      }
      setIsInfoUpdated(true);
      console.log(data);
    }).catch((err) => {
      console.log('Fetch user data failed');
      console.log(err);
    });
  }


  useEffect(refreshData, []);
  const handleChangeTab = (event, newValue) => {
    setTabNumber(newValue);
  };

  return (
    <>
      <Header />
      <Box className={styles.userForm} sx={{ bgcolor: 'darkBackground.main' }}>
        <Paper className={styles.userForm_container}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              marginBottom: 3,
              position: 'relative',
            }}
            alt="avatar"
            src={`/api/user/avatar/${userId}`}
          />
  {/*        <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            mt={3}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '60ch' },
            }}
          >*/}
            <Typography>Идентификатор: {userData.id}</Typography>
            <Typography>Псевдоним: {userData.nickName}</Typography>
            <Typography>Имя: {userData.firstName}</Typography>
            <Typography>Фамилия: {userData.lastName}</Typography>
            <Typography>Дата рождения: {`${userData.birthDate}`}</Typography>
            <Typography>Электронная почта: {userData.email}</Typography>
            <Typography>Зарегистрирован: {(new Date(userData.createdTimestamp)).toLocaleString()}</Typography>
            <Typography>Роль: {userData.role}</Typography>
          {/*</Stack>*/}

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
              margin: '20px auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TabPanel tabNumber={tabNumber} index={0}>
              {isInfoUpdated ? <Personal
                currentNickName={userData.nickName}
                currentFirstName={userData.firstName}
                currentLastName={userData.lastName}
                currentBirthDate={userData.birthDate}
                refreshData={refreshData}
                userId={userId}
              /> : ''}
            </TabPanel>
            <TabPanel tabNumber={tabNumber} index={1}>
              {isInfoUpdated ? <Email
                currentEmail={userData.email}
                refreshData={refreshData}
                userId={userId}
              /> : ''}
            </TabPanel>
            <TabPanel tabNumber={tabNumber} index={2}>
              {isInfoUpdated ? <Password userId={userId} /> : ''}
            </TabPanel>
            <TabPanel tabNumber={tabNumber} index={3}>
              {isInfoUpdated ? <UploadAvatar refreshData={refreshData} userId={userId} /> : ''}
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default UserProfile;
