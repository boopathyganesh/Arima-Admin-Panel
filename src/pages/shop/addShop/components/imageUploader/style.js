import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    border: '1px dashed #E2E2E2',
    borderRadius: 5,
    paddingBlock: 12,
    paddingInline: 16,
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    '& .MuiSvgIcon-root': {
      color: theme.palette.custom.main,
      fontSize: 40,
    },
  },
  header: {
    '& .MuiTypography-root': {
      color: '#4D4E4E',
    },
  },
  caption: {
    '& .MuiTypography-root': {
      color: '#4D4E4E',
      paddingBlockStart: 2,
      fontWeight: 300,
    },
  },
  btn: {
    '& .MuiButton-root': {
      backgroundColor: '#F9F8F8',
      color: '#4D4E4E',
      '&:hover': {
        backgroundColor: '#e3dede',
      },
    },
  },
}))

export default useStyles
