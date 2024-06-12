import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlockStart: 20,
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLabel: {
    '& .MuiTypography-root': {
      fontWeight: 600,
    },
  },
  headerLink: {
    '& .MuiTypography-root': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
    marginBlockStart: 16,
    background: '#fff',
    '& .MuiTableHead-root': {
      backgroundColor: theme.palette.custom.main,
    },
  },
  tableHead: {
    '& .MuiTableCell-root': {
      color: '#fff',
      padding: 12,
    },
  },
  lightGreenStatus: {
    '& .MuiTypography-root': {
      background: '#EDFFED',
      color: '#129A43',
      paddingInline: 12,
      paddingBlock: 6,
      borderRadius: 20,
    },
  },
}))

export default useStyles
