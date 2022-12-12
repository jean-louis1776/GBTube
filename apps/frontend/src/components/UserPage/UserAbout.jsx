import { Typography } from '@mui/material';

const UserAbout = ({description}) => {
  return <Typography>{description || 'Описание не задано'}</Typography>;
};

export default UserAbout;
