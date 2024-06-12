import { createTheme } from '@mui/material/styles' // Create a theme instance
import { GridToolbar } from '@mui/x-data-grid'

const theme = createTheme({
  palette: {
    custom: {
      main: '#0E5EFA',
      hover: 'rgb(14,94,250,0.9)',
      light: '#3E7EFB',
      dark: '#0941AF',
      contrastText: '#ffffff',
      gradient:
        'linear-gradient(86deg, rgba(36,24,68,1) 0%, rgba(39,2,134,1) 92%)',
      bg: '#f7f7f7',
      headerHeight: 70,
      sidebarWidth: 290,
      homePaddingInline: 20,
      homePaddingBlock: 20,
      boxShadow: '0px 5px 15px 5px rgb(0 0 0 / 10%)',
      homeBg: '#F6F6F6',
    },
    secondary: {
      main: '#0E5EFA',
      light: '#3E7EFB',
      dark: '#0941AF',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff2020',
      light: '#ff644c',
      dark: '#c30000',
      contrastText: '#FF2083',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: 64,
      fontWeight: 500,
    },
    h2: {
      fontSize: 36,
      fontWeight: 500,
    },
    h3: {
      fontSize: 28,
      fontWeight: 400,
    },
    h4: {
      fontSize: 24,
      fontWeight: 400,
    },
    h5: {
      fontSize: 20,
      fontWeight: 400,
    },
    h6: {
      fontSize: 18,
      fontWeight: 400,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 12,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: 10,
      fontWeight: 400,
    },
    caption: {
      fontSize: 8,
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: 10,
        },
      },
    },
    MuiDayPicker: {
      weekDayLabel: {
        fontSize: 10,
      },
    },
  },
})

export default theme
