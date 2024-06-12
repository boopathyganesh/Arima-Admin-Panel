import React from 'react'
import { Grid, Typography, TextField, Button } from '@mui/material'
import useStyles from '../style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input'

const EmailVerification = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleOtpVerification = (formValues) => {}

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      otp: yup
        .string('Only numbers are allowed')
        .required('Please enter the otp')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .max(4, `Max 4 digits are allowed`)
        .min(4, `Must be exactly 4 digits`)
        .nullable(),
    }),
    onSubmit: handleOtpVerification,
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
              <Typography variant="h3">Verification Code</Typography>
            </div>
            <div className={classes.forgotTxtCaption}>
              <Typography variant="body1">
                We’ve sent a code to{' '}
                <span className={classes.bold}>admin123@gmail.com</span>
              </Typography>
            </div>
            <section className={classes.inputsContainer}>
              <Grid item xs={11} sm={10} md={6}>
                <Grid item xs={12} className={classes.otpContainer}>
                  <OtpInput
                    isInputNum={true}
                    hasErrored={true}
                    value={formik?.values?.otp}
                    onChange={(value) => formik?.setFieldValue('otp', value)}
                    numInputs={4}
                    renderSeparator={
                      <span style={{ paddingInline: 12 }}></span>
                    }
                    renderInput={(props) => <input {...props} />}
                    shouldAutoFocus={true}
                    focusStyle={{
                      border: '2px solid #000',
                      outline: 'none',
                    }}
                    inputStyle={{
                      width: '50px',
                      height: '50px',
                      // margin: '0 1rem',
                      fontSize: '20px',
                      borderRadius: 4,
                      border: '1px solid rgba(0,0,0,0.3)',
                    }}
                  />
                </Grid>
                <Grid item xs={12} className={classes.otpError}>
                  <Typography variant="body2">
                    {formik?.errors?.otp &&
                      formik?.touched?.otp &&
                      formik?.errors?.otp}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.btn}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={formik?.handleSubmit}
                    type="submit"
                    size="large"
                  >
                    Verify OTP
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

export default EmailVerification
