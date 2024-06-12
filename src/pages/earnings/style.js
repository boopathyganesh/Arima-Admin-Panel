import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
  },
  cardWrapper: {
    paddingBlockStart: 16,
    display: 'flex',
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  card: {
    backgroundColor: '#fff',
    minHeight: 132,
    borderRadius: 5,
    paddingInline: 16,
    paddingBlock: 16,
  },
  padding: {
    paddingBlock: 20,
  },
  cardSectionWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    [theme.breakpoints.down('lg')]: {
      width: 212,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'flex-start',
    },
  },
  countImgWrapper: {
    width: 60,
    height: 60,
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countImg: {
    width: 25,
    height: 28,
  },
  count: {
    '& .MuiTypography-root': {
      fontFamily: 'Nunito Sans, sans-serif',
      fontWeight: 600,
      paddingBlockStart: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
}))

export default useStyles
