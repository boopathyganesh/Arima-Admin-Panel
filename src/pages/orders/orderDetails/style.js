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
  statusWrapper: {
    width: 300,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  container: {
    marginBlockStart: 16,
    background: '#fff',
    paddingBlock: 12,
    paddingInline: 16,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 12,
  },
  orderIdWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      gap: 0,
      rowGap: 8,
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      width: '100%',
    },
  },
  orderId: {
    '& .MuiTypography-root': {
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
  },
  downloadBtn: {
    '& .MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      background: '#EFF5FF',
      color: '#0E5EFA',
      paddingBlock: 6,
      paddingInline: 16,
      borderRadius: 8,
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
  },
  orderDetailsWrapper: {
    display: 'flex',
    gap: 12,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  detailsContainer: {
    background: '#F4F8FF',
    borderRadius: 5,
    paddingBlock: 12,
    paddingInline: 12,
    width: '100%',
    height: '100%',
  },
  detailsHeaderLabel: {
    '& .MuiTypography-root': {
      fontWeight: 500,
      paddingBlockEnd: 12,
    },
  },
  detailsContainerWrapper: {
    display: 'flex',
    columnGap: 12,
    [theme.breakpoints.down('sm')]: {
      columnGap: 0,
      flexWrap: 'wrap',
    },
  },
  detailsSpacing: {
    paddingBlockEnd: 10,
  },
  greenText: {
    color: '#129A43',
  },
  redText: {
    color: '#D62020',
  },
  greenTime: {
    background: '#E9FFF1',
    color: '#129A43',
    paddingBlock: 2,
    paddingInline: 4,
    borderRadius: 3,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  redTime: {
    background: '#F9EAEA',
    color: '#D62020',
    paddingBlock: 2,
    paddingInline: 4,
    borderRadius: 3,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  // -------------------------------------------------
  tableWrapper: {
    overflowX: 'auto',
    paddingBlock: 20,
    // borderRadius: 15,
    scrollbarWidth: 'thin !important',
  },
  table: {
    borderCollapse: 'collapse',
  },
  header: {
    background: theme.palette.custom.main,
    '& .MuiTypography-root': {
      fontWeight: 500,
      textTransform: 'capitalize',
      color: '#fff',
    },
  },
  snoColumn: {
    minWidth: 60,
    paddingBlock: 12,
    paddingInlineStart: 12,
    textAlign: 'left',
    [theme.breakpoints.down('lg')]: {
      minWidth: 50,
    },
  },
  idColumn: {
    minWidth: 160,
    paddingBlock: 12,
    textAlign: 'left',
    [theme.breakpoints.down('lg')]: {
      minWidth: 160,
    },
  },
  nameColumn: {
    minWidth: 370,
    paddingBlock: 12,
    textAlign: 'left',
    [theme.breakpoints.down('lg')]: {
      minWidth: 340,
    },
  },
  priceColumn: {
    minWidth: 160,
    paddingBlock: 12,
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      minWidth: 140,
    },
  },
  quantityColumn: {
    minWidth: 180,
    paddingBlock: 12,
    textAlign: 'left',
    [theme.breakpoints.down('lg')]: {
      minWidth: 140,
    },
  },
  totalPriceColumn: {
    minWidth: 200,
    paddingBlock: 12,
    textAlign: 'left',
    [theme.breakpoints.down('lg')]: {
      minWidth: 200,
    },
  },
  imgWrapper: {
    width: 74,
    height: 74,
    background: '#F7F7F7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
  },
  productTitle: {
    '& .MuiTypography-root': {
      color: '#12132C',
      paddingInlineStart: 12,
    },
  },
  productQuantity: {
    '& .MuiTypography-root': {
      color: '#9C9191',
      paddingInlineStart: 12,
    },
  },
  quantity: {
    '& .MuiTypography-root': {
      color: '#9C9191',
      textAlign: 'center',
    },
  },
  mrp: {
    '& .MuiTypography-root': {
      color: '#9C9191',
    },
  },
  price: {
    '& .MuiTypography-root': {
      color: '#9C9191',
    },
  },
  subHeader: {
    background: 'rgba(197, 197, 197, 0.2)',
  },
  subTotal: {
    '& .MuiTypography-root': {
      fontWeight: 700,
    },
  },
  totalQuantity: {
    '& .MuiTypography-root': {
      fontWeight: 700,
    },
  },
  billLabel: {
    '& .MuiTypography-root': {
      fontWeight: 500,
      color: theme.palette.custom.main,
    },
  },
}))

export default useStyles
