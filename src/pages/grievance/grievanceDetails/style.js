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
  container: {
    marginBlockStart: 20,
  },
  cardContainer: {
    paddingBlock: 16,
    paddingInline: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
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
  cardWrapper: {
    display: 'flex',
    gap: 16,
  },

  infoLabel: {
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
  },
  infoWrapper: {
    paddingBlockStart: 12,
  },
  greenTime: {
    background: '#E9FFF1',
    color: '#129A43',
    paddingBlock: 2,
    paddingInline: 4,
    borderRadius: 3,
    whiteSpace: 'nowrap',
  },
  orderId: {
    '& .MuiTypography-root': {
      color: '#0E5EFA',
      textDecoration: 'underline',
    },
  },
  imgWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    paddingBlockStart: 16,
  },
  img: {
    width: 84,
    height: 84,
    cursor: 'pointer',
  },
  cardHeight: {
    height: '100%',
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBlockStart: 20,
    '& .MuiButton-root': {
      backgroundColor: theme.palette.custom.main,
      color: '#fff',
      fontSize: 14,
      padding: '8px 24px',
      '&:hover': {
        backgroundColor: '#0556f5',
      },
    },
  },
}))

export default useStyles
