import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    '& .MuiDialog-paper': {
      height: '84vh',
      width: '50%',
      [theme.breakpoints.down('lg')]: {
        height: '90vh',
        width: '60%',
      },
      [theme.breakpoints.down('md')]: {
        width: '76%',
      },
      [theme.breakpoints.down('sm')]: {
        height: '96vh',
        width: '96%',
      },
    },
  },
  detailsContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 7,
    paddingBlock: 20,
    paddingInline: 16,
    marginBlockEnd: 20,
  },
  detailsKey: {
    fontWeight: 600,
  },
  detailsValue: {
    color: '#4D4E4E',
  },
  detailsWrapper: {
    paddingBlockEnd: 12,
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
}))

export default useStyles
