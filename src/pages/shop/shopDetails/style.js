import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
  },
  title: {
    '& .MuiTypography-root': {
      fontSize: 20,
      fontWeight: 600,
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      cursor: 'pointer',
    },
    '& .MuiSvgIcon-root': {
      fontSize: 18,
    },
  },
  detailsWrapper: {
    display: 'flex',
    gap: 16,
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
      gap: 0,
    },
  },
}))

export default useStyles
