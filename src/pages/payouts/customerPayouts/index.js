import React, { useState } from 'react'
import useStyles from '../style'
import useStylesTable from 'pages/tableStyle/style'
import { Button, Grid, Typography } from '@mui/material'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import CheckoutModal from '../checkoutModal'

const sampleData = [
  {
    id: 1,
    customerName: 'Frances Ha',
    customerPhoneNo: 5557773339,
    orderId: 'ORQ123WS5',
    reason: 'Cancelled',
    due: 399,
    payoutStatus: 'Refund initiated',
    isSettled: false,
  },
  {
    id: 2,
    customerName: 'Frances Ha',
    customerPhoneNo: 5557773339,
    orderId: 'ORQ123WS5',
    reason: 'Rejected',
    due: 799,
    payoutStatus: 'Refund initiated',
    isSettled: true,
  },
  {
    id: 3,
    customerName: 'Frances Ha',
    customerPhoneNo: 5557773339,
    orderId: 'ORQ123WS5',
    reason: 'Return',
    due: 999,
    payoutStatus: 'Refund initiated',
    isSettled: false,
  },
]

const CustomerPayouts = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const [row, setRow] = useState(sampleData)
  const [pageSize, setPageSize] = useState(10)
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false)

  // Handle checkout modal
  const handleOpenCheckoutModal = () => {
    setOpenCheckoutModal(true)
  }
  const handleCloseCheckoutModal = () => {
    setOpenCheckoutModal(false)
  }

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    customerName: data?.customerName,
    customerPhoneNo: data?.customerPhoneNo,
    orderId: data?.orderId,
    reason: data?.reason,
    due: data?.due,
    payoutStatus: data?.payoutStatus,
    isSettled: data?.isSettled,
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
      field: 'customerName',
      headerName: 'Customer Name',
      minWidth: 320,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.customerName}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'customerPhoneNo',
      headerName: 'Mobile Number',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.customerPhoneNo}
              </Typography>
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
      field: 'due',
      headerName: 'Due',
      minWidth: 170,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                &#x20b9; {params?.row?.due}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'payoutStatus',
      headerName: 'Status',
      minWidth: 220,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.payoutStatus}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'isSettled',
      headerName: 'Settle',
      minWidth: 170,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.isSettled === false ? (
              <div className={classesTable.addBtn}>
                <Button
                  variant="contained"
                  style={{ minWidth: 120 }}
                  onClick={handleOpenCheckoutModal}
                >
                  Checkout
                </Button>
              </div>
            ) : (
              <div>
                <Button variant="contained" disabled style={{ minWidth: 120 }}>
                  Settled
                </Button>
              </div>
            )}
          </>
        )
      },
    },
  ]

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.titleWrapper}>
            <div className={classesTable.title}>
              <Typography variant="h5">Customer payouts</Typography>
            </div>
            <div className={classesTable.countWrapper}>
              <Typography variant="h5">90</Typography>
            </div>
          </section>
        </Grid>
        <Grid item xs={12} className={classes.dueBtn}>
          <Typography variant="body1">Total Due : Rs.77,33,313.00</Typography>
        </Grid>
        <Grid item xs={12} className={classesTable.tableWrapper}>
          <CustomDataGrid
            getRowId={(row) => row?.row?.id}
            rows={dataRows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            fileName={'customer_payouts_list'}
          />
        </Grid>
      </Grid>
      <CheckoutModal
        open={openCheckoutModal}
        handleClose={handleCloseCheckoutModal}
      />
    </>
  )
}

export default CustomerPayouts
