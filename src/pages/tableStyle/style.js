import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  zoneWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 12,
    flexWrap: 'wrap',
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 20,
    rowGap: 8,
    flexWrap: 'wrap',
  },
  title: {
    '& .MuiTypography-root': {
      fontSize: 20,
      fontWeight: 600,
    },
  },
  countWrapper: {
    '& .MuiTypography-root': {
      background: '#EFF5FF',
      fontSize: 20,
      fontWeight: 500,
      padding: 10,
      borderRadius: 8,
      color: '#0E5EFA',
    },
  },
  zoneContainer: {
    width: 300,
  },
  tableWrapper: {
    paddingBlock: 20,
    '& .MuiTypography-root': {
      color: '#000',
    },
  },
  rowPadding: {
    paddingBlock: 24,
  },
  orderId: {
    '& .MuiTypography-root': {
      color: '#0E5EFA',
      textDecoration: 'underline',
    },
  },
  cursor: {
    cursor: 'pointer',
  },
  padding: {
    paddingBlockStart: 6,
  },
  timeWrapper: {
    '& .MuiTypography-root': {
      background: '#EFF5FF',
      paddingBlock: 4,
      paddingInline: 2,
      color: '#0E5EFA',
      textAlign: 'center',
      borderRadius: 4,
    },
  },
  linkText: {
    '& .MuiTypography-root': {
      color: '#0E5EFA',
    },
  },
  redText: {
    '& .MuiTypography-root': {
      color: '#D62020',
    },
  },
  greenText: {
    '& .MuiTypography-root': {
      color: '#129A43',
    },
  },
  blackText: {
    '& .MuiTypography-root': {
      color: '#000',
    },
  },
  paidStatus: {
    '& .MuiTypography-root': {
      color: '#129A43',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
  unPaidStatus: {
    '& .MuiTypography-root': {
      color: '#D62020',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
  redStatus: {
    '& .MuiTypography-root': {
      color: '#D62020',
      paddingBlock: 5,
      paddingInline: 14,
      background: '#FFDADA',
      borderRadius: 20,
      fontSize: 14,
    },
  },
  orangeStatus: {
    '& .MuiTypography-root': {
      color: '#FF6C19',
      paddingBlock: 5,
      paddingInline: 14,
      background: '#FFE2D1',
      borderRadius: 20,
      fontSize: 14,
    },
  },
  blueStatus: {
    '& .MuiTypography-root': {
      color: '#EFF5FF',
      paddingBlock: 5,
      paddingInline: 14,
      background: '#0E5EFA',
      borderRadius: 20,
      fontSize: 14,
    },
  },
  lightBlueStatus: {
    '& .MuiTypography-root': {
      color: '#0E5EFA',
      paddingBlock: 5,
      paddingInline: 14,
      background: '#EFF5FF',
      borderRadius: 20,
      fontSize: 14,
    },
  },
  greenStatus: {
    '& .MuiTypography-root': {
      color: '#129A43',
      paddingBlock: 5,
      paddingInline: 14,
      background: '#EDFFED',
      borderRadius: 20,
      fontSize: 14,
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
      backgroundColor: '#FFFFFF',
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
  verifyText: {
    '& .MuiTypography-root': {
      color: '#129A43',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  ratings: {
    '& .MuiTypography-root': {
      background: '#0F831A',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      paddingBlock: 4,
      paddingInline: 12,
      borderRadius: 4,
      gap: 4,
      fontSize: 13,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 13,
    },
  },
  imgNameWrapper: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
  },
  imgSize: {
    width: 44,
    height: 44,
    borderRadius: 5,
  },
  addBtn: {
    '& .MuiButton-root': {
      backgroundColor: theme.palette.custom.main,
      color: '#fff',
      fontSize: 14,
      padding: '8px 24px',
      '&:hover': {
        backgroundColor: '#0556f5',
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: 18,
    },
  },
  grayBtn: {
    '& .MuiButton-root': {
      backgroundColor: 'red',
      color: '#fff',
      fontSize: 14,
      padding: '8px 24px',
      '&:hover': {
        backgroundColor: '#0556f5',
      },
    },
  },
  iconsWrapper: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
  },
  editIcon: {
    width: 36,
    height: 32,
    backgroundColor: '#EFF5FF',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  deleteIcon: {
    width: 36,
    height: 32,
    backgroundColor: '#FFDADA',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  editImg: {
    width: 18,
    height: 18,
  },
  deleteImg: {
    width: 18,
    height: 18,
  },
}))

export default useStyles
