import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiDialog-paper': {
      // height: '94vh',
      // width: '90%',
      minHeight: '30vh',
      minWidth: '30%',
      [theme.breakpoints.down('lg')]: {
        minHeight: '34vh',
        minWidth: '40%',
      },
      [theme.breakpoints.down('md')]: {
        minWidth: '60%',
      },
      [theme.breakpoints.down('sm')]: {
        minWidth: '84%',
      },
    },
  },
  root: {
    '& .MuiDialogTitle-root': {
      backgroundColor: '#EFF5FF',
      color: theme.palette.custom.main,
      padding: '8px 20px',
    },
    '& .MuiDialogTitle-root+.MuiDialogContent-root ': {
      paddingTop: 20,
    },
    '& .MuiDialogContent-root': {
      padding: '20px 20px',
    },
    '& .MuiDialogActions-root': {
      paddingInlineEnd: 24,
    },
  },
  dialogTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.custom.main,
    fontWeight: '500',
  },
  closeIcon: {
    color: '#000',
  },
  btnWrapper: {
    display: 'flex',
    gap: 20,
  },
  closeBtn: {
    '& .MuiButtonBase-root': {
      backgroundColor: '#e5e5e5',
      textTransform: 'capitalize',
      color: '#000',
      borderRadius: 20,
      padding: '6px 20px',
      '&:hover': {
        backgroundColor: '#e5e5e5',
      },
    },
  },
}))

export default useStyles
