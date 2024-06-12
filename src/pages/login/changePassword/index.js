import React, { useState } from 'react'
import {
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material'
import useStyles from '../style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const ChangePassword = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChangePassword = (formData) => {}

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      password: yup.string().required('Password is required'),
      confirmPassword: yup
        .string()
        .required('Please re-enter your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: handleChangePassword,
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
              <Typography variant="h2">Set new password</Typography>
            </div>
            <section className={classes.inputsContainer}>
              <Grid item xs={11} sm={10} md={6}>
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
                    autoFocus
                    placeholder="New password"
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
                    error={
                      formik?.errors?.password && formik?.touched?.password
                    }
                    helperText={
                      formik?.errors?.password &&
                      formik?.touched?.password &&
                      formik?.errors?.password
                    }
                  />
                </Grid>
                <Grid item xs={12} className={classes.input}>
                  <TextField
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formik?.values?.confirmPassword}
                    onChange={formik?.handleChange}
                    type={showConfirmPassword ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    size="large"
                    placeholder="Re-enter your password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          className={classes.password}
                        >
                          {showConfirmPassword ? (
                            <VisibilityIcon
                              onClick={() => setShowConfirmPassword(false)}
                            />
                          ) : (
                            <VisibilityOffIcon
                              onClick={() => setShowConfirmPassword(true)}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    error={
                      formik?.errors?.confirmPassword &&
                      formik?.touched?.confirmPassword
                    }
                    helperText={
                      formik?.errors?.confirmPassword &&
                      formik?.touched?.confirmPassword &&
                      formik?.errors?.confirmPassword
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
                    Update
                  </Button>
                </Grid>
                <Grid item xs={12} className={classes.captionLabel}>
                  <Typography variant="h6" onClick={() => navigate('/')}>
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

export default ChangePassword
