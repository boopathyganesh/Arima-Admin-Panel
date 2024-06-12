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
    },
  },
  tabWrapper: {
    background: '#fff',
    borderRadius: 5,
    marginBlockStart: 20,
    paddingBlock: 20,
    paddingInline: 20,
    '& .MuiTab-root': {
      marginInlineEnd: 20,
      textTransform: 'capitalize',
      padding: '12px 14px 12px 14px',
      fontSize: 14,
      fontWeight: 500,
      transition: 'all ease .3s',
      backgroundColor: '#F9F8F8',
      color: '#4D4E4E',
      borderRadius: 5,
    },
    '& .MuiTabs-indicator': {
      height: 0,
    },
    '& .Mui-selected': {
      color: '#fff !important',
      backgroundColor: theme.palette.custom.main,
    },
  },
}))

export default useStyles
