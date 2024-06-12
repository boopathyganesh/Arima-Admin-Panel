import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
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
  cardsWrapper: {
    display: 'flex',
    gap: 16,
    marginBlockStart: 20,
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
    },
  },
  cardContainer: {
    paddingBlock: 16,
    paddingInline: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
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
  ordersWrapper: {
    display: 'flex',
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
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
      color: theme.palette.custom.main,
    },
  },
  ordersCardWrapper: {
    display: 'flex',
    gap: 16,
  },
  infoLabel: {
    '& .MuiTypography-root': {
      fontWeight: 600,
      paddingBlockStart: 16,
    },
  },
}))

export default useStyles
