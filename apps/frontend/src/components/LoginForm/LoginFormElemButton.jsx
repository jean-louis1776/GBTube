import { Button } from '@mui/material';
import React from 'react';

export const LoginFormElemButton = ({isValid}) => {
  return (
    <Button
      type="submit"
      color="baseBlue"
      variant="contained"
      disabled={!isValid}
    >
      Войти
    </Button>
  );
}
