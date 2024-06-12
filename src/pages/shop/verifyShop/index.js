import React, { useState, useCallback, useEffect } from 'react'
import useStyles from 'pages/shop/addShop/style'
import { Grid, Typography, Tab, Tabs, Box } from '@mui/material'
import OwnerInfo from 'pages/shop/addShop/components/ownerInfo'
import ShopDetails from 'pages/shop/addShop/components/shopDetails'
import Documents from 'pages/shop/addShop/components/documents'
import NomineeDetails from 'pages/shop/addShop/components/nomineeDetails'
import BankDetails from 'pages/shop/addShop/components/bankDetails'
import Plan from 'pages/shop/addShop/components/plan';
import { showLoader, hideLoader } from 'redux/loader/actions';
import { useParams } from 'react-router-dom';
import shopApi from 'services/shop';
import { useDispatch, useSelector } from 'react-redux';
import { getShopById } from 'redux/slices/shop/shopSlice';

const tabListData = [
  { title: `Owner info`, tabIndex: 0, disabled: false },
  { title: 'Shop details', tabIndex: 1, disabled: true },
  { title: 'Documents', tabIndex: 2, disabled: true },
  { title: 'Nominee details', tabIndex: 3, disabled: true },
  { title: 'Bank details', tabIndex: 4, disabled: true },
  { title: 'Plan', tabIndex: 5, disabled: true },
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

const VerifyShop = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles()
  const [TabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0);

  const { currentShop } = useSelector((state) => state.shops);

  const handleTabs = (event, index) => {
    setTabValue(index)
  };

  // Get verify Shop list api
  // const getShopById = useCallback(() => {
  //   dispatch(showLoader('Loading please wait...'))
  //   const onSuccess = (res) => {
  //     dispatch(hideLoader());
  //     if (res?.data?.status === true) {
  //       setShopData(res?.data?.data);
  //     }
  //   }
  //   const onFailure = (err) => {
  //     dispatch(hideLoader());
  //     console.log('get all product category list Api', err)
  //   }
  //   shopApi.getSingleShop(id).then(onSuccess, onFailure)
  // }, [])
  useEffect(() => {
    // getShopById();

    dispatch(getShopById(id));
  }, [dispatch])

  console.log('currentShop', currentShop);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5">Verify Shop</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <section className={classes.tabWrapper}>
            <Tabs
              value={tabValue}
              onChange={handleTabs}
              aria-label="verifyshop"
              variant="scrollable"
              scrollButtons="auto"
              className={classes.tabLabels}
            >
              {TabList?.map(({ title, tabIndex, disabled }) => (
                <Tab
                  label={<Typography variant="body2">{title}</Typography>}
                  {...a11yProps({ tabIndex })}
                  key={title}
                />
              ))}
            </Tabs>
            <Grid item xs={12}>
              {TabList?.map((data) => (
                <TabPanel value={tabValue} index={data?.tabIndex}>
                  {data?.tabIndex === 0 ? (
                    <OwnerInfo
                      data={currentShop}
                      isVerify={true}
                      nextTabIndex={1}
                      tabList={TabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                    />
                  ) : data?.tabIndex === 1 ? (
                    <ShopDetails
                      data={currentShop}
                      isVerify={true}
                      nextTabIndex={2}
                      tabList={TabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                    />
                  ) : data?.tabIndex === 2 ? (
                    <Documents
                      data={currentShop}
                      isVerify={true}
                      nextTabIndex={3}
                      tabList={TabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue} />
                  ) : data?.tabIndex === 3 ? (
                    <NomineeDetails
                      data={currentShop}
                      isVerify={true}
                      nextTabIndex={4}
                      tabList={TabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                    />
                  ) : data?.tabIndex === 4 ? (
                    <BankDetails
                      data={currentShop}
                      isVerify={true}
                      nextTabIndex={5}
                      tabList={TabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                    />
                  ) : data?.tabIndex === 5 ? (
                    <Plan
                      data={currentShop}
                      isVerify={true}
                      nextTabIndex={6}
                      tabList={TabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                    />
                  ) : (
                    <OwnerInfo />
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

export default VerifyShop
