import React, { useState } from 'react'
import useStyles from 'pages/products/addProducts/style'
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tab,
  Tabs,
  Box,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import imageCompression from 'browser-image-compression'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import _ from 'lodash'
import UploadImages from './uploadImages'
import UploadExcel from './uploadExcel'

const tabListData = [
  { title: `Upload Product Images`, tabIndex: 0 },
  { title: 'Upload Master Products', tabIndex: 1 },
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

const AddBulkUpload = () => {
  const classes = useStyles()
  const [tabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0)

  const handleTabs = (event, index) => {
    setTabValue(index)
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <section className={classes.tabWrapperVariant}>
            <Tabs
              value={tabValue}
              onChange={handleTabs}
              aria-label="addbulkproducts"
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
                    <UploadImages />
                  ) : data?.tabIndex === 1 ? (
                    <UploadExcel />
                  ) : (
                    <UploadImages />
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

export default AddBulkUpload
