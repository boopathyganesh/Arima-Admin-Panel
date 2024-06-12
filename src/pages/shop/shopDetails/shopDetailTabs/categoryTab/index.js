import React, { useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography } from '@mui/material'
import _ from 'lodash'
import moment from 'moment'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import CustomSwitch from 'sharedComponents/customSwitch'

import { updateProductCategoryById } from 'redux/slices/productCategory/productCategorySlice';
import { useDispatch } from 'react-redux';
import { imageUrl } from 'constants';

const CategoryTab = ({ datas, shopId }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const classesTable = useStylesTable();
  const [pageSize, setPageSize] = useState(10)

  const dataRows = _.map(datas || [], (data, index) => ({
    sno: index + 1,
    productCategory: data?.productCategoryName,
    status: data?.status,
    productCategoryStatus: data?.categoryStatus,
    row: data,
    image: data?.image
  }))

  const handleChange = async (item) => {
    console.log('item', item);
    // dispatch(showLoader('Loading please wait...'))
    const data = {
      id: item?._id,
      status: item?.status === 1 ? 0 : 1,
      categoryStatus: item?.categoryStatus,
      shopId: shopId,
      updateStatus: true
    };
    await dispatch(updateProductCategoryById(data));
  }


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
      field: 'productCategory',
      headerName: 'Product category',
      minWidth: 280,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.productCategory}
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
      field: 'productCategoryStatus',
      headerName: 'Product Category Status',
      minWidth: 150,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div
              className={
                params?.row?.productCategoryStatus?.toLowerCase() === 'verified'
                  ? classesTable.greenStatus
                  : params?.row?.productCategoryStatus?.toLowerCase() === 'rejected'
                    ? classesTable.redStatus
                    : classesTable.lightBlueStatus
              }
            >
              <Typography variant="body2">
                {params?.row?.productCategoryStatus}
              </Typography>
            </div>
          </>
        )
      },
    },
  ];


  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.titleWrapper}>
            <div className={classesTable.title}>
              <Typography variant="h5">Product Category</Typography>
            </div>
            <div className={classesTable.countWrapper}>
              <Typography variant="h5">{dataRows?.length}</Typography>
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
            fileName={'shop_id_product_category_list'}
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

export default CategoryTab
