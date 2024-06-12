import React, { useState, useCallback, useEffect } from 'react'
import useStyles from './style'
import { Grid, Typography, Tab, Tabs, Box } from '@mui/material'
import OwnerInfo from './components/ownerInfo'
import ShopDetails from './components/shopDetails'
import Documents from './components/documents'
import NomineeDetails from './components/nomineeDetails'
import BankDetails from './components/bankDetails'
import Plan from './components/plan'
import shopApi from 'services/shop'
import { useDispatch } from 'react-redux'
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'

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

const AddShop = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentShopId = localStorage.getItem('currentShopId')
  const [tabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0)
  const [shopsList, setShopsList] = useState([])

  const handleTabs = (event, index) => {
    setTabValue(index)
  }

  // Get all shops list
  const getAllShopsList = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status?.toString().toLowerCase() === 'true') {
        setShopsList(res?.data?.data)
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
      console.log('get all shops list', err)
    }
    shopApi.getAllActiveShopsList().then(onSuccess, onFailure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    getAllShopsList()
  }, [getAllShopsList])

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5">Add Shop</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <section className={classes.tabWrapper}>
            <Tabs
              value={tabValue}
              onChange={handleTabs}
              aria-label="addshop"
              variant="scrollable"
              scrollButtons="auto"
              className={classes.tabLabels}
            >
              {tabList?.map(({ title, tabIndex, disabled }) => (
                <Tab
                  label={<Typography variant="body2">{title}</Typography>}
                  {...a11yProps({ tabIndex })}
                  key={title}
                  disabled={disabled}
                />
              ))}
            </Tabs>
            <Grid item xs={12}>
              {tabList?.map((data) => (
                <TabPanel value={tabValue} index={data?.tabIndex}>
                  {data?.tabIndex === 0 ? (
                    <OwnerInfo
                      tabList={tabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                      nextTabIndex={1}
                    />
                  ) : data?.tabIndex === 1 ? (
                    <ShopDetails
                      tabList={tabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                      nextTabIndex={2}
                      shopsList={shopsList}
                      currentShopId={currentShopId}
                    />
                  ) : data?.tabIndex === 2 ? (
                    <Documents
                      tabList={tabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                      nextTabIndex={3}
                      shopsList={shopsList}
                      currentShopId={currentShopId}
                    />
                  ) : data?.tabIndex === 3 ? (
                    <NomineeDetails
                      tabList={tabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                      nextTabIndex={4}
                      shopsList={shopsList}
                      currentShopId={currentShopId}
                    />
                  ) : data?.tabIndex === 4 ? (
                    <BankDetails
                      tabList={tabList}
                      setTabList={setTabList}
                      setTabValue={setTabValue}
                      nextTabIndex={5}
                      shopsList={shopsList}
                      currentShopId={currentShopId}
                    />
                  ) : data?.tabIndex === 5 ? (
                    <Plan />
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

export default AddShop
