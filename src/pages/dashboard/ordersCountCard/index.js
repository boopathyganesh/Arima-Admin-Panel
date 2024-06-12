import React from 'react'
import useStyles from '../style'
import { Typography } from '@mui/material'

const OrdersCountCard = (props) => {
  const { ordersCountList, ordersData } = props
  const classes = useStyles();

  const pendingOrders = ordersData.filter((data) => data.orderStatus === 'PENDING');
  const processingOrders = ordersData.filter((data) => data.orderStatus === 'PROCESSING');
  const readyOrders = ordersData.filter((data) => data.orderStatus === 'READY');
  const deliveredOrders = ordersData.filter((data) => data.orderStatus === 'DELIVERED');
  return (
    <>
      <section className={classes.ordersCardWrapper}>
        {/* {ordersCountList?.map((data) => ( */}
        <div className={classes.ordersCard}>
          <div
            className={classes.orderCountImgWrapper}
            style={{ background: '#EDFFED' }}
          >
            <img
              src='assets/images/dashboard/order1.png'
              // alt={data?.label}
              className={classes.orderCountImg}
            />
          </div>
          <div>
            <Typography variant="body1">Total Orders</Typography>
            <div className={classes.ordersCount}>
              <Typography variant="h6">{ordersData?.length}</Typography>
            </div>
          </div>
        </div>
        <div className={classes.ordersCard}>
          <div
            className={classes.orderCountImgWrapper}
            style={{ background: '#EDFFED' }}
          >
            <img
              src='assets/images/dashboard/order2.png'
              // alt={data?.label}
              className={classes.orderCountImg}
            />
          </div>
          <div>
            <Typography variant="body1">Pending</Typography>
            <div className={classes.ordersCount}>
              <Typography variant="h6">{pendingOrders?.length}</Typography>
            </div>
          </div>
        </div>
        <div className={classes.ordersCard}>
          <div
            className={classes.orderCountImgWrapper}
            style={{ background: '#EDFFED' }}
          >
            <img
              src='assets/images/dashboard/order3.png'
              // alt={data?.label}
              className={classes.orderCountImg}
            />
          </div>
          <div>
            <Typography variant="body1">PROCESSING</Typography>
            <div className={classes.ordersCount}>
              <Typography variant="h6">{processingOrders?.length}</Typography>
            </div>
          </div>
        </div>
        <div className={classes.ordersCard}>
          <div
            className={classes.orderCountImgWrapper}
            style={{ background: '#EDFFED' }}
          >
            <img
              src='assets/images/dashboard/order4.png'
              // alt={data?.label}
              className={classes.orderCountImg}
            />
          </div>
          <div>
            <Typography variant="body1">Ready</Typography>
            <div className={classes.ordersCount}>
              <Typography variant="h6">{readyOrders?.length}</Typography>
            </div>
          </div>
        </div>
        <div className={classes.ordersCard}>
          <div
            className={classes.orderCountImgWrapper}
            style={{ background: '#EDFFED' }}
          >
            <img
              src='assets/images/dashboard/order5.png'
              // alt={data?.label}
              className={classes.orderCountImg}
            />
          </div>
          <div>
            <Typography variant="body1">Delivered</Typography>
            <div className={classes.ordersCount}>
              <Typography variant="h6">{deliveredOrders?.length}</Typography>
            </div>
          </div>
        </div>
        {/* ))} */}
      </section>
    </>
  )
}

export default OrdersCountCard
