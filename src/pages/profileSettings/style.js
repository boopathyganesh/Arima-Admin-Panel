import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
  },
  avatarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingBlockEnd: 20,
  },
  imgContainer: {
    width: 120,
    height: 120,
    borderRadius: '100%',
    position: 'relative',
  },
  img: {
    width: '100%',
    borderRadius: '100%',
    height: '100%',
  },
  title: {
    '& .MuiTypography-root': {
      fontWeight: 600,
      paddingBlockEnd: 20,
    },
  },
  camIcon: {
    position: 'absolute',
    right: -4,
    top: '61%',
    '& .MuiSvgIcon-root': {
      display: 'flex',
      fontSize: 28,
      color: theme.palette.custom.main,
      cursor: 'pointer',
      fontWeight: 600,
      backgroundColor: '#fff',
    },
  },
  fieldWrapper: {
    display: 'flex',
    columnGap: 16,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  input: {
    paddingBlockEnd: 16,
  },
  btn: {
    paddingBlockStart: 12,
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiButton-root': {
      backgroundColor: theme.palette.custom.main,
      color: '#fff',
      fontSize: 14,
      padding: '8px 34px',
      '&:hover': {
        backgroundColor: '#0556f5',
      },
    },
  },
  password: {
    cursor: 'pointer',
  },
}))

export default useStyles
