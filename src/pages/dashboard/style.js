import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
  },
  ordersCardWrapper: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
  },
  ordersCard: {
    width: 220,
    minHeight: 112,
    background: '#fff',
    borderRadius: 5,
    paddingInline: 12,
    paddingBlock: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    [theme.breakpoints.down('lg')]: {
      width: 212,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'flex-start',
    },
  },
  orderCountImgWrapper: {
    width: 60,
    height: 60,
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderCountImg: {
    width: 25,
    height: 28,
  },
  ordersCount: {
    '& .MuiTypography-root': {
      fontFamily: 'Nunito Sans, sans-serif',
      fontWeight: 600,
      paddingBlockStart: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  graphWrapper: {
    paddingBlock: 20,
    display: 'flex',
    gap: 16,
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
    },
  },
  section1Wrapper: {
    display: 'flex',
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  cardContainer: {
    paddingBlock: 16,
    paddingInline: 16,
    background: '#fff',
    borderRadius: 5,
    height: '100%',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 12,
    // '& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
    //   {
    //     borderRadius: 10,
    //   },
  },
  customOutline: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: 20,
    },
    '& .MuiOutlinedInput-root': {
      fontSize: 16,
    },
  },
  cardHeaderLabel: {
    '& .MuiTypography-root': {
      fontWeight: 600,
    },
  },
  cardLabelContainer: {
    paddingBlockStart: 12,
  },
  cardLabelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 8,
    paddingBlockEnd: 12,
  },
  summaryCount: {
    '& .MuiTypography-root': {
      fontFamily: 'Nunito Sans, sans-serif',
      padding: 8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      fontWeight: 600,
      minWidth: 88,
    },
  },
}))

export default useStyles
