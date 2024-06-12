import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    height: '100vh',
    alignItems: 'center',
  },
  label: {
    '& .MuiTypography-root': {
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
    },
  },
  btn: {
    paddingBlockStart: 20,
  },
}))

export default useStyles
