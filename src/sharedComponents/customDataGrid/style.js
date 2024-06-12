/* eslint-disable no-unused-vars */
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    // paddingBlock: 20,
    '& .MuiDataGrid-root': {
      background: '#fff',
      border: 'none',
    },
    '& .MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
      outline: 'none !important',
    },
    '& .MuiDataGrid-columnHeaders': {
      background: theme.palette.custom.main,
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 500,
      color: '#fff',
      textTransform: 'capitalize',
      //   fontSize: 16,
    },
    '& .MuiDataGrid-iconSeparator ': {
      display: 'none',
    },
    '& .MuiDataGrid-virtualScroller': {
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        height: 6,
      },
    },
    '& .MuiDataGrid-footerContainer': {
      // justifyContent: 'flex-start',
    },
    '& .MuiTablePagination-toolbar': {
      alignItems: 'baseline',
    },
  },
  quickFilter: {
    paddingBlock: 12,
    paddingInline: 20,
    background: theme.palette.custom.homeBg,
    [theme.breakpoints.down('sm')]: {
      paddingInline: 0,
    },
  },
  searchWrapper: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
    },
    '& .MuiSvgIcon-root': {
      color: '#bab8b8',
    },
  },
  filterWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    columnGap: 12,
    rowGap: 12,
    flexWrap: 'wrap',
    '& .MuiButton-root': {
      fontSize: 18,
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
    },
  },
}))

export default useStyles
