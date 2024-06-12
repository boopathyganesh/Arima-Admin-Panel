import React from 'react'
import { Grid, Typography, TextField, Button } from '@mui/material'
import useStyles from '../style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleSendOtp = (formData) => {}

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      email: yup
        .string()
        .required('Email id is required')
        .email('Enter a valid email')
        .nullable(),
    }),
    onSubmit: handleSendOtp,
  })

  return (
    <>
      <Grid container className={classes.root}>
        <Grid
          item
          xs={0}
          sm={5}
          md={4.5}
          lg={4}
          className={classes.imgContainer}
        >
          <img
            src="/assets/images/loginbanner.svg"
            alt="bannerImg"
            className={classes.img}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          md={7.5}
          lg={8}
          className={classes.fieldContainer}
        >
          <section className={classes.fieldWrapper}>
            <div className={classes.forgotTxt}>
              <Typography variant="h4">Forgot Password</Typography>
            </div>
            <section className={classes.inputsContainer}>
              <Grid item xs={11} sm={10} md={6}>
                <Grid item xs={12} className={classes.input}>
                  <TextField
                    name="email"
                    id="email"
                    value={formik?.values?.email}
                    onChange={formik?.handleChange}
                    type={'text'}
                    fullWidth
                    variant="outlined"
                    size="large"
                    autoFocus
                    placeholder="Email"
                    error={formik?.errors?.email && formik?.touched?.email}
                    helperText={
                      formik?.errors?.email &&
                      formik?.touched?.email &&
                      formik?.errors?.email
                    }
                  />
                </Grid>
                <Grid item xs={12} className={classes.btn}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={formik?.handleSubmit}
                    type="submit"
                    size="large"
                  >
                    Get OTP
                  </Button>
                </Grid>
                <Grid item xs={12} className={classes.captionLabel}>
                  <Typography variant="body1" onClick={() => navigate('/')}>
                    Back to Login
                  </Typography>
                </Grid>
              </Grid>
            </section>
          </section>
        </Grid>
      </Grid>
    </>
  )
}

export default ForgotPassword
