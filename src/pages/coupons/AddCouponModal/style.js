import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {},

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
}))

export default useStyles
