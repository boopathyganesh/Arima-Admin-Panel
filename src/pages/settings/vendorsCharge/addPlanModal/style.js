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
  addBtn: {
    '& .MuiTypography-root': {
      color: theme.palette.custom.main,
      cursor: 'pointer',
    },
  },
  error: {
    '& .MuiTypography-root': {
      color: '#ff2020',
      marginBlockStart: 4,
    },
  },
  featuresWrapper: {
    paddingBlockStart: 12,
  },
  featureContainer: {
    paddingBlockEnd: 16,
    display: 'flex',
    gap: 10,
    '& .MuiTypography-root': {},
  },
  checkIcon: {
    '& .MuiSvgIcon-root': {
      color: '#fff',
      backgroundColor: '#129A43',
      borderRadius: '100%',
      padding: 4,
      fontSize: 22,
    },
  },
  clearIcon: {
    '& .MuiSvgIcon-root': {
      color: theme.palette.error.main,
      fontSize: 22,
      cursor: 'pointer',
    },
  },
}))

export default useStyles
