import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    red: {
      main: '#fc1503',
      contrastText: '#fff',
    },
  },

  // components: {
  //   MuiStepIcon: {
  //     styleOverrides: {
  //       root: ({ theme }) => ({
  //         color: theme.palette.red.main,
  //       }),
  //     },
  //   },
  // },
});
