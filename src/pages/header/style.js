import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
    // background: 'red',
    height: theme.palette.custom.headerHeight,
    position: 'fixed',
    top: 0,
    left: theme.palette.custom.sidebarWidth,
    right: 0,
    zIndex: 999,
    paddingInline: 20,
    boxShadow: '0px 0px 4px rgb(0 0 0 / 2%), 0px 8px 16px rgb(0 0 0 / 2%)',
    [theme.breakpoints.down('md')]: {
      left: 0,
    },
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 40,
    '& .MuiTypography-root': {
      fontWeight: 600,
      fontSize: 20,
      [theme.breakpoints.down('md')]: {
        fontSize: 18,
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    [theme.breakpoints.down('md')]: {
      columnGap: 20,
    },
    [theme.breakpoints.down('sm')]: {
      columnGap: 12,
    },
  },
  logo: {
    width: 120,
    height: 32,
    [theme.breakpoints.down('md')]: {
      width: 100,
      height: 30,
    },
    [theme.breakpoints.down('sm')]: {
      width: 88,
      height: 27,
    },
  },
  profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 40,
    [theme.breakpoints.down('md')]: {
      columnGap: 20,
    },
    [theme.breakpoints.down('sm')]: {
      columnGap: 12,
    },
  },
  notiImgWrapper: {
    background: theme.palette.custom.homeBg,
    borderRadius: 4,
    paddingBlock: 6,
    paddingInline: 8,
    display: 'flex',
    cursor: 'pointer',
  },
  notiImg: {
    width: 24,
    height: 24,
    [theme.breakpoints.down('sm')]: {
      width: 22,
      height: 22,
    },
  },
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 8,
  },
  name: {
    '& .MuiTypography-root': {
      fontWeight: 600,
    },
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& .MuiAvatar-root': {
      width: 48,
      height: 48,
    },
  },
  menu: {
    '& .MuiMenuItem-root': {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
    },
  },
  profile: {
    display: 'flex',
    alignItem: 'center',
    gap: 12,
  },
  profilePic: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  profileLabel: {
    '& .MuiTypography-root': {
      fontWeight: 500,
      fontSize: 15,
    },
  },
  label: {
    '& .MuiTypography-root': {
      fontSize: 15,
      fontWeight: 500,
    },
  },
  mobileMenuContainer: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        fontSize: 32,
        display: 'flex',
      },
    },
  },
}))

export default useStyles
