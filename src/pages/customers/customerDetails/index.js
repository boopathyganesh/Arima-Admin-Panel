import React, { useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Avatar,
} from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import moment from 'moment'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate, useParams } from 'react-router-dom'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const sampleData = [
  {
    id: 1,
    orderId: 'ORQ123WS5',
    orderDate: moment(),
    productName: 'Electronic Iron',
    shopName: 'Arima cable and electronics',
    shopId: 'SH55AR09',
    category: 'Tube lights',
    quantity: 3,
    updatedTime: moment(),
    finalAmount: 1957,
    paymentStatus: 'paid',
    orderStatus: 'Pending',
  },
  {
    id: 2,
    orderId: 'ORQ123WS5',
    orderDate: moment(),
    productName: 'Tv Cable',
    shopName: 'Arima cable and electronics',
    shopId: 'SH55AR09',
    category: 'Tube lights',
    quantity: 3,
    updatedTime: moment(),
    finalAmount: 1957,
    paymentStatus: 'Unpaid',
    orderStatus: 'Cancelled',
  },
  {
    id: 3,
    orderId: 'ORQ123WS5',
    orderDate: moment(),
    productName: 'Pvc pipes',
    shopName: 'Arima cable and electronics',
    shopId: 'SH55AR09',
    category: 'Tube lights',
    quantity: 3,
    updatedTime: moment(),
    finalAmount: 1957,
    paymentStatus: 'paid',
    orderStatus: 'Processing',
  },
]

const CustomerDetails = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const navigate = useNavigate()
  const { id } = useParams()
  const [row, setRow] = useState(sampleData)
  const [pageSize, setPageSize] = useState(10)

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    orderId: data?.orderId,
    orderDate: data?.orderDate,
    productName: data?.productName,
    shopName: data?.shopName,
    shopId: data?.shopId,
    category: data?.category,
    quantity: data?.quantity,
    updatedTime: data?.updatedTime,
    finalAmount: data?.finalAmount,
    paymentStatus: data?.paymentStatus,
    orderStatus: data?.orderStatus,
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
      field: 'productName',
      headerName: 'Product Name',
      minWidth: 300,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.productName}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'shopName',
      headerName: 'Shop',
      minWidth: 340,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.shopName}</Typography>
              <div
                className={`${classesTable.padding} ${classesTable.linkText}`}
              >
                <Typography variant="body2">{params?.row?.shopId}</Typography>
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
      field: 'orderDate',
      headerName: 'Order Date',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <div>
                <Typography variant="body2">
                  {moment(params?.row?.orderDate).format('DD MMM YYYY')}
                </Typography>
              </div>
              <div
                className={`${classesTable.padding} ${classesTable.timeWrapper}`}
              >
                <Typography variant="body2">
                  {moment(params?.row?.orderDate).format('hh:mm a')}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.category}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'quantity',
      headerName: 'quantity',
      minWidth: 120,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.quantity}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'updatedTime',
      headerName: 'Date',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {moment(params?.row?.updatedTime).format('DD MMM YYYY')}
              </Typography>
              <div
                className={`${classesTable.padding} ${classesTable.timeWrapper}`}
              >
                <Typography variant="body2">
                  {moment(params?.row?.updatedTime).format('hh:mm a')}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'finalAmount',
      headerName: 'Final Amount',
      minWidth: 150,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                &#x20b9; {params?.row?.finalAmount}
              </Typography>
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
            </div>
          </>
        )
      },
    },
    {
      field: 'orderStatus',
      headerName: 'Status',
      minWidth: 170,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div
              className={
                params?.row?.orderStatus?.toLowerCase() === 'pending' ||
                params?.row?.orderStatus?.toLowerCase() === 'rejected' ||
                params?.row?.orderStatus?.toLowerCase() === 'cancelled'
                  ? classesTable.redStatus
                  : params?.row?.orderStatus?.toLowerCase() === 'processing'
                  ? classesTable.orangeStatus
                  : params?.row?.orderStatus?.toLowerCase() === 'delivered' ||
                    params?.row?.orderStatus?.toLowerCase() === 'ready'
                  ? classesTable.greenStatus
                  : classesTable.redStatus
              }
            >
              <Typography variant="body2">
                {params?.row?.orderStatus}
              </Typography>
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
          <div className={classes.headerLabel}>
            <Typography variant="h5" onClick={() => navigate(-1)}>
              {' '}
              <ArrowBackIosIcon /> Customer Details
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <section className={classes.cardsWrapper}>
            <Grid item xs={12} lg={6} className={classes.cardContainer}>
              <section className={classes.avatarWrapper}>
                <Avatar src="/assets/images/frances1.png" alt="user" />
                <div>
                  <Typography variant="body1">Frances Ha</Typography>
                  <div style={{ paddingBlockStart: 6 }}>
                    <Typography variant="body2">
                      Email Id : frances@gmail.in
                    </Typography>
                  </div>
                </div>
              </section>
            </Grid>
            <Grid item xs={12} lg={6}>
              <section className={classes.ordersWrapper}>
                <Grid item xs={12} sm={6} className={classes.cardContainer}>
                  <section className={classes.ordersCardWrapper}>
                    <div
                      className={classes.orderCountImgWrapper}
                      style={{ background: '#EFF5FF' }}
                    >
                      <img
                        src={'/assets/images/dashboard/order1.png'}
                        alt={'img'}
                        className={classes.orderCountImg}
                      />
                    </div>
                    <div>
                      <Typography variant="body1">Total Orders</Typography>
                      <div className={classes.ordersCount}>
                        <Typography variant="h6">57</Typography>
                      </div>
                    </div>
                  </section>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.cardContainer}>
                  <section className={classes.ordersCardWrapper}>
                    <div
                      className={classes.orderCountImgWrapper}
                      style={{ background: '#EFF5FF' }}
                    >
                      <img
                        src={'/assets/images/dashboard/cost.png'}
                        alt={'img'}
                        className={classes.orderCountImg}
                      />
                    </div>
                    <div>
                      <Typography variant="body1">Total Order Value</Typography>
                      <div className={classes.ordersCount}>
                        <Typography variant="h6">&#x20b9; 1597</Typography>
                      </div>
                    </div>
                  </section>
                </Grid>
              </section>
            </Grid>
          </section>
        </Grid>
        <Grid item xs={12} className={classes.infoLabel}>
          <Typography variant="h6">Orders Summary</Typography>
        </Grid>
        <Grid item xs={12} className={classesTable.tableWrapper}>
          <CustomDataGrid
            getRowId={(row) => row?.row?.id}
            rows={dataRows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            fileName={'customers_list'}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerDetails
