import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
    background: '#fff',
    borderRadius: 5,
    marginBlockStart: 16,
  },
  title: {
    '& .MuiTypography-root': {
      fontWeight: 500,
      paddingBlockEnd: 12,
    },
  },
  labelWrapper: {
    paddingBlock: 6,
  },
  timeWrapper: {
    background: '#E9FFF1',
    paddingBlock: 4,
    paddingInline: 6,
    color: '#129A43',
    textAlign: 'center',
    borderRadius: 4,
  },
  categoryWrapper: {
    background: '#EFF5FF',
    paddingBlock: 4,
    paddingInline: 6,
    color: '#0E5EFA',
    textAlign: 'center',
    borderRadius: 4,
  },
}))

export default useStyles
