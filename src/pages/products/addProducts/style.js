import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
  },
  title: {
    '& .MuiTypography-root': {
      fontSize: 20,
      fontWeight: 600,
    },
  },
  tabWrapper: {
    borderRadius: 5,
    marginBlockStart: 20,
    paddingBlock: 20,
    paddingInline: 20,
    '& .MuiTab-root': {
      marginInlineEnd: 20,
      textTransform: 'capitalize',
      padding: '12px 14px 12px 14px',
      fontSize: 14,
      fontWeight: 500,
      transition: 'all ease .3s',
      backgroundColor: '#fff',
      color: '#4D4E4E',
      borderRadius: 5,
    },
    '& .MuiTabs-indicator': {
      height: 0,
    },
    '& .Mui-selected': {
      color: '#fff !important',
      backgroundColor: theme.palette.custom.main,
    },
  },
  tabWrapperVariant: {
    borderRadius: 5,
    '& .MuiTab-root': {
      marginInlineEnd: 20,
      textTransform: 'capitalize',
      padding: '12px 14px 12px 14px',
      fontSize: 14,
      fontWeight: 500,
      transition: 'all ease .3s',
      backgroundColor: '#F9F8F8',
      color: '#4D4E4E',
      borderRadius: 5,
    },
    '& .MuiTabs-indicator': {
      height: 0,
    },
    '& .Mui-selected': {
      color: '#fff !important',
      backgroundColor: theme.palette.custom.main,
    },
  },
  container: {
    marginBlock: 20,
    paddingBlock: 20,
    paddingInline: 20,
    borderRadius: 5,
    background: '#fff',
  },
  fieldWrapper: {
    display: 'flex',
    columnGap: 16,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  input: {
    paddingBlockEnd: 16,
  },
  infoLabel: {
    '& .MuiTypography-root': {
      color: '#4D4E4E',
      paddingBlockEnd: 16,
    },
  },
  uploadWrapper: {
    width: '100%',
    height: 120,
    [theme.breakpoints.down('sm')]: {
      height: 180,
    },
  },
  disableWrapper: {
    width: '100%',
    height: 120,
    pointerEvents: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 180,
    },
  },
  imgWrapper: {
    width: 148,
    height: 156,
    border: '1px solid #eee6e6',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBlockStart: 16,
  },
  img: {
    width: '80%',
    height: '80%',
  },
  deleteBtnWrapper: {
    position: 'absolute',
    top: 4,
    right: 4,
    background: '#fff',
    boxShadow: '0px 2px 8px 0px rgb(18 38 63 / 10%)',
    display: 'flex',
    padding: 6,
    border: '1px solid #c8c0c0',
    borderRadius: '100%',
    '& .MuiSvgIcon-root': {
      display: 'flex',
      cursor: 'pointer',
      fontSize: 16,
    },
    '&:hover': {
      background: '#e4dede59',
    },
  },
  error: {
    '& .MuiTypography-root': {
      color: '#ff2020',
      marginBlockStart: 4,
    },
  },
  variantBtn: {
    paddingBlockStart: 12,
    '& .MuiButton-root': {
      backgroundColor: '#EFF5FF',
      color: theme.palette.custom.main,
      fontSize: 16,
      padding: '10px 32px',
      '&:hover': {
        backgroundColor: '#e2ebfa',
      },
    },
  },
  btn: {
    paddingBlockStart: 12,
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiButton-root': {
      backgroundColor: theme.palette.custom.main,
      color: '#fff',
      fontSize: 16,
      padding: '8px 40px',
      '&:hover': {
        backgroundColor: '#0556f5',
      },
    },
  },
  wrapper: {
    paddingBlock: 20,
  },
  table: {
    '& .MuiTableHead-root': {
      background: '#f4f4f4',
    },
  },
  variantImgWrapper: {
    width: 48,
    height: 48,
    borderRadius: 5,
  },
  removeIcon: {
    cursor: 'pointer',
    '& .MuiSvgIcon-root': {
      color: '#e61212',
      fontSize: 24,
    },
  },
  variantColor: {
    display: 'flex',
    justifyContent: 'center',
  },
  productTitle: {
    '& .MuiTypography-root': {
      fontWeight: 600,
      paddingBlockEnd: 20,
      textTransform: 'capitalize',
    },
  },
  productContainer: {
    backgroundColor: '#fff',
    // marginBlock: 20,
    // marginInline: 20,
    borderRadius: 5,
  },
}))

export default useStyles
