import useStyles from './style'
import { Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <>
      <Grid container flexDirection={'column'} className={classes.root}>
        <Grid item className={classes.label}>
          <Typography variant="h2">404 Page Not Found...!</Typography>
        </Grid>
        <Grid item>
          <div className={classes.btn}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/')}
            >
              Go back to home
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default PageNotFound
