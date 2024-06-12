import React, { useState, useEffect } from 'react'
import useStyles from './style'
import tabUseStyles from 'pages/shop/addShop/style'
import { Grid, Typography, Tab, Tabs, Box } from '@mui/material'
import OrdersTab from './ordersTab'
import ProductsTab from './productsTab'
import CategoryTab from './categoryTab'
import ReviewsTab from './reviewsTab';
import { useDispatch, useSelector } from 'react-redux'

import { getOrderByShopId } from 'redux/slices/orders/orderSlice';
import { getAllProductsByShop } from 'redux/slices/product/productSlice';
import { getAllProductCategoriesByShop } from 'redux/slices/productCategory/productCategorySlice';
import { getShopById } from 'redux/slices/shop/shopSlice';

const tabListData = [
  { title: `Orders`, tabIndex: 0 },
  { title: `Products`, tabIndex: 1 },
  { title: `Category`, tabIndex: 2 },
  { title: `Reviews`, tabIndex: 3 }
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

const ShopDetailTabs = ({ shopId }) => {
  const classes = useStyles()
  const tabClasses = tabUseStyles()
  const [TabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();

  const { ordersByshop } = useSelector((state) => state.order);
  const { allShopProducts } = useSelector((state) => state.products);
  const { allShopProductCategories } = useSelector((state) => state.productCategory);
  const { currentShop } = useSelector((state) => state.shops);

  useEffect(() => {
    dispatch(getOrderByShopId(shopId));
    dispatch(getAllProductsByShop(shopId));
    dispatch(getAllProductCategoriesByShop(shopId));
    dispatch(getShopById(shopId));

  }, [dispatch]);

  const handleTabs = (event, index) => {
    setTabValue(index)
  };
  console.log('currentShop', currentShop);
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section
            style={{ paddingInline: 0 }}
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
              {TabList?.map(({ title, tabIndex, disabled }) => (
                <Tab
                  label={<Typography variant="body2">{title}</Typography>}
                  {...a11yProps({ tabIndex })}
                  key={title}
                // disabled={disabled}
                />
              ))}
            </Tabs>
            <Grid item xs={12}>
              {TabList?.map((data) => (
                <TabPanel value={tabValue} index={data?.tabIndex}>
                  {data?.tabIndex === 0 ? (
                    <OrdersTab datas={ordersByshop} />
                  ) : data?.tabIndex === 1 ? (
                    <ProductsTab shopId={shopId} datas={allShopProducts} />
                  ) : data?.tabIndex === 2 ? (
                    <CategoryTab shopId={shopId} datas={allShopProductCategories} />
                  ) : data?.tabIndex === 3 ? (
                    <ReviewsTab />
                  ) :  (
                    <OrdersTab />
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

export default ShopDetailTabs
