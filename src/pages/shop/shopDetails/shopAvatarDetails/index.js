import React from 'react'
import useStyles from './style'
import { Typography, Avatar } from '@mui/material';
import { imageUrl } from 'constants';

const ShopAvatarDetails = ({ data }) => {
  const classes = useStyles();


  return (
    <>
      <section className={classes.root}>
        <section className={classes.avatarWrapper}>
          <Avatar src={`${imageUrl}/${data?.shop_image}`} alt={'shop'} />
          <div>
            <Typography variant="body1">{data?.shop_name}</Typography>
            <div className={classes.id}>
              <Typography variant="body2">ID : {data?.shop_id}</Typography>
            </div>
            <div className={classes.activeStatus}>
              <Typography variant="body2">{data?.status === 1 ? "Active" : "Not Active"}</Typography>
            </div>
          </div>
        </section>
        <section>
          <Typography variant="body1">GST Number : {data?.gst_number}</Typography>
        </section>
      </section>
    </>
  )
}

export default ShopAvatarDetails
