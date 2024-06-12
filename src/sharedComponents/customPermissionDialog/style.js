import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    '& .MuiDialog-paper': {},
    '& .MuiDialogContent-root': {
      padding: '26px 34px',
    },
  },
  text: {
    '& .MuiTypography-root': {
      textAlign: 'center',
    },
  },
  btnWrapper: {
    display: 'flex',
    gap: 16,
    paddingBlockStart: 32,
  },
  yesBtnWrapper: {
    '& .MuiButton-root': {
      color: theme.palette.custom.main,
      backgroundColor: '#cbdaf7',
      fontSize: 16,
      padding: '8px 48px',
      '&:hover': {
        backgroundColor: '#bbd0f8',
      },
    },
  },
  noBtnWrapper: {
    '& .MuiButton-root': {
      backgroundColor: theme.palette.custom.main,
      color: '#fff',
      fontSize: 16,
      padding: '8px 48px',
      '&:hover': {
        backgroundColor: '#0556f5',
      },
    },
  },
}))

export default useStyles
