import React, { useState, useCallback, useEffect } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography, Tab, Tabs, Box, Button } from '@mui/material'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import CustomSwitch from 'sharedComponents/customSwitch'
import AddIcon from '@mui/icons-material/Add'
import AddMainBannerModal from './addMainBannerModal'
import AddShopBannerModal from './addShopBannerModal';
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import CustomPermissionDialog from 'sharedComponents/customPermissionDialog';

import { getAllMainBanner, deleteMainBannerById, updateMainBannerByStatus } from 'redux/slices/mainBanner/mainBannerSlice';
import { getAllShopBanner, deleteShopBannerById, updateShopBannerByStatus } from 'redux/slices/shopBanner/shopBannerSlice';
import { useDispatch, useSelector } from 'react-redux';

const tabListData = [
  { title: `Main Banner`, tabIndex: 0 },
  { title: 'Shop Banner', tabIndex: 1 },
]

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
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const AdsAndBanners = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const classesTable = useStylesTable();
  const [mainBannerPageSize, setMainBannerPageSize] = useState(10);
  const [shopBannerPageSize, setShopBannerPageSize] = useState(10)
  const [tabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0)
  const [openMainBannerModal, setOpenMainBannerModal] = useState(false)
  const [openShopBannerModal, setOpenShopBannerModal] = useState(false)
  const [mainMode, setMainMode] = useState('new')
  const [shopMode, setShopMode] = useState('new')
  const [mainBannerId, setMainBannerId] = useState(null)
  const [shopBannerId, setShopBannerId] = useState(null)
  const [openPermissionMainModal, setOpenPermissionMainModal] = useState(false)
  const [openPermissionShopModal, setOpenPermissionShopModal] = useState(false);

  const { mainBanners } = useSelector(state => state.mainBanner);
  const { shopBanners } = useSelector(state => state.shopBanner);


  useEffect(() => {
    dispatch(getAllMainBanner());
    dispatch(getAllShopBanner());
  }, [dispatch]);

  // handle main banner modal
  const handleOpenMainBannerModal = () => {
    setOpenMainBannerModal(true)
  };

  const handleCloseMainBannerModal = async () => {
    setOpenMainBannerModal(false);
    setMainMode('new');
    setMainBannerId(null);
    await dispatch(getAllMainBanner());
  };

  // handle shop banner modal
  const handleOpenShopBannerModal = () => {
    setOpenShopBannerModal(true);
  };

  const handleCloseShopBannerModal = async () => {
    setOpenShopBannerModal(false);
    setShopMode('new');
    setShopBannerId(null);
    await dispatch(getAllShopBanner());
  };

  // handle delete main permission modal
  const handleOpenPermissionMainModal = (row) => {
    setOpenPermissionMainModal(true)
    setMainBannerId(row?._id)
  };

  const handleClosePermissionMainModal = () => {
    setOpenPermissionMainModal(false)
    setMainBannerId(null)
  };

  // handle delete shop permission modal
  const handleOpenPermissionShopModal = (row) => {
    setOpenPermissionShopModal(true)
    setShopBannerId(row?._id)
  };

  const handleClosePermissionShopModal = () => {
    setOpenPermissionShopModal(false)
    setShopBannerId(null)
  };

  const handleTabs = (event, index) => {
    setTabValue(index)
  };

  const mainBannerDataRows = _.map(mainBanners || [], (data, index) => ({
    sno: index + 1,
    title: data?.name,
    productCategory: data?.productCategory?.productCategoryName,
    status: data?.status,
    row: data,
  }))

  const mainBannerColumns = [
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
      field: 'title',
      headerName: 'Title',
      minWidth: 340,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.title}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'productCategory',
      headerName: 'Product Category',
      minWidth: 300,
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
                checked={params?.row?.status}
                onChange={() => handleMainBannerChange(params?.row?.row)}
              />
            </div>
          </>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 160,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.iconsWrapper}>
              <section className={classesTable.editIcon} onClick={() => editMainBanner(params?.row?.row)}>
                <img
                  src="/assets/images/edit.svg"
                  alt="edit"
                  className={classes.editImg}
                />
              </section>
              <section className={classesTable.deleteIcon} onClick={() => handleOpenPermissionMainModal(params?.row?.row)}>
                <img
                  src="/assets/images/delete.svg"
                  alt="delete"
                  className={classes.deleteImg}
                />
              </section>
            </div>
          </>
        )
      },
    },
  ]

  const shopBannerDataRows = _.map(shopBanners || [], (data, index) => ({
    sno: index + 1,
    title: data?.name,
    productCategory: data?.product_category?.productCategoryName,
    shopId: data?.shop_category?.shop_id,
    shopName: data?.shop_category?.shop_name,
    status: data?.status,
    row: data,
  }))

  const shopBannerColumns = [
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
      field: 'title',
      headerName: 'Title',
      minWidth: 250,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.title}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'productCategory',
      headerName: 'Product Category',
      minWidth: 300,
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
      field: 'shopName',
      headerName: 'shop Name',
      minWidth: 250,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.shopName}</Typography>
              <div
                className={`${classesTable.padding} ${classesTable.linkText} ${classesTable.cursor}`}
              >
                <Typography variant="body2">{params?.row?.shopId}</Typography>
              </div>
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
                checked={params?.row?.status}
                onChange={() => handleShopBannerChange(params?.row?.row)}
              />
            </div>
          </>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 160,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.iconsWrapper}>
              <section className={classesTable.editIcon} onClick={() => editShopBanner(params?.row?.row)}>
                <img
                  src="/assets/images/edit.svg"
                  alt="edit"
                  className={classes.editImg}
                />
              </section>
              <section className={classesTable.deleteIcon} onClick={() => handleOpenPermissionShopModal(params?.row?.row)}>
                <img
                  src="/assets/images/delete.svg"
                  alt="delete"
                  className={classes.deleteImg}
                />
              </section>
            </div>
          </>
        )
      },
    },
  ]


  /* update main banner status */
  const handleMainBannerChange = async (item) => {
    // dispatch(showLoader('Loading please wait...'))
    const updatedData = {
      id: item?._id,
      status: item?.status === 1 ? 0 : 1,
    };
    await dispatch(updateMainBannerByStatus(updatedData));
  }


  /* update shop banner status */
  const handleShopBannerChange = async (item) => {
    // dispatch(showLoader('Loading please wait...'))
    const updatedData = {
      id: item?._id,
      status: item?.status === 1 ? 0 : 1,
    };
    await dispatch(updateShopBannerByStatus(updatedData))
  }

  /* Update main banner */
  const editMainBanner = (row) => {
    setMainMode('edit')
    setMainBannerId(row?._id)
    handleOpenMainBannerModal()
  };

  /* Update shop banner */
  const editShopBanner = (row) => {
    setShopMode('edit')
    setShopBannerId(row?._id)
    handleOpenShopBannerModal()
  };

  /* delete main banner */
  const handleRemoveMainBanner = async () => {
    await dispatch(showLoader('Loading please wait...'));
    const respnse = await dispatch(deleteMainBannerById(mainBannerId));
    if (respnse?.payload?.status) {
      await handleClosePermissionMainModal();
      await dispatch(hideLoader());
      await dispatch(hideLoader);
    } else {
      await handleClosePermissionMainModal();
      await dispatch(hideLoader());
      await dispatch(hideLoader);
    };
  }

  /* delete shop banner */
  const handleRemoveShopBanner = async () => {
    dispatch(showLoader('Loading please wait...'))
    const respnse = await dispatch(deleteShopBannerById(shopBannerId));
    if (respnse?.payload?.status) {
      await handleClosePermissionShopModal();
      await dispatch(hideLoader());
    } else {
      await handleClosePermissionShopModal();
      await dispatch(hideLoader());
    };
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Ads and Banners list</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">{
                  tabValue === 0
                    ? mainBanners.length
                    : shopBanners.length
                } </Typography>
              </div>
            </section>
            <section className={classesTable.addBtn}>
              <Button
                variant="contained"
                disableElevation
                onClick={
                  tabValue === 0
                    ? handleOpenMainBannerModal
                    : handleOpenShopBannerModal
                }
              >
                <AddIcon /> Add
              </Button>
            </section>
          </section>
        </Grid>
        <Grid item xs={12}>
          <section className={classesTable.tabWrapper}>
            <Tabs
              value={tabValue}
              onChange={handleTabs}
              aria-label="ads-banners-list"
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
                        rows={mainBannerDataRows}
                        columns={mainBannerColumns}
                        pageSize={mainBannerPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setMainBannerPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'ads_main_banners_list'}
                      />
                    </Grid>
                  ) : data?.tabIndex === 1 ? (
                    <Grid item xs={12} className={classesTable.tableWrapper}>
                      <CustomDataGrid
                        getRowId={(row) => row?.row?._id}
                        rows={shopBannerDataRows}
                        columns={shopBannerColumns}
                        pageSize={shopBannerPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setMainBannerPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'ads_shop_banners_list'}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} className={classesTable.tableWrapper}>
                      <CustomDataGrid
                        getRowId={(row) => row?.row?._id}
                        rows={mainBannerDataRows}
                        columns={mainBannerColumns}
                        pageSize={mainBannerPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setMainBannerPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'ads_main_banners_list'}
                      />
                    </Grid>
                  )}
                </TabPanel>
              ))}
            </Grid>
          </section>
        </Grid>
      </Grid>
      <AddMainBannerModal
        open={openMainBannerModal}
        handleClose={handleCloseMainBannerModal}
        mode={mainMode}
        mainBannerId={mainBannerId}
      />

      <CustomPermissionDialog
        open={openPermissionMainModal}
        handleClose={handleClosePermissionMainModal}
        onClickYes={handleRemoveMainBanner}
      />

      <AddShopBannerModal
        open={openShopBannerModal}
        handleClose={handleCloseShopBannerModal}
        mode={shopMode}
        shopBannerId={shopBannerId}
      />

      <CustomPermissionDialog
        open={openPermissionShopModal}
        handleClose={handleClosePermissionShopModal}
        onClickYes={handleRemoveShopBanner}
      />

    </>
  )
}

export default AdsAndBanners