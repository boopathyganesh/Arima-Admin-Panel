import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
    marginBlockStart: 20,
    background: '#fff',
    borderRadius: 5,
    // height: '100%',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 12,
  },
  customOutline: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: 20,
    },
    '& .MuiOutlinedInput-root': {
      fontSize: 14,
    },
  },
  cardHeaderLabel: {
    '& .MuiTypography-root': {
      fontWeight: 600,
    },
  },
  earningsWrapper: {
    paddingBlock: 16,
  },
  earningsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 12,
    paddingBlock: 16,
    borderBottom: '1px dashed #E1E3E8',
  },
  earningCaptions: {
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
  },
  earningNumber: {
    '& .MuiTypography-root': {
      borderRadius: 5,
      paddingBlock: 8,
      paddingInline: 16,
      minWidth: 68,
      textAlign: 'center',
    },
  },
}))

export default useStyles
