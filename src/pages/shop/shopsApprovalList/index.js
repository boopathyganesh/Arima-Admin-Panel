import React, { useState, useCallback, useEffect } from 'react';
import useStyles from './style';
import useStylesTable from 'pages/tableStyle/style';
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Tab,
  Tabs,
  Box,
} from '@mui/material';
import _ from 'lodash';
import CustomDataGrid from 'sharedComponents/customDataGrid';
import CustomSwitch from 'sharedComponents/customSwitch';
import { useNavigate } from 'react-router-dom';
import { showLoader, hideLoader } from 'redux/loader/actions';
import { useDispatch } from 'react-redux';
import shopApi from 'services/shop';

const zoneOptionsList = [
  { name: 'Gandhipuram' },
  { name: 'Peelamed' },
  { name: 'Sitra' },
]

const tabListData = [
  { title: `Pending`, tabIndex: 0 },
  { title: 'Rejected', tabIndex: 1 },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props
  const classes = useStyles()

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.box}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  )
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
};

const ShopsApprovalList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const classesTable = useStylesTable()
  const navigate = useNavigate();
  const [pendingPageSize, setPendingPageSize] = useState(10);
  const [rejectedPageSize, setRejectedPageSize] = useState(10)
  const [zoneOptions, setZoneOptions] = useState(zoneOptionsList)
  const [zone, setZone] = useState(null)
  const [tabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0);
  const [row, setRow] = useState([]);

  const handleTabs = (event, index) => {
    setTabValue(index);
  };
  const shopDataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    user_id: data?.shop_id,
    shop_name: data?.shop_name,
    name: data?.name,
    phone_number: data?.phone_number,
    shop_status: data?.shop_status,
    is_gst: data?.is_gst,
    shop_description: data?.shop_description,
    row: data,
  }))
  const shopDataColumns = [
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
      field: 'user_id',
      headerName: 'Shop ID',
      minWidth: 150,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.user_id}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'shop_name',
      headerName: 'shop Name',
      minWidth: 230,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.shop_name}</Typography>
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
    {
      field: 'shop_description',
      headerName: 'Description',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.shop_description}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'name',
      headerName: 'Owner',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <div className={classesTable.linkText}>
                <Typography variant="body2">
                  {params?.row?.name}
                </Typography>
              </div>
              <div className={`${classesTable.padding}`}>
                <Typography variant="body2">
                  {params?.row?.phone_number}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'is_gst',
      headerName: 'GST',
      minWidth: 120,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <CustomSwitch checked={params?.row?.is_gst} />
            </div>
          </>
        )
      },
    },
    {
      field: 'shop_status',
      headerName: 'Status',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.verifyText}>
              <Typography
                variant="body2"
                onClick={() => navigate(`/verifyshop/${params?.row?.row?._id}`)}
              >
                {params?.row?.shop_status === 'PENDING'
                  ? 'verify'
                  : ''}
              </Typography>
            </div>
          </>
        )
      },
    },
  ]

  // Get all Shop list api
  const getShopList = useCallback((tabValues) => {
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
    shopApi.getAllActiveShopsList(tabValues === 0 ? "PENDING" : "REJECTED").then(onSuccess, onFailure)
  }, [])
  useEffect(() => {
    getShopList(tabValue);
  }, [getShopList, tabValue])

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Shop approval list</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">{shopDataRows?.length}</Typography>
              </div>
            </section>
            {/* <section className={classesTable.zoneContainer}>
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
            </section> */}
          </section>
        </Grid>
        <Grid item xs={12}>
          <section className={classesTable.tabWrapper}>
            <Tabs
              value={tabValue}
              onChange={handleTabs}
              aria-label="shop-approval-list"
              variant="scrollable"
              scrollButtons="auto"
              className={classesTable.tabLabels}
            >
              {tabList?.map(({ title, tabIndex, disabled }) => (
                <Tab
                  label={<Typography variant="body2">{title}</Typography>}
                  {...a11yProps({ tabIndex })}
                  key={title}
                />
              ))}
            </Tabs>
            <Grid item xs={12}>
              {tabList?.map((data) => (
                <TabPanel value={tabValue} index={data?.tabIndex}>
                  {data?.tabIndex === 0 ? (
                    <Grid item xs={12} className={classesTable.tableWrapper}>
                      <CustomDataGrid
                        getRowId={(row) => row?.row?._id}
                        rows={shopDataRows}
                        columns={shopDataColumns}
                        pageSize={pendingPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPendingPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'shop_approval_pending_list'}
                      />
                    </Grid>
                  ) : data?.tabIndex === 1 ? (
                    <Grid item xs={12} className={classesTable.tableWrapper}>
                      <CustomDataGrid
                        getRowId={(row) => row?.row?._id}
                        rows={shopDataRows}
                        columns={shopDataColumns}
                        pageSize={rejectedPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setRejectedPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'shop_approval_rejected_list'}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} className={classesTable.tableWrapper}>
                      <CustomDataGrid
                        getRowId={(row) => row?.row?._id}
                        rows={shopDataRows}
                        columns={shopDataColumns}
                        pageSize={pendingPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPendingPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'shop_approval_pending_list'}
                      />
                    </Grid>
                  )}
                </TabPanel>
              ))}
            </Grid>
          </section>
        </Grid>
      </Grid>
    </>
  )
}

export default ShopsApprovalList
