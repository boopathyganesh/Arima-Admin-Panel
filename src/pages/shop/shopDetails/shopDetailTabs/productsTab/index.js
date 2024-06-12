import React, { useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography } from '@mui/material'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import CustomSwitch from 'sharedComponents/customSwitch';
import { imageUrl } from 'constants';

import { updateProductByid } from 'redux/slices/product/productSlice';
import { useDispatch } from 'react-redux';


const ProductsTab = ({ datas, shopId }) => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const classesTable = useStylesTable();
  const [pageSize, setPageSize] = useState(10)

  const dataRows = _.map(datas || [], (data, index) => ({
    sno: index + 1,
    productId: data?.productId,
    productName: data?.name,
    productCategory: data?.product_category?.productCategoryName,
    stock: data?.stock,
    mrp: data?.mrp,
    sellingPrice: data?.selling_price,
    status: data?.status,
    productStatus: data?.product_status,
    row: data,
    image: data?.product_image
  }));
  console.log('dataRows', dataRows);
  const handleChange = async (item) => {
    // dispatch(showLoader('Loading please wait...'))
    const data = {
      id: item?._id,
      status: item?.status === 1 ? 0 : 1,
      shopId: shopId,
      updateStatus: true
    };
    await dispatch(updateProductByid(data));
  };

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
      field: 'image',
      headerName: 'Image',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <img
                src={`${imageUrl}/${params?.row?.image}`}
                alt="img"
                width={80}
                height={50}
              />
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
              <Typography variant="body2">
                {params?.row?.productName}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'productCategory',
      headerName: 'Product Category',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <div>
                <Typography variant="body2">
                  {params?.row?.productCategory}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'stock',
      headerName: 'Stock',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.stock}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'mrp',
      headerName: 'MRP',
      minWidth: 220,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                &#x20b9; {params?.row?.mrp}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'sellingPrice',
      headerName: 'Selling Price',
      minWidth: 220,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                &#x20b9; {params?.row?.sellingPrice}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <CustomSwitch
                checked={params?.row?.status === 0 ? false : true}
                onChange={() => handleChange(params?.row?.row)}
              />
            </div>
          </>
        )
      },
    },
    {
      field: 'productStatus',
      headerName: 'Product Status',
      minWidth: 150,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div
              className={
                params?.row?.productStatus?.toLowerCase() === 'verified'
                  ? classesTable.greenStatus
                  : params?.row?.productStatus?.toLowerCase() === 'rejected'
                    ? classesTable.redStatus
                    : classesTable.lightBlueStatus
              }
            >
              <Typography variant="body2">
                {params?.row?.productStatus}
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
          <section className={classesTable.titleWrapper}>
            <div className={classesTable.title}>
              <Typography variant="h5">Products</Typography>
            </div>
            <div className={classesTable.countWrapper}>
              <Typography variant="h5">{dataRows.length}</Typography>
            </div>
          </section>
        </Grid>
        <Grid item xs={12} className={classesTable.tableWrapper}>
          <CustomDataGrid
            getRowId={(row) => row?.row?._id}
            rows={dataRows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            fileName={'shop_id_products_list'}
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

export default ProductsTab
