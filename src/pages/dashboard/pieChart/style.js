import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  progressContainer: {
    paddingBlockStart: 12,
    paddingBlockEnd: 16,
    borderBottom: '1px dashed #E1E3E8',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  salesProgress: {
    '& .MuiCircularProgress-root': {
      color: theme.palette.custom.main,
      width: '54px !important',
      height: '54px !important',
    },
  },
  incomeProgress: {
    '& .MuiCircularProgress-root': {
      color: '#129A43',
      width: '54px !important',
      height: '54px !important',
    },
  },
  progressTitle: {
    '& .MuiTypography-root': {
      fontWeight: 600,
    },
  },
  progressPercent: {
    '& .MuiTypography-root': {
      color: '#838383',
      paddingBlockStart: 2,
    },
  },
  chartWrapper: {
    paddingBlockStart: 16,
    paddingInline: 48,
    display: 'flex',
    justifyContent: 'center',
  },
  chartContainer: {
    width: '100%',
    height: 'auto',
    [theme.breakpoints.down('lg')]: {
      width: '80%',
      height: 280,
      display: 'flex',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
  },
}))

export default useStyles
