import React, { useState, useCallback, useEffect } from 'react'
import useStyles from './style'
import { Grid, Typography, Tab, Tabs, Box } from '@mui/material'
import AddShopProducts from 'pages/products/addProducts/components/addShopProducts'
import AddMasterListProducts from 'pages/products/addProducts/components/addMasterListProducts'
import AddBulkUpload from 'pages/products/addProducts/components/addBulkUpload';
import { showLoader, hideLoader } from 'redux/loader/actions';
import { useDispatch } from 'react-redux';
import productCategoryApi from 'services/productCategory';
import shopApi from 'services/shop';
import AddLightBulbs from './components/addShopProducts/shopProducts/addLightBulbs'


const tabListData = [
  { title: `Shop`, tabIndex: 0 },
  { title: 'Master List', tabIndex: 1 },
  { title: 'bulk Upload', tabIndex: 2 },
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

const AddProducts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0);
  const [shopListOptions, setShopListOptions] = useState([]);
  const [productCategorycOptions, setProductCategoryOptions] = useState([]);

  const handleTabs = (event, index) => {
    setTabValue(index)
  };

  const getProductCategoryList = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader());
      if (res?.data?.status === true) {
        setProductCategoryOptions(res?.data?.data);
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader());
      console.log('get all product category list Api', err)
    }
    productCategoryApi.getAllProductCategory("APPROVED").then(onSuccess, onFailure)
  }, [])

  const getShopList = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader());
      if (res?.data?.status === true) {
        setShopListOptions(res?.data?.data);
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader());
      console.log('get all product category list Api', err)
    }
    shopApi.getAllActiveShopsList("APPROVED").then(onSuccess, onFailure)
  }, []);


  useEffect(() => {
    getProductCategoryList();
    getShopList();
  }, [getProductCategoryList, getShopList]);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5">Add Products</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <section className={classes.tabWrapper}>
            <Tabs
              value={tabValue}
              onChange={handleTabs}
              aria-label="addproducts"
              variant="scrollable"
              scrollButtons="auto"
              className={classes.tabLabels}
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
                    // <AddShopProducts />
                    <Grid container className={classes.container}>
                      <AddLightBulbs shopListData={shopListOptions} productCategoryData={productCategorycOptions} />
                    </Grid>
                  ) : data?.tabIndex === 1 ? (
                    <AddMasterListProducts />
                  ) : data?.tabIndex === 2 ? (
                    <AddBulkUpload />
                  ) : (
                    // <AddShopProducts />
                    <Grid container className={classes.container}>
                      <AddLightBulbs shopListData={shopListOptions} productCategoryData={productCategorycOptions} />
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

export default AddProducts
