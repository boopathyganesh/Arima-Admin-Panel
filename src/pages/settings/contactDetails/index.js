import React, { useState, useEffect } from 'react'
import useStyles from './style'
import { Grid, Typography, Tab, Tabs, Box } from '@mui/material'
import Customer from './customer'
import Vendor from './vendor';

import { getAllCustomerContact } from 'redux/slices/customerContact/customerContactSlice';
import { getAllVendorContact } from 'redux/slices/vendorContact/vendorContactSlice';
import { useDispatch, useSelector } from 'redux/store';

const tabListData = [
  { title: `Customer`, tabIndex: 0 },
  { title: 'Vendor', tabIndex: 1 },
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

const ContactDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0);
  const [edit, setEdit] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [vendorData, setVendorData] = useState([]);

  const { customerContacts } = useSelector((state) => state.customerContact);
  const { vendorContacts } = useSelector((state) => state.vendorContact);

  const handleTabs = (event, index) => {
    setTabValue(index)
  };

  useEffect(() => {
    dispatch((getAllCustomerContact()));
    dispatch((getAllVendorContact()));
  }, [dispatch]);

  useEffect(() => {
    console.log('customerContacts', customerContacts);
    if (Object.keys(customerContacts).length > 0) {
      setEdit(true);
      setCustomerData(customerContacts);
    } else {
      setEdit(false);
    };
    if (Object.keys(vendorContacts).length > 0) {
      setEdit(true);
      setVendorData(vendorContacts);
    } else {
      setEdit(false);
    }
  }, [customerContacts, vendorContacts])

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5">Contact details</Typography>
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
                />
              ))}
            </Tabs>
            <Grid item xs={12}>
              {tabList?.map((data) => (
                <TabPanel value={tabValue} index={data?.tabIndex}>
                  {data?.tabIndex === 0 ? (
                    <Customer
                      customerData={customerData}
                      isEdit={edit}
                    />
                  ) : data?.tabIndex === 1 ? (
                    <Vendor
                      vendorData={vendorData}
                      isEdit={edit}
                    />
                  ) : (
                    <Customer />
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

export default ContactDetails
