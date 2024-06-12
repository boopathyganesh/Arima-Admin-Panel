import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    '& .MuiDialog-paper': {
      height: '94vh',
      width: '80%',
      [theme.breakpoints.down('md')]: {
        width: '84%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '94%',
      },
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
  infoLabel: {
    '& .MuiTypography-root': {
      color: '#4D4E4E',
      paddingBlockEnd: 16,
    },
  },
  uploadWrapper: {
    width: '100%',
    height: 120,
    [theme.breakpoints.down('sm')]: {
      height: 180,
    },
  },
  disableWrapper: {
    width: '100%',
    height: 120,
    pointerEvents: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 180,
    },
  },
  imgWrapper: {
    width: 148,
    height: 156,
    border: '1px solid #eee6e6',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBlockStart: 16,
  },
  img: {
    width: '80%',
    height: '80%',
  },
  deleteBtnWrapper: {
    position: 'absolute',
    top: 4,
    right: 4,
    background: '#fff',
    boxShadow: '0px 2px 8px 0px rgb(18 38 63 / 10%)',
    display: 'flex',
    padding: 6,
    border: '1px solid #c8c0c0',
    borderRadius: '100%',
    '& .MuiSvgIcon-root': {
      display: 'flex',
      cursor: 'pointer',
      fontSize: 16,
    },
    '&:hover': {
      background: '#e4dede59',
    },
  },
  error: {
    '& .MuiTypography-root': {
      color: '#ff2020',
      marginBlockStart: 4,
    },
  },
}))

export default useStyles
