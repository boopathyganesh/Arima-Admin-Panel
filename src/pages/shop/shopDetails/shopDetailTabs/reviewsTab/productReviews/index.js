import React, { useState } from 'react'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography } from '@mui/material'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import CustomSwitch from 'sharedComponents/customSwitch'
import StarIcon from '@mui/icons-material/Star'

const sampleData = [
  {
    id: 1,
    customerId: 'PRT453S9W',
    customerName: 'Uncle Roger',
    orderId: 'ORD123FD',
    productName: 'Star cable',
    productImg: '/assets/images/bat.jpg',
    productRating: 2.75,
    productFeedback: 'QWERTY QWERTY asdfgh asdfgh sdfgh',
  },
  {
    id: 2,
    customerId: 'PRT453S9W',
    customerName: 'Uncle Roger',
    orderId: 'ORD123FD',
    productName: 'Star cable',
    productImg: '/assets/images/bat.jpg',
    productRating: 2.75,
    productFeedback: 'QWERTY QWERTY asdfgh asdfgh sdfgh',
  },
  {
    id: 3,
    customerId: 'PRT453S9W',
    customerName: 'Uncle Roger',
    orderId: 'ORD123FD',
    productName: 'Star cable',
    productImg: '/assets/images/bat.jpg',
    productRating: 2.75,
    productFeedback: 'QWERTY QWERTY asdfgh asdfgh sdfgh',
  },
]

const ProductReviews = () => {
  const classesTable = useStylesTable()
  const [row, setRow] = useState(sampleData)
  const [pageSize, setPageSize] = useState(10)

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    customerId: data?.customerId,
    customerName: data?.customerName,
    orderId: data?.orderId,
    productName: data?.productName,
    productImg: data?.productImg,
    productRating: data?.productRating,
    productFeedback: data?.productFeedback,
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
      headerName: 'Customer',
      minWidth: 280,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.customerId}</Typography>
              <div className={classesTable.padding}>
                <Typography variant="body2">
                  {params?.row?.customerName}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'orderId',
      headerName: 'Order Id',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <div>
                <Typography variant="body2">{params?.row?.orderId}</Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      minWidth: 280,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <div className={classesTable.imgNameWrapper}>
                <img
                  src={params?.row?.productImg}
                  alt="img"
                  className={classesTable.imgSize}
                />
                <Typography variant="body2">
                  {params?.row?.productName}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'productRating',
      headerName: 'Rating',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.ratings}>
              <Typography variant="body2">
                {params?.row?.productRating} <StarIcon />
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'productFeedback',
      headerName: 'Feedback',
      minWidth: 280,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.productFeedback}
              </Typography>
            </div>
          </>
        )
      },
    },
  ]

  return (
    <>
      <Grid container style={{ paddingBlock: 20 }}>
        <Grid item xs={12}>
          <section className={classesTable.titleWrapper}>
            <div className={classesTable.title}>
              <Typography variant="h5">Product Reviews</Typography>
            </div>
            <div className={classesTable.countWrapper}>
              <Typography variant="h5">30</Typography>
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
            fileName={'shop_id_product_reviews_list'}
            customStyle={{
              filterBackground: '#fff',
              searchBackground: '#F9F8F8',
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ProductReviews
