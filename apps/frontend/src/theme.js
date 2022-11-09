import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    darkBackground: {
      main: '#272C37',
      contrastText: '#fff',
    },
    shadows: {
      main: '#A4ABBD',
    },
    baseBlue: {
      main: '#0089EB',
      contrastText: '#F2F9FF',
    },
    coplimentPink: {
      main: '#E0557F',
      contrastText: '#FFF4F8',
    },
  },

  components: {
    MuiBox: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.darkBackground.main,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.baseBlue.main,
          color: theme.palette.baseBlue.contrastText,
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.baseBlue.main,
        }),
      },
    },
  },
});
