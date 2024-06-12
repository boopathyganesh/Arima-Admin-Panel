import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
  },
  dueBtn: {
    paddingBlockStart: 16,
    '& .MuiTypography-root': {
      backgroundColor: '#129A43',
      paddingBlock: 10,
      paddingInline: 12,
      color: '#fff',
      borderRadius: 5,
      display: 'inline-flex',
    },
  },
}))

export default useStyles
