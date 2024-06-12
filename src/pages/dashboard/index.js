import React, { useEffect, useState } from 'react'
import useStyles from './style'
import { Grid, Typography, Select, FormControl, MenuItem } from '@mui/material'
import { numberToIndianSystem } from 'utils/numberToIndianRupee'
import OrdersCountCard from './ordersCountCard'
import OrdersSummary from './ordersSummary'
import RevenueChart from './revenueChart'
import OrdersTable from './ordersTable'
import PieChart from './pieChart';
import { getAllOrders } from 'redux/slices/orders/orderSlice';
import { useDispatch, useSelector } from 'redux/store';

const ordersCountList = [
  {
    label: 'Total Orders',
    count: 2105731,
    background: '#EFF5FF',
    icon: '/assets/images/dashboard/order1.png',
  },
  {
    label: 'Processing',
    count: 2105731,
    background: '#FFF2EF',
    icon: '/assets/images/dashboard/order2.png',
  },
  {
    label: 'Pending',
    count: 309,
    background: '#EDFFED',
    icon: '/assets/images/dashboard/order3.png',
  },
  {
    label: 'Picked Up',
    count: 57,
    background: '#E0FBFF',
    icon: '/assets/images/dashboard/order4.png',
  },
  {
    label: 'Ready Orders',
    count: 507,
    background: '#E3E1FFA3',
    icon: '/assets/images/dashboard/order5.png',
  },
]

const ordersSummaryList = [
  {
    label: 'Delivered',
    count: 2105731,
    background: '#EFF5FF',
    color: '#0E5EFA',
  },
  {
    label: 'Cancelled',
    count: 10,
    background: '#FFD9D9',
    color: '#D62020',
  },
  {
    label: 'Request Rejected ',
    count: 199,
    background: '#FFF2EF',
    color: '#FF7D58',
  },
  {
    label: 'Refunded',
    count: 37,
    background: '#FFF4CF',
    color: '#E2AF05',
  },
]

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [orderSummaryFilter, setOrderSummaryFilter] = useState(10)
  const [revenueFilter, setRevenueFilter] = useState(10)
  const [incomeFilter, setIncomeFilter] = useState(10);
  const [ordersData, setOrdersData] = useState([]);

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders || orders.length) {
      setOrdersData(orders);
    }
  }, [orders])



  const handleOrderSummaryFilter = (e) => {
    setOrderSummaryFilter(e.target.value)
  };

  const handleRevenueFilter = (e) => {
    setRevenueFilter(e.target.value)
  }

  const handleIncomeFilter = (e) => {
    setIncomeFilter(e.target.value)
  }

  return (
    <>
      <Grid container className={classes.root}>
        {/* Order count cards */}
        <Grid item xs={12}>
          <OrdersCountCard ordersData={ordersData} ordersCountList={ordersCountList} />
        </Grid>
        {/* Graph wrapper */}
        <Grid item xs={12}>
          <section className={classes.graphWrapper}>
            {/* Order summary & Revenue */}
            <Grid item xs={12} lg={8}>
              <section className={classes.section1Wrapper}>
                <Grid item xs={12} sm={6}>
                  <OrdersSummary
                    orderSummaryFilter={orderSummaryFilter}
                    handleOrderSummaryFilter={handleOrderSummaryFilter}
                    ordersSummaryList={ordersSummaryList}
                  />
                </Grid>
                {/* Revenue Line chart */}
                <Grid item xs={12} sm={6}>
                  <RevenueChart
                    revenueFilter={revenueFilter}
                    handleRevenueFilter={handleRevenueFilter}
                  />
                </Grid>
              </section>
              {/* All Orders Table */}
              <OrdersTable />
            </Grid>
            {/* Total income chart*/}
            <Grid item xs={12} lg={4}>
              <PieChart
                incomeFilter={incomeFilter}
                setIncomeFilter={setIncomeFilter}
                handleIncomeFilter={handleIncomeFilter}
              />
            </Grid>
          </section>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
