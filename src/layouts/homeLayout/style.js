import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  children: {
    position: 'relative',
    top: theme.palette.custom.headerHeight,
    left: theme.palette.custom.sidebarWidth,
    width: `calc(100% - ${theme.palette.custom.sidebarWidth}px)`,
    overflow: 'auto',
    height: `calc(100vh - ${theme.palette.custom.headerHeight}px)`,
    background: theme.palette.custom.homeBg,
    [theme.breakpoints.down('md')]: {
      left: 0,
      right: 0,
      width: '100%',
    },
  },
}))

export default useStyles
