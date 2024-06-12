import React, { useState, useCallback, useEffect } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography, Autocomplete, TextField } from '@mui/material'
import _ from 'lodash'
import moment from 'moment'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import CustomSwitch from 'sharedComponents/customSwitch'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useNavigate } from 'react-router-dom'
import shopApi from "services/shop";
import { showLoader, hideLoader } from 'redux/loader/actions';
import { useDispatch } from 'react-redux';
import { showSnackbar } from 'redux/snackbar/actions';

const zoneOptionsList = [
  { name: 'Gandhipuram' },
  { name: 'Peelamed' },
  { name: 'Sitra' },
]

const ShopsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const classesTable = useStylesTable()
  const navigate = useNavigate()
  const [row, setRow] = useState();
  const [pageSize, setPageSize] = useState(10)
  const [zoneOptions, setZoneOptions] = useState(zoneOptionsList)
  const [zone, setZone] = useState(null);

  console.log('row', row);

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    shopId: data?.shop_id,
    shopName: data?.shop_name,
    // category: data?.category,
    // zone: data?.zone,
    ownerName: data?.name,
    ownerPhoneNo: data?.phone_number,
    gst_number: data?.gst_number,
    shopStatus: data?.shopStatus,
    planName: data?.selected_plan_name,
    active: data?.status,
    status: data?.status,
    row: data,
  }));

  const handleChange = (item) => {
    dispatch(showLoader('Loading please wait...'))
    const data = {
      status: item?.status === 1 ? 0 : 1,
    }
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status?.toString().toLowerCase() === 'true') {
        dispatch(
          showSnackbar({
            message: res?.data?.message || 'Info updated successfully',
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            variant: 'success',
          })
        )
        getShopList();
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader())
      dispatch(
        showSnackbar({
          message: err?.response?.data?.message || 'Failed to fetch data',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          variant: 'error',
        })
      )
      console.log('update product category Api', err)
    }
    shopApi
      .updateShopActiveInactive(item?._id, data)
      .then(onSuccess, onFailure)
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
      field: 'shopId',
      headerName: 'Shop ID',
      minWidth: 220,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={`${classesTable.linkText} ${classesTable.cursor}`}>
              {console.log('params?.row', params?.row?.row?._id)}
              <Typography
                variant="body2"
                onClick={() => navigate(`/shopdetails/${params?.row?.row?._id}`)}
              >
                {params?.row?.shopId}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'shopName',
      headerName: 'shop Name',
      minWidth: 340,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.shopName}</Typography>
            </div>
          </>
        )
      },
    },
    // {
    //   field: 'category',
    //   headerName: 'Product Category',
    //   minWidth: 240,
    //   sortable: true,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <div>
    //           <Typography variant="body2">{params?.row?.category}</Typography>
    //         </div>
    //       </>
    //     )
    //   },
    // },
    // {
    //   field: 'zone',
    //   headerName: 'Shop Zone',
    //   minWidth: 240,
    //   sortable: true,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <div>
    //           <Typography variant="body2">{params?.row?.zone}</Typography>
    //         </div>
    //       </>
    //     )
    //   },
    // },
    {
      field: 'ownerName',
      headerName: 'Owner',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <div className={classesTable.linkText}>
                <Typography variant="body2">
                  {params?.row?.ownerName}
                </Typography>
              </div>
              <div className={`${classesTable.padding}`}>
                <Typography variant="body2">
                  {params?.row?.ownerPhoneNo}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'isGst',
      headerName: 'GST',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.gst_number}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'planName',
      headerName: 'Plan',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.planName}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'active',
      headerName: 'Active',
      minWidth: 150,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div
              className={
                params?.row?.active === 1
                  ? classesTable.paidStatus
                  : classesTable.unPaidStatus
              }
            >
              <Typography variant="body2">
                <FiberManualRecordIcon />{' '}
                {params?.row?.active === 1 ? 'Online' : 'Offline'}
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
    {
      field: '',
      headerName: '',
      minWidth: 220,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={`${classesTable.linkText} ${classesTable.cursor}`}>
              <Typography
                variant="body2"
                onClick={() => navigate(`/shopEdit/${params?.row?.row?._id}`)}
              >
                Edit
              </Typography>
            </div>
          </>
        )
      },
    },
  ];

  // Get all Shop list api
  const getShopList = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader());
      if (res?.data?.status === true) {
        setRow(res?.data?.data);
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader());
      console.log('get all product category list Api', err)
    }
    shopApi.getAllShopsList("APPROVED").then(onSuccess, onFailure)
  }, [])
  useEffect(() => {
    getShopList();
  }, [getShopList]);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Shops list</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">{row?.length}</Typography>
              </div>
            </section>
            <section className={classesTable.zoneContainer}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="zone"
                id="zone"
                options={zoneOptions}
                value={zone}
                getOptionLabel={(option) => option.name || ''}
                onChange={(e, value) => {
                  setZone(value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="All Zones"
                    sx={{
                      '& fieldset': { border: 'none' },
                      background: '#fff',
                      borderRadius: 8,
                    }}
                  />
                )}
              />
            </section>
          </section>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className={classesTable.tableWrapper}>
            <CustomDataGrid
              getRowId={(row) => row?.row?._id}
              rows={dataRows}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              fileName={'shops_list'}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ShopsList
