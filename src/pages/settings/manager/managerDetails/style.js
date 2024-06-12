import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 12,
  },
  headerLabel: {
    '& .MuiTypography-root': {
      fontWeight: 600,
      fontSize: 20,
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      cursor: 'pointer',
    },
    '& .MuiSvgIcon-root': {
      fontSize: 18,
    },
  },
  cardContainer: {
    marginBlockStart: 20,
    paddingBlock: 16,
    paddingInline: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    minHeight: 114,
  },
  avatarWrapper: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 16,
    '& .MuiAvatar-root': {
      width: 74,
      height: 74,
    },
  },
  padding: {
    paddingBlockStart: 6,
  },
}))

export default useStyles
