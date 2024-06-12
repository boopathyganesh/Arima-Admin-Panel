import React, { useState, useCallback, useEffect } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography } from '@mui/material'
import _ from 'lodash'
import moment from 'moment'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from 'redux/loader/actions';
import orderApi from 'services/order';

const ProcessingOrders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const classesTable = useStylesTable()
  const navigate = useNavigate()
  const [row, setRow] = useState([]);
  const [pageSize, setPageSize] = useState(10)

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    orderId: data?.orderId,
    createdAt: data?.createdAt,
    customerName: data?.user?.userName,
    customerPhoneNo: data?.user?.phone_number,
    shopName: data?.vendor?.shop_name,
    shopId: data?.shopId,
    category: data?.product?.product_category?.productCategoryName,
    quantity: data?.quantity,
    orderType: data?.orderType,
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
      field: 'orderId',
      headerName: 'Order ID',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={`${classesTable.orderId} ${classesTable.cursor}`}>
              <Typography
                variant="body2"
                onClick={() => navigate('/orderdetails/123')}
              >
                {params?.row?.orderId}
              </Typography>
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
      headerName: 'Mobile No',
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
      field: 'orderType',
      headerName: 'Type',
      minWidth: 170,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div
              className={
                params?.row?.orderType?.toLowerCase() === 'exchange' ||
                  params?.row?.orderType?.toLowerCase() === 'cancelled by vendor'
                  ? classesTable.redText
                  : params?.row?.orderType?.toLowerCase() === 'delivered' ||
                    params?.row?.orderType?.toLowerCase() === 'processing'
                    ? classesTable.greenText
                    : classesTable.blackText
              }
            >
              <Typography variant="body2">{params?.row?.orderType}</Typography>
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
                  {moment(params?.row?.createdAt).format('hh:mm a')}
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
                  params?.row?.orderStatus?.toLowerCase() === 'rejected'
                  ? classesTable.redStatus
                  : params?.row?.orderStatus?.toLowerCase() === 'processing'
                    ? classesTable.orangeStatus
                    : params?.row?.orderStatus?.toLowerCase() === 'delivered'
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
  ];

  const getOrdersListByStatus = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader());
      if (res?.data?.status === true) {
        setRow(res?.data?.data);
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader());
    }
    orderApi.allOrdersByStatus("PROCESSING").then(onSuccess, onFailure);
  }, []);

  useEffect(() => {
    getOrdersListByStatus();
  }, []);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.titleWrapper}>
            <div className={classesTable.title}>
              <Typography variant="h5">Processing Orders</Typography>
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
            fileName={'processing_orders_list'}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ProcessingOrders
