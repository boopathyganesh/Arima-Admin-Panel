import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: 20,
    paddingInline: 20,
  },
  container: {
    paddingInline: 20,
    paddingBlock: 20,
    marginBlock: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  label: {
    '& .MuiTypography-root': {
      fontWeight: 500,
      paddingBlockEnd: 20,
    },
  },
  planWrapper: {
    display: 'flex',
    gap: 20,
  },
  planContainer: {
    backgroundColor: '#FBFBFB',
    paddingBlock: 20,
    paddingInline: 16,
    borderRadius: 20,
    height: '100%',
  },
  title: {
    '& .MuiTypography-root': {
      textAlign: 'center',
      color: '#4D4D4D',
      fontWeight: 600,
    },
  },
  price: {
    '& .MuiTypography-root': {
      textAlign: 'center',
      fontWeight: 600,
      paddingBlockStart: 12,
      fontFamily: 'Nunito Sans, sans-serif',
    },
  },
  themeColor: {
    color: theme.palette.custom.main,
  },
  validityLabel: {
    fontSize: 12,
  },
  planCaption: {
    '& .MuiTypography-root': {
      textAlign: 'center',
      paddingBlockStart: 12,
      fontWeight: 500,
    },
  },
  discountWrapper: {
    display: 'flex',
    justifyContent: 'center',
    '& .MuiTypography-root': {
      backgroundColor: '#FFBB00',
      borderRadius: 5,
      paddingBlock: 6,
      paddingInline: 10,
      marginBlockStart: 12,
    },
  },
  divider: {
    paddingBlockStart: 20,
    '& .MuiDivider-root': {
      borderColor: '#D4D4D4',
    },
  },
  featuresWrapper: {
    paddingBlockStart: 20,
  },
  featureContainer: {
    paddingBlockEnd: 16,
    '& .MuiTypography-root': {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
    },
    '& .MuiSvgIcon-root': {
      color: '#fff',
      backgroundColor: '#129A43',
      borderRadius: '100%',
      padding: 4,
      fontSize: 22,
    },
  },
}))

export default useStyles
