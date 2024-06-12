import React, { useState } from 'react'
import useStyles from './style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material'
import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'
import imageCompression from 'browser-image-compression'

const ProfileSettings = () => {
  const classes = useStyles()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Max file size
  const maxFileSize = 5242880
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }
  // File length validator
  const fileLengthValidator = (file) => {
    if (file.size > maxFileSize) {
      alert(`File size is larger than ${formatBytes(maxFileSize)}`)
      return {
        code: 'file-too-large',
        message: `File size is larger than ${formatBytes(maxFileSize)}`,
      }
    }
    return null
  }
  // Dropzone props
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxSize: formatBytes(maxFileSize),
    maxFiles: 1,
    accept: 'image/jpeg, image/jpg, image/jpe , image/png',
    validator: fileLengthValidator,
    onDrop: (acceptedFiles) => {
      let fileLength = acceptedFiles.map((file) => file.size)
      if (acceptedFiles && fileLength < maxFileSize) {
        handleUpload(acceptedFiles)
      }
    },
  })

  const handleProfile = (formValues) => {}

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNo: '',
      image: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required('first name is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(100, 'Max 100 characters are allowed')
        .nullable(),
      lastName: yup
        .string()
        .max(100, 'Max 100 characters are allowed')
        .nullable(),
      email: yup.string().email(),
      mobileNo: yup
        .string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .max(10, `Max 10 digits are allowed`)
        .min(10, `Must be exactly 10 numbers`)
        .nullable(),
      image: yup.string().nullable(),
    }),
    onSubmit: handleProfile,
  })

  const handlePassword = (formValues) => {}

  const formik1 = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      newPassword: yup.string().required('Password is required'),
      confirmPassword: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    onSubmit: handlePassword,
  })

  const handleUpload = async (acceptedFiles) => {
    // console.log('hhhhhh', acceptedFiles)
    const imageFile = acceptedFiles;
    console.log('originalFile instanceof Blob', imageFile instanceof Blob) // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)

    const options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    try {
      const compressedFile = await imageCompression(imageFile, options)
      console.log(
        'compressedFile instanceof Blob',
        compressedFile instanceof Blob
      ) // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB

      // await uploadToServer(compressedFile) // write your own logic
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h5">Basic information</Typography>
          </Grid>
          <section className={classes.avatarWrapper}>
            <section className={classes.imgContainer}>
              <img
                src="/assets/images/frances1.png"
                alt="profileImg"
                className={classes.img}
              />
              <div
                {...getRootProps()}
                onClick={open}
                className={classes.camIcon}
              >
                <input {...getInputProps()} />
                <CameraEnhanceOutlinedIcon />
              </div>
            </section>
          </section>
          <section className={classes.fieldWrapper}>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="firstName"
                id="firstName"
                value={formik?.values?.firstName}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="First name*"
                size="small"
                error={formik?.errors?.firstName && formik?.touched?.firstName}
                helperText={
                  formik?.errors?.firstName &&
                  formik?.touched?.firstName &&
                  formik?.errors?.firstName
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="lastName"
                id="lastName"
                value={formik?.values?.lastName}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Last name"
                size="small"
                error={formik?.errors?.lastName && formik?.touched?.lastName}
                helperText={
                  formik?.errors?.lastName &&
                  formik?.touched?.lastName &&
                  formik?.errors?.lastName
                }
              />
            </Grid>
          </section>
          <section className={classes.fieldWrapper}>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="email"
                id="email"
                value={formik?.values?.email}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Email"
                size="small"
                error={formik?.errors?.email && formik?.touched?.email}
                helperText={
                  formik?.errors?.email &&
                  formik?.touched?.email &&
                  formik?.errors?.email
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="mobileNo"
                id="mobileNo"
                value={formik?.values?.mobileNo}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Mobile number*"
                size="small"
                error={formik?.errors?.mobileNo && formik?.touched?.mobileNo}
                helperText={
                  formik?.errors?.mobileNo &&
                  formik?.touched?.mobileNo &&
                  formik?.errors?.mobileNo
                }
              />
            </Grid>
          </section>
          <section className={classes.btn}>
            <Button variant="contained" onClick={formik?.handleSubmit}>
              Update
            </Button>
          </section>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h5">Change your password</Typography>
          </Grid>
          <section className={classes.fieldWrapper}>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="newPassword"
                id="newPassword"
                value={formik?.values?.newPassword}
                onChange={formik?.handleChange}
                type={showNewPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                size="small"
                label="New password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className={classes.password}>
                      {showNewPassword ? (
                        <VisibilityIcon
                          onClick={() => setShowNewPassword(false)}
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={() => setShowNewPassword(true)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                error={
                  formik?.errors?.newPassword && formik?.touched?.newPassword
                }
                helperText={
                  formik?.errors?.newPassword &&
                  formik?.touched?.newPassword &&
                  formik?.errors?.newPassword
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="confirmPassword"
                id="confirmPassword"
                value={formik?.values?.confirmPassword}
                onChange={formik?.handleChange}
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                size="small"
                label="Confirm password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className={classes.password}>
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
          </section>
          <section className={classes.btn}>
            <Button variant="contained" onClick={formik1?.handleSubmit}>
              Update
            </Button>
          </section>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfileSettings
