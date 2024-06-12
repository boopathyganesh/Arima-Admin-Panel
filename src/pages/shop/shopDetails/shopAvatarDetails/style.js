import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
    background: '#fff',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 12,
    marginBlockStart: 20,
  },
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
    '& .MuiAvatar-root': {
      width: 88,
      height: 88,
    },
  },
  id: {
    '& .MuiTypography-root': {
      fontWeight: 300,
      paddingBlockStart: 4,
    },
  },
  activeStatus: {
    '& .MuiTypography-root': {
      backgroundColor: '#E9FFF1',
      color: '#129A43',
      borderRadius: 30,
      paddingBlock: 8,
      paddingInline: 20,
      display: 'inline-flex',
      justifyContent: 'center',
      marginBlockStart: 4,
    },
  },
}))

export default useStyles
