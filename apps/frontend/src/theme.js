import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    darkBackground: {
      main: '#1F1F1F',
      contrastText: '#fff',
    },
    shadows: {
      main: '#464646',
      second: 'rgba(245, 249, 255,.4)',
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
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          backgroundColor: theme.palette.shadows.main,
        }),
      },
    },

    MuiStack: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          backgroundColor: theme.palette.darkBackground.main,
        }),
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.darkBackground.contrastText,
        }),
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.darkBackground.main,
        }),
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.darkBackground.main,
        }),
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.shadows.second,
        }),
      },
    },
  },
});
