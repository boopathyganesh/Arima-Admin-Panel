import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
  },
  container: {
    marginBlock: 20,
    paddingBlock: 20,
    paddingInline: 20,
    borderRadius: 5,
    background: '#fff',
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
}))

export default useStyles
