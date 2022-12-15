import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    darkBackground: {
      main: '#1F1F1F',
      second: 'rgba(31, 31, 31, .36)',
      contrastText: '#fff',
    },
    shadows: {
      main: '#464646',
      second: 'rgba(245, 249, 255,.4)',
    },
    baseBlue: {
      main: '#0089EB',
      second: 'rgba(25,118,210,.25)',
      third: 'rgba(25,118,210,.35)',
      contrastText: '#F2F9FF',
    },
    coplimentPink: {
      main: '#E0557F',
      contrastText: '#FFF4F8',
    },
    whiteButton: {
      main: '#F2F9FF',
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.shadows.main,
        }),
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.shadows.main,
          },
          '&:focus-visible': {
            backgroundColor: theme.palette.shadows.main,
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.baseBlue.second,
            '&:hover': {
              backgroundColor: theme.palette.baseBlue.third,
            },
          },
        }),
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.baseBlue.second,
          },
          '&:focus-visible': {
            backgroundColor: theme.palette.baseBlue.second,
          },
        }),
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.shadows.main,
          },
          color: theme.palette.darkBackground.contrastText,
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
          marginTop: 0,
          marginBottom: 0,
          backgroundColor: theme.palette.shadows.second,
        }),
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.shadows.second,
        }),
      },
    },

    MuiBox: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.darkBackground.main,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: () => ({
          borderRadius: '40px',
        }),
      },
    },
  },
});
