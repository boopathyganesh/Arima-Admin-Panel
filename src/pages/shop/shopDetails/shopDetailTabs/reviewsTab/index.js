import React, { useState } from 'react'
import useStyles from 'pages/shop/addShop/style'
import { Grid, Typography, Tab, Tabs, Box } from '@mui/material'
import ShopReviews from './shopReviews'
import ProductReviews from './productReviews'

const tabListData = [
  { title: `Shop`, tabIndex: 0 },
  { title: 'Products', tabIndex: 1 },
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

const ReviewsTab = () => {
  const classes = useStyles()
  const [tabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0)

  const handleTabs = (event, index) => {
    setTabValue(index)
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section
            style={{ paddingBlock: 0, marginBlockStart: 0 }}
            className={classes.tabWrapper}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabs}
              aria-label="shopreviews"
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
                    <ShopReviews />
                  ) : data?.tabIndex === 1 ? (
                    <ProductReviews />
                  ) : (
                    <ShopReviews />
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

export default ReviewsTab
