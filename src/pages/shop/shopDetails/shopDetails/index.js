import React from 'react'
import useStyles from './style'
import { Typography } from '@mui/material'
import moment from 'moment'

const ShopDetailsComp = ({ data }) => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.root}>
        <div className={classes.title}>
          <Typography variant="body1">Shop Details</Typography>
        </div>
        <div className={classes.labelWrapper}>
          <Typography variant="body2">
            Joined at &nbsp; : &nbsp; {moment(data?.createdAt).format('d MMM yyyy')}{' '}
            <span className={classes.timeWrapper}>
              {moment(data?.createdAt).format('hh:mm a')}
            </span>
          </Typography>
        </div>
        <div className={classes.labelWrapper}>
          <Typography variant="body2">
            Zone &nbsp; : &nbsp; Gandhipuram
          </Typography>
        </div>
        <div className={classes.labelWrapper}>
          <Typography variant="body2">
            Open time &nbsp; : &nbsp; {data?.open_time}
          </Typography>
        </div>{' '}
        <div className={classes.labelWrapper}>
          <Typography variant="body2">
            Close time &nbsp; : &nbsp; {data?.close_time}
          </Typography>
        </div>
        <div className={classes.labelWrapper}>
          <Typography variant="body2">
            Product category &nbsp; : &nbsp;{' '}
            <span className={classes.categoryWrapper}>lights</span>
          </Typography>
        </div>
        <div className={classes.labelWrapper}>
          <Typography variant="body2">
            Address &nbsp; : &nbsp; {data?.shop_address}
          </Typography>
        </div>
        <div className={classes.labelWrapper}>
          <Typography variant="body2">
            Email id &nbsp; : &nbsp; {data?.email}
          </Typography>
        </div>
        <div className={classes.labelWrapper}>
          <Typography variant="body2">
            Mobile number &nbsp; : &nbsp; {data?.phone_number}
          </Typography>
        </div>
      </section>
    </>
  )
}

export default ShopDetailsComp
