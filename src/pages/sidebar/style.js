import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: `100vh`,
    // height: `calc(100vh - ${theme.palette.custom.headerHeight}px)`,
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000,
    width: theme.palette.custom.sidebarWidth,
    overflowY: 'auto',
    background: '#ffffff',
    // background: 'green',
    // boxShadow: '8px 0px 16px rgb(0 0 0 / 8%)',
    scrollbarWidth: 'thin',
    // '& .MuiSvgIcon-root': {
    //   color: '#022247',
    // },
    paddingInline: 16,
    '&::-webkit-scrollbar': {
      width: 2,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#C9C9C9',
    },
    '& .Mui-selected': {
      backgroundColor: '#EFF5FF !important',
      borderRadius: 5,
    },
    '& .MuiCollapse-root': {
      paddingBlockStart: 8,
    },
  },
  logoWrapper: {
    height: theme.palette.custom.headerHeight,
    borderBottom: '1px solid #E4E7ED',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 120,
    height: 32,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      width: 100,
      height: 30,
    },
    [theme.breakpoints.down('sm')]: {
      width: 88,
      height: 27,
    },
  },
  menuWrapper: {
    paddingBlock: 12,
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  },
  menuToggle1: {
    [theme.breakpoints.down('md')]: {
      width: 244,
      transition: 'width 1s',
      transitionTimingFunction: 'ease-in-out',
    },
  },
  menuToggle2: {
    [theme.breakpoints.down('md')]: {
      width: 0,
      animation: '$toggling 1s ',
      paddingInline: 0,
    },
  },
  '@keyframes toggling': {
    '0%': {
      width: 244,
    },
    '100%': {
      width: 0,
    },
  },
  closeIconWrapper: {
    position: 'absolute',
    right: 8,
    display: 'none',
    alignItems: 'center',
    padding: 4,
    cursor: 'pointer',
    // background: '#fff',
    // borderRadius: '100%',
    // boxShadow: '0px 10px 20px 0px rgba(18, 38, 63, 0.03)',
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  menuLabels: {
    '& .MuiTypography-root': {
      color: '#2D3748',
      fontWeight: 600,
    },
  },
  menuLabels2: {
    '& .MuiTypography-root': {
      fontWeight: 500,
      color: '#4D4E4E',
    },
  },
  subMenuLabel: {
    '& .MuiTypography-root': {
      color: '#5C5E64',
      paddingInlineStart: 12,
    },
  },
  subMenuLabelActive: {
    '& .MuiTypography-root': {
      color: '#0E5EFA',
      paddingInlineStart: 12,
    },
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
}))

export default useStyles
