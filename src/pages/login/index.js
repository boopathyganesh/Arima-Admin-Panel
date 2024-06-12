import React, { useState } from 'react'
import {
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material'
import useStyles from './style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import loginApi from 'services/login'
import { useDispatch } from 'react-redux'
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import { setAuthentication } from 'redux/authentication/actions'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (formData) => {
    dispatch(showLoader('Loading please wait...'))
    const data = {
      email: formData?.email,
      password: formData?.password,
    }
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status?.toString().toLowerCase() === 'true') {
        dispatch(
          showSnackbar({
            message: res?.data?.message || 'Loggedin successfully',
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            variant: 'success',
          })
        )
        dispatch(setAuthentication(res?.data?.data))
        navigate('/dashboard')
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
      console.log('login Api', err)
    }
    loginApi.login({ ...data }).then(onSuccess, onFailure)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      email: yup
        .string()
        .required('Email id is required')
        .email('Enter a valid email')
        .nullable(),
      password: yup.string().required('Password is required').nullable(),
    }),
    onSubmit: handleLogin,
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
          <form style={{ width: '100%' }}>
            <section className={classes.fieldWrapper}>
              <div className={classes.signInTxt}>
                <Typography variant="h4">Sign in</Typography>
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
                  <Grid item xs={12} className={classes.input}>
                    <TextField
                      name="password"
                      id="password"
                      value={formik?.values?.password}
                      onChange={formik?.handleChange}
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      variant="outlined"
                      size="large"
                      placeholder="Password"
                      error={
                        formik?.errors?.password && formik?.touched?.password
                      }
                      helperText={
                        formik?.errors?.password &&
                        formik?.touched?.password &&
                        formik?.errors?.password
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.password}
                          >
                            {showPassword ? (
                              <VisibilityIcon
                                onClick={() => setShowPassword(false)}
                              />
                            ) : (
                              <VisibilityOffIcon
                                onClick={() => setShowPassword(true)}
                              />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.forgotLabel}>
                    <Typography
                      variant="body1"
                      onClick={() => navigate('/forgotpassword')}
                    >
                      Forgot Password?
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
                      Get started
                    </Button>
                  </Grid>
                </Grid>
              </section>
            </section>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
