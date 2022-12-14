import { Box, Typography } from '@mui/material';

const UserAbout = ({ description }) => {
  return (
    <Box>
      <Typography
        variant="h5"
        textAlign="center"
        sx={{ userSelect: 'none', mb: 3 }}
      >
        Описание
      </Typography>
      <Typography sx={{ fontSize: '1.1rem' }}>
        {description || 'Описание не задано'}
      </Typography>
    </Box>
  );
};

export default UserAbout;
