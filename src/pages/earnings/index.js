import React, { useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography } from '@mui/material'
import _ from 'lodash'
import moment from 'moment'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const sampleData = [
  {
    id: 1,
    userType: 'Customer',
    createdAt: moment(),
    name: 'Frances Ha',
    personId: 'CUS123TTV0',
    orderId: 'ORD4570WS123',
    reason: 'Cancelled order',
    paymentMode: 'Upi',
    paymentStatus: 'paid',
    paymentType: 'Debit',
    amount: 123,
  },
  {
    id: 2,
    userType: 'Shop',
    createdAt: moment(),
    name: 'Arima cable and electronics',
    personId: 'SHP123TTV0',
    orderId: 'ORD4570WS123',
    reason: 'Plan',
    paymentMode: 'Cash',
    paymentStatus: 'unpaid',
    paymentType: 'Credit',
    amount: 799,
  },
  {
    id: 3,
    userType: 'Customer',
    createdAt: moment(),
    name: 'Martha Nielsen',
    personId: 'CUS123TTV0',
    orderId: 'ORD4570WS123',
    reason: 'Cancelled order',
    paymentMode: 'Cash',
    paymentStatus: 'paid',
    paymentType: 'Credit',
    amount: 3579,
  },
]

const Earnings = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const [row, setRow] = useState(sampleData)
  const [pageSize, setPageSize] = useState(10)

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    userType: data?.userType,
    createdAt: data?.createdAt,
    name: data?.name,
    personId: data?.personId,
    orderId: data?.orderId,
    reason: data?.reason,
    paymentMode: data?.paymentMode,
    paymentStatus: data?.paymentStatus,
    paymentType: data?.paymentType,
    amount: data?.amount,
    row: data,
  }))

  const columns = [
    {
      field: 'sno',
      headerName: 'S.No',
      minWidth: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.rowPadding}>
              <Typography variant="body2">{params?.row?.sno}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'userType',
      headerName: 'User Type',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.userType}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'createdAt',
      headerName: 'Date & Time',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <div>
                <Typography variant="body2">
                  {moment(params?.row?.createdAt).format('DD MMM YYYY')}
                </Typography>
              </div>
              <div
                className={`${classesTable.padding} ${classesTable.timeWrapper}`}
              >
                <Typography variant="body2">
                  {moment(params?.row?.createdAt).format('hh:mm a')}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 340,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.name}</Typography>
              <div
                className={`${classesTable.padding} ${classesTable.linkText}`}
              >
                <Typography variant="body2">{params?.row?.personId}</Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'orderId',
      headerName: 'Order ID',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={`${classesTable.orderId} ${classesTable.cursor}`}>
              <Typography variant="body2">{params?.row?.orderId}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'reason',
      headerName: 'Reason',
      minWidth: 340,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.reason}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'paymentMode',
      headerName: 'Payment Method',
      minWidth: 170,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.paymentMode}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div
              className={
                params?.row?.paymentStatus?.toLowerCase() === 'paid'
                  ? classesTable.paidStatus
                  : classesTable.unPaidStatus
              }
            >
              <Typography variant="body2">
                <FiberManualRecordIcon /> {params?.row?.paymentStatus}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'paymentType',
      headerName: 'Debit/Credit',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <div
                className={
                  params?.row?.paymentType?.toLowerCase() === 'credit'
                    ? classesTable.greenText
                    : classesTable.redText
                }
              >
                <Typography variant="body2">
                  {params?.row?.paymentType}
                </Typography>
              </div>
              <div className={classesTable.padding}>
                <Typography variant="body2">
                  &#x20b9; {params?.row?.amount}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
  ]

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classesTable.title}>
            <Typography variant="h5">Earnings</Typography>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.padding}>
          <section className={classes.cardWrapper}>
            <Grid item xs={12} sm={6} className={classes.card}>
              <div className={classes.cardSectionWrapper}>
                <div
                  className={classes.countImgWrapper}
                  style={{ background: '#EFF5FF' }}
                >
                  <img
                    src={'/assets/images/dashboard/order1.png'}
                    alt={'icon'}
                    className={classes.countImg}
                  />
                </div>
                <div>
                  <Typography variant="body1">Total Sales</Typography>
                  <div className={classes.count}>
                    <Typography variant="h6">Rs.35,007</Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.card}>
              <div className={classes.cardSectionWrapper}>
                <div
                  className={classes.countImgWrapper}
                  style={{ background: '#FFF2EF' }}
                >
                  <img
                    src={'/assets/images/dashboard/order2.png'}
                    alt={'icon'}
                    className={classes.countImg}
                  />
                </div>
                <div>
                  <Typography variant="body1">Total Earnings</Typography>
                  <div className={classes.count}>
                    <Typography variant="h6">Rs.87,75,007</Typography>
                  </div>
                </div>
              </div>
            </Grid>
          </section>
          <section className={classes.cardWrapper}>
            <Grid item xs={12} sm={6} className={classes.card}>
              <div className={classes.cardSectionWrapper}>
                <div
                  className={classes.countImgWrapper}
                  style={{ background: '#EDFFED' }}
                >
                  <img
                    src={'/assets/images/dashboard/order3.png'}
                    alt={'icon'}
                    className={classes.countImg}
                  />
                </div>
                <div>
                  <Typography variant="body1">Due to be Received</Typography>
                  <div className={classes.count}>
                    <Typography variant="h6">Rs.57,50,007.00</Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.card}>
              <div className={classes.cardSectionWrapper}>
                <div
                  className={classes.countImgWrapper}
                  style={{ background: '#E0FBFF' }}
                >
                  <img
                    src={'/assets/images/dashboard/order4.png'}
                    alt={'icon'}
                    className={classes.countImg}
                  />
                </div>
                <div>
                  <Typography variant="body1">Due to be paid</Typography>
                  <div className={classes.count}>
                    <Typography variant="h6">Rs.15,007</Typography>
                  </div>
                </div>
              </div>
            </Grid>
          </section>
        </Grid>
        <Grid item xs={12}>
          <section className={classesTable.titleWrapper}>
            <div className={classesTable.title}>
              <Typography variant="h5">Master Transactions</Typography>
            </div>
            <div className={classesTable.countWrapper}>
              <Typography variant="h5">507</Typography>
            </div>
          </section>
        </Grid>
        <Grid item xs={12} className={classesTable.tableWrapper}>
          <CustomDataGrid
            getRowId={(row) => row?.row?.id}
            rows={dataRows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            fileName={'earnings_master_transactions_list'}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Earnings
