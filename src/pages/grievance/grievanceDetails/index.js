import React, { useState } from 'react'
import useStyles from './style'
import { Grid, Typography, TextField, Avatar, Button } from '@mui/material'
import moment from 'moment'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

const GrievanceDetails = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { id } = useParams()

  // handle grievance reply
  const handleGrievance = (formValues) => {}

  const formik = useFormik({
    initialValues: {
      reply: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      reply: yup
        .string()
        .required('Please enter the response message')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(1000, 'Max 1000 characters are allowed'),
    }),
    onSubmit: handleGrievance,
  })

  // Open image in new tab
  const viewImage = (url) => {
    window.open(url, '_blank')
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.headerLabel}>
            <Typography variant="h5" onClick={() => navigate(-1)}>
              {' '}
              <ArrowBackIosIcon /> Ticket ID : TKT357QW1
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={5.9}>
          <section className={`${classes.cardContainer} ${classes.container}`}>
            <section className={classes.avatarWrapper}>
              <Avatar src="/assets/images/frances1.png" alt="user" />
              <div>
                <Typography variant="body1">Frances Ha</Typography>
                <div style={{ paddingBlockStart: 6 }}>
                  <Typography variant="body2">
                    Phone Number : 9877899875
                  </Typography>
                </div>
              </div>
            </section>
          </section>
        </Grid>
        <Grid item xs={12}>
          <section className={`${classes.cardWrapper} ${classes.container}`}>
            <Grid item xs={6}>
              <section
                className={`${classes.cardContainer} ${classes.cardHeight}`}
              >
                <div className={classes.infoLabel}>
                  <Typography variant="body1">Damaged product</Typography>
                </div>
                <section className={classes.infoWrapper}>
                  <Typography variant="body2">
                    Date &nbsp; : &nbsp; {moment().format('DD MMM YYYY')}{' '}
                    <span className={classes.greenTime}>
                      {moment().format('hh:mm a')}
                    </span>
                  </Typography>
                </section>
                <section className={classes.infoWrapper}>
                  <Typography variant="body2">
                    Issue Description &nbsp; : &nbsp; Received a damaged
                    product, so need a replacement or a refund
                  </Typography>
                </section>
                <section className={classes.infoWrapper}>
                  <Typography variant="body2">
                    Order ID &nbsp; : &nbsp;{' '}
                    <span className={classes.orderId}>ORD123QWS7</span>
                  </Typography>
                </section>
                <section className={classes.infoWrapper}>
                  <Typography variant="body2">images</Typography>
                </section>
                <section className={classes.imgWrapper}>
                  <img
                    src="/assets/images/notification1.png"
                    alt="img"
                    className={classes.img}
                    onClick={() =>
                      viewImage('/assets/images/notification1.png')
                    }
                  />
                  <img
                    src="/assets/images/notification1.png"
                    alt="img"
                    className={classes.img}
                    onClick={() =>
                      viewImage('/assets/images/notification1.png')
                    }
                  />
                </section>
              </section>
            </Grid>
            <Grid item xs={6}>
              <section
                className={`${classes.cardContainer} ${classes.cardHeight}`}
              >
                <div className={classes.infoLabel}>
                  <Typography variant="body1">Reply</Typography>
                </div>
                <section className={classes.infoWrapper}>
                  <Grid item xs={12}>
                    <TextField
                      name="reply"
                      id="reply"
                      value={formik?.values?.reply}
                      onChange={formik?.handleChange}
                      type={'text'}
                      fullWidth
                      variant="outlined"
                      placeholder="reply message to the issue"
                      size="small"
                      multiline
                      rows={5}
                      error={formik?.errors?.reply && formik?.touched?.reply}
                      helperText={
                        formik?.errors?.reply &&
                        formik?.touched?.reply &&
                        formik?.errors?.reply
                      }
                    />
                  </Grid>
                </section>
                <section className={classes.btnWrapper}>
                  <Button variant="contained" onClick={formik?.handleSubmit}>
                    Submit
                  </Button>
                </section>
              </section>
            </Grid>
          </section>
        </Grid>
      </Grid>
    </>
  )
}

export default GrievanceDetails
