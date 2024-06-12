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
    shopId: 'SFT13WQ0',
    shopName: 'Wayne enterprise',
    shopPhoneNo: 5557773339,
    category: 'Electronics',
    reason: 'Cancelled',
    due: 399,
    isSettled: false,
  },
  {
    id: 2,
    shopId: 'SFT13WQ0',
    shopName: 'Wayne enterprise',
    shopPhoneNo: 5557773339,
    category: 'Electronics',
    reason: 'Rejected',
    due: 1099,
    isSettled: true,
  },
  {
    id: 3,
    shopId: 'SFT13WQ0',
    shopName: 'Wayne enterprise',
    shopPhoneNo: 5557773339,
    category: 'Electronics',
    reason: 'Damaged',
    due: 773,
    isSettled: false,
  },
]

const ShopPayouts = () => {
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
    shopId: data?.shopId,
    shopName: data?.shopName,
    shopPhoneNo: data?.shopPhoneNo,
    category: data?.category,
    reason: data?.reason,
    due: data?.due,
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
      field: 'shopPhoneNo',
      headerName: 'Mobile Number',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.shopPhoneNo}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      minWidth: 220,
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
              <Typography variant="h5">Shop payouts</Typography>
            </div>
            <div className={classesTable.countWrapper}>
              <Typography variant="h5">97</Typography>
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
            fileName={'shop_payouts_list'}
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

export default ShopPayouts
