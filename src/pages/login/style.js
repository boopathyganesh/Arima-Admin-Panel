import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflowY: 'auto',
    paddingBlock: 16,
    paddingInline: 16,
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  img: {
    width: '100%',
    height: '100%',
  },
  fieldContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldWrapper: {
    width: '100%',
  },
  signInTxt: {
    '& .MuiTypography-root': {
      fontWeight: 700,
      textAlign: 'center',
      // [theme.breakpoints.down('sm')]: {
      //   fontSize: 32,
      // },
    },
  },
  forgotTxt: {
    '& .MuiTypography-root': {
      fontWeight: 700,
      textAlign: 'center',
      // fontSize: 30,
      // [theme.breakpoints.down('md')]: {
      //   fontSize: 28,
      // },
      // [theme.breakpoints.down('sm')]: {
      //   fontSize: 24,
      // },
    },
  },
  inputsContainer: {
    width: '100%',
    paddingBlockStart: 36,
    paddingBlockEnd: 12,
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    paddingBlockEnd: 20,
  },
  password: {
    cursor: 'pointer',
  },
  forgotLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiTypography-root': {
      cursor: 'pointer',
      textAlign: 'right',
      paddingBlockEnd: 28,
      display: 'inline-flex',
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
  },
  btn: {
    '& .MuiButton-root': {
      padding: '14px 22px',
    },
  },
  captionLabel: {
    display: 'flex',
    justifyContent: 'center',
    '& .MuiTypography-root': {
      cursor: 'pointer',
      textAlign: 'center',
      paddingBlockStart: 28,
      display: 'inline-flex',
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
  },
  forgotTxtCaption: {
    color: '#333333',
    paddingBlockStart: 12,
    '& .MuiTypography-root': {
      textAlign: 'center',
    },
  },
  bold: {
    fontWeight: 600,
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBlockEnd: 20,
  },
  otpError: {
    color: theme.palette.error.main,
    textAlign: 'center',
    paddingBlock: 4,
  },
}))

export default useStyles
