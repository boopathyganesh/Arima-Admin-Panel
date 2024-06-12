import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 32,
  },
  fieldWrapper: {
    display: 'flex',
    columnGap: 16,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  uploadContainer: {
    display: 'flex',
    columnGap: 16,
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
    },
  },
  timeWrapper: {
    display: 'flex',
    columnGap: 16,
  },
  input: {
    paddingBlockEnd: 16,
  },
  holidayWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
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
    objectFit: 'cover',
  },
  deleteBtnWrapper: {
    position: 'absolute',
    top: 4,
    right: 4,
    background: '#fff',
    // boxShadow: '0px 10px 20px 0px rgba(18, 38, 63, 0.03),
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
  btn: {
    paddingBlockStart: 12,
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiButton-root': {
      backgroundColor: theme.palette.custom.main,
      color: '#fff',
      fontSize: 16,
      padding: '8px 40px',
      '&:hover': {
        backgroundColor: '#0556f5',
      },
    },
  },
  timeLabel: {
    '& .MuiTypography-root': {
      color: '#4D4E4E',
      paddingBlockEnd: 16,
    },
  },
  subTitle: {
    '& .MuiTypography-root': {
      color: theme.palette.custom.main,
      paddingBlockEnd: 16,
      fontWeight: 500,
    },
  },
  label: {
    '& .MuiTypography-root': {
      paddingBlockEnd: 16,
      fontWeight: 500,
    },
  },
  btnWrapper: {
    display: 'flex',
    gap: 20,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  skipBtn: {
    '& .MuiButton-root': {
      backgroundColor: '#F9F8F8',
      color: '#4D4E4E',
      fontSize: 16,
      padding: '8px 40px',
      '&:hover': {
        backgroundColor: '#F9F8F8',
      },
    },
  },
  saveBtn: {
    '& .MuiButton-root': {
      backgroundColor: theme.palette.custom.main,
      color: '#fff',
      fontSize: 16,
      padding: '8px 40px',
      '&:hover': {
        backgroundColor: '#0556f5',
      },
    },
  },
  purchaseBtn: {
    display: 'flex',
    justifyContent: 'center',
    paddingBlockStart: 8,
    '& .MuiButton-root': {
      backgroundColor: theme.palette.custom.main,
      fontSize: 14,
      padding: '8px 20px',
      display: 'flex',
      gap: 4,
      '&:hover': {
        backgroundColor: '#0556f5',
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: 16,
    },
  },
  purchasedBtn: {
    display: 'flex',
    justifyContent: 'center',
    paddingBlockStart: 8,
    '& .MuiButton-root': {
      backgroundColor: '#129A43',
      fontSize: 14,
      padding: '8px 20px',
      display: 'flex',
      gap: 4,
      '&:hover': {
        backgroundColor: '#129A43',
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: 16,
    },
  },
}))

export default useStyles
