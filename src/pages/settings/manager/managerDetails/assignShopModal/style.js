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
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      rowGap: 12,
    },
  },
  fieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      rowGap: 12,
    },
  },
  shopsContainer: {
    marginBlockStart: 20,
    backgroundColor: '#F9F8F8',
    borderRadius: 12,
    paddingBlock: 20,
    paddingInline: 20,
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: 20,
  },
  shopWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 12,
  },
  shopInfoWrapper: {
    display: 'flex',
    gap: 12,
  },
  shopImg: {
    width: 64,
    height: 56,
    borderRadius: 4,
  },
  btn: {
    minWidth: 120,
    '& .MuiButton-root': {
      padding: '8px 20px',
    },
  },
}))

export default useStyles
