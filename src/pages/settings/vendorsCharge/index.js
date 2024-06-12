import React, { useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography, Button, Divider } from '@mui/material'
import _ from 'lodash'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import AddPlanModal from './addPlanModal'

const planData = [
  {
    planName: 'Free Plan',
    price: 0,
    validityType: 'month',
    validity: 3,
    discount: 30,
    discountedPrice: 0,
    planCaption: 'Free plan to explore our application',
    features: [
      'Create personal dashboard',
      'Perfect package for online store',
      'Create personal dashboard',
      'Perfect package for online store',
    ],
  },
  {
    planName: 'Pro Plan',
    price: 2000,
    validityType: 'year',
    validity: 1,
    discount: 20,
    discountedPrice: 1800,
    planCaption: 'Take advantage and explore our application',
    features: [
      'Create personal dashboard',
      'Perfect package for online store',
      'Create personal dashboard',
      'Perfect package for online store',
    ],
  },
  {
    planName: 'Premium Plan',
    price: 2737,
    validityType: 'month',
    validity: 6,
    discount: 0,
    discountedPrice: 2737,
    planCaption: 'Full advantages of our features and explore our application',
    features: [
      'Create personal dashboard',
      'Perfect package for online store',
      'Create personal dashboard',
      'Perfect package for online store',
    ],
  },
]

const VendorsCharge = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const [openPlanModalModal, setOpenPlanModalModal] = useState(false)

  // handle vendors charge plan modal
  const handleOpenPlanModal = () => {
    setOpenPlanModalModal(true)
  }
  const handleClosePlanModal = () => {
    setOpenPlanModalModal(false)
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Vendor charge</Typography>
              </div>
            </section>
            <section className={classesTable.addBtn}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleOpenPlanModal}
              >
                <AddIcon /> Add
              </Button>
            </section>
          </section>
        </Grid>
        <Grid item xs={12}>
          <section className={classes.container}>
            <div className={classes.label}>
              <Typography variant="h6">Plan List</Typography>
            </div>
            <section className={classes.planWrapper}>
              {planData?.map((data) => (
                <Grid item xs={12} sm={6} md={4}>
                  <section className={classes.planContainer}>
                    <div className={classes.title}>
                      <Typography variant="h5">{data?.planName}</Typography>
                    </div>
                    <div className={classes.price}>
                      <Typography variant="h5">
                        &#x20b9;{' '}
                        {data?.discount !== 0
                          ? data?.discountedPrice
                          : data?.price}{' '}
                        <span className={classes.themeColor}>/</span>
                        <span
                          className={`${classes.validityLabel} ${classes.themeColor}`}
                        >
                          &nbsp;{data?.validity} &nbsp;
                          {data?.validityType}
                        </span>
                      </Typography>
                    </div>
                    {data?.price === 0 || data?.discount === 0 ? (
                      ''
                    ) : (
                      <div className={`${classes.discountWrapper}`}>
                        <Typography variant="body2">
                          {data?.discount}% off
                        </Typography>
                      </div>
                    )}
                    <div
                      className={`${classes.planCaption} ${classes.themeColor} `}
                    >
                      <Typography variant="body2">
                        {data?.planCaption}
                      </Typography>
                    </div>
                    <div className={classes.divider}>
                      <Divider />
                    </div>
                    <div className={classes.featuresWrapper}>
                      <div className={classes.featureContainer}>
                        <Typography variant="body2">
                          <CheckIcon /> Create personal dashboard
                        </Typography>
                      </div>
                      <div className={classes.featureContainer}>
                        <Typography variant="body2">
                          <CheckIcon /> Perfect package for online store
                        </Typography>
                      </div>
                      <div className={classes.featureContainer}>
                        <Typography variant="body2">
                          <CheckIcon /> Create personal dashboard
                        </Typography>
                      </div>
                      <div className={classes.featureContainer}>
                        <Typography variant="body2">
                          <CheckIcon /> Perfect package for online store
                        </Typography>
                      </div>
                    </div>
                  </section>
                </Grid>
              ))}
            </section>
          </section>
        </Grid>
      </Grid>
      <AddPlanModal
        open={openPlanModalModal}
        handleClose={handleClosePlanModal}
      />
    </>
  )
}

export default VendorsCharge
