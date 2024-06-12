import React, { useState, useCallback, useEffect } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography } from '@mui/material'
import _ from 'lodash'
import moment from 'moment'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import CustomSwitch from 'sharedComponents/customSwitch'
import { useNavigate } from 'react-router-dom';
import customersApi from 'services/customer';
import { showLoader, hideLoader } from 'redux/loader/actions';
import { getAllCustomers,updateCustomerById } from 'redux/slices/customer/customerSlice';
import { useSelector, useDispatch } from 'react-redux'


const CustomersList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const classesTable = useStylesTable()
  const navigate = useNavigate()
  const [row, setRow] = useState();
  const [pageSize, setPageSize] = useState(10);
  const { allcustomers } = useSelector(state => state.customer)


  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);


  const dataRows = _.map(allcustomers || [], (data, index) => ({
    sno: index + 1,
    customerId: data?.customerId,
    customerName: data?.userName,
    customerPhoneNo: data?.phone_number,
    customerEmail: data?.email,
    totalOrders: data?.totalOrder,
    status: data?.status,
    row: data,
  }));


  const handleChange = (item) => {
    const data = {
      id: item?._id,
      status: item?.status === 1 ? 0 : 1,
    };
    dispatch(updateCustomerById(data));
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
      field: 'customerName',
      headerName: 'Customer Name',
      minWidth: 280,
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
      field: 'customerId',
      headerName: 'Customer ID',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={`${classesTable.linkText} ${classesTable.cursor}`}>
              <Typography
                variant="body2"
                onClick={() => navigate('/customer/123')}
              >
                {params?.row?.customerId}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'customerEmail',
      headerName: 'Email',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.customerEmail}
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
      field: 'totalOrders',
      headerName: 'Total Orders',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.totalOrders}
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
              <CustomSwitch checked={params?.row?.status}
                onChange={() => handleChange(params?.row?.row)}
              />
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
              <Typography variant="h5">Customers list</Typography>
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
            fileName={'customers_list'}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default CustomersList
