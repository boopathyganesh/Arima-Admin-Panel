import React, { useEffect, useState } from 'react'
import useStyles from './style'
import { Grid, Typography, Tab, Tabs, Box } from '@mui/material';
import tabUseStyles from 'pages/shop/addShop/style'
import OwnerInfo from 'pages/shop/addShop/components/ownerInfo'
import ShopDetails from 'pages/shop/addShop/components/shopDetails'
import Documents from 'pages/shop/addShop/components/documents'
import NomineeDetails from 'pages/shop/addShop/components/nomineeDetails'
import BankDetails from 'pages/shop/addShop/components/bankDetails'
import Plan from 'pages/shop/addShop/components/plan';
import { getShopById } from 'redux/slices/shop/shopSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const tabListData = [
  { title: `Owner info`, tabIndex: 0 },
  { title: 'Shop details', tabIndex: 1 },
  { title: 'Documents', tabIndex: 2 },
  { title: 'Nominee details', tabIndex: 3 },
  { title: 'Bank details', tabIndex: 4 },
  { title: 'Plan', tabIndex: 5 },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props
  const classes = useStyles();


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

const EditShop = () => {
  const classes = useStyles();
  const { id } = useParams();
  const tabClasses = tabUseStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [tabList, setTabList] = useState(tabListData);
  const { currentShop } = useSelector((state) => state.shops);

  useEffect(() => {
    dispatch(getShopById(id));

  }, [dispatch]);

  const handleTabs = (event, index) => {
    setTabValue(index)
  };
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section
            // style={{ paddingInline: 0 }}
            className={tabClasses.tabWrapper}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabs}
              aria-label="verifyshop"
              variant="scrollable"
              scrollButtons="auto"
              className={tabClasses.tabLabels}
            >
              {tabList?.map(({ title, tabIndex, disabled }) => (
                <Tab
                  label={<Typography variant="body2">{title}</Typography>}
                  {...a11yProps({ tabIndex })}
                  key={title}
                // disabled={disabled}
                />
              ))}
            </Tabs>
            <Grid item xs={12}>
              {tabList?.map((data) => (
                <TabPanel value={tabValue} index={data?.tabIndex}>
                  {data?.tabIndex === 0 ? (
                    <OwnerInfo
                      isEdit={true}
                      data={currentShop}
                      nextTabIndex={1}
                      tabList={tabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                    />
                  ) : data?.tabIndex === 1 ? (
                    <ShopDetails
                      isEdit={true}
                      data={currentShop}
                      nextTabIndex={2}
                      tabList={tabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                    />
                  ) : data?.tabIndex === 2 ? (
                    <Documents
                      isEdit={true}
                      data={currentShop}
                      nextTabIndex={3}
                      tabList={tabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}

                    />
                  ) : data?.tabIndex === 3 ? (
                    <NomineeDetails
                      isEdit={true}
                      data={currentShop}
                      nextTabIndex={4}
                      tabList={tabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                    />
                  ) : data?.tabIndex === 4 ? (
                    <BankDetails
                      isEdit={true}
                      data={currentShop}
                      nextTabIndex={5}
                      tabList={tabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                    />
                  ) : data?.tabIndex === 5 ? (
                    <Plan
                      data={currentShop}
                      isEdit={true}
                      nextTabIndex={5}
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

export default EditShop;
