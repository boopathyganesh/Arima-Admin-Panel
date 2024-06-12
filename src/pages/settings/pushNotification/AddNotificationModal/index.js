import React, { useState } from 'react'
import CustomDialog from 'sharedComponents/customDialog'
import useStyles from './style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Grid, TextField, Autocomplete, Typography } from '@mui/material'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import _ from 'lodash'
import imageCompression from 'browser-image-compression'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

const sentToOptions = [
  { label: 'Customers', value: 'customers' },
  { label: 'Shops', value: 'shops' },
]

const AddNotificationModal = (props) => {
  const { open, handleClose, title, btnLabel } = props
  const classes = useStyles()
  const [uploadErrors, setUploadErrors] = useState([])

  // save product category
  const handleProductCategory = (formValues) => {}

  const formik = useFormik({
    initialValues: {
      title: '',
      sentTo: '',
      description: '',
      image: '/assets/images/notification1.png',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup
        .string()
        .required('Title is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(100, 'Max 100 characters are allowed'),
      sentTo: yup.object().required('Please select targetted users'),
      description: yup
        .string()
        .required('Description is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(500, 'Max 500 characters are allowed'),
      image: yup.string().required('Please upload a image'),
    }),
    onSubmit: handleProductCategory,
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
      <CustomDialog
        open={open}
        handleClose={() => {
          handleClose()
          formik.resetForm()
        }}
        title={'Add Push Notification'}
        btnLabel={'Add'}
        onSubmit={formik?.handleSubmit}
        containerStyle={classes.containerStyle}
      >
        <Grid container>
          <Grid item xs={12}>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="title"
                  id="title"
                  value={formik?.values?.title}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Title*"
                  size="small"
                  error={formik?.errors?.title && formik?.touched?.title}
                  helperText={
                    formik?.errors?.title &&
                    formik?.touched?.title &&
                    formik?.errors?.title
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  size="small"
                  fullWidth
                  name="sentTo"
                  id="sentTo"
                  options={sentToOptions}
                  value={formik?.values?.sentTo}
                  getOptionLabel={(option) => option.label || ''}
                  onChange={(e, value) => {
                    formik?.setFieldValue('sentTo', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sent To*"
                      error={formik.touched.sentTo && formik.errors.sentTo}
                      helperText={
                        formik.touched.sentTo &&
                        formik.errors.sentTo &&
                        formik.errors.sentTo
                      }
                    />
                  )}
                />
              </Grid>
            </section>
            <Grid item xs={12} sm={5.9} className={classes.input}>
              <TextField
                name="description"
                id="description"
                value={formik?.values?.description}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Description*"
                size="small"
                multiline
                rows={4}
                error={
                  formik?.errors?.description && formik?.touched?.description
                }
                helperText={
                  formik?.errors?.description &&
                  formik?.touched?.description &&
                  formik?.errors?.description
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.uploadWrapper}>
              <section
                className={
                  !_.isEmpty(formik?.values?.image)
                    ? classes.disableWrapper
                    : classes.uploadWrapper
                }
              >
                <ImageUploader
                  upload={handleUpload}
                  title={'Upload notification banner image'}
                  getErrors={true}
                  setUploadErrors={setUploadErrors}
                />
              </section>
              {!_.isEmpty(uploadErrors) && (
                <Grid item xs={12} style={{ paddingBlock: 8 }}>
                  {uploadErrors.map(({ file, errors }) => (
                    <div key={file.path}>
                      {errors?.map((e) => (
                        <Typography
                          style={{ color: 'red' }}
                          variant="subtitle1"
                          key={e.code}
                        >
                          {e.message}
                        </Typography>
                      ))}
                    </div>
                  ))}
                </Grid>
              )}
              <Grid item xs={12} className={classes.error}>
                <Typography variant="subtitle1">
                  {formik?.errors?.image &&
                    formik?.touched?.image &&
                    formik?.errors?.image}
                </Typography>
              </Grid>
              <section className={classes.imgWrapper}>
                <img
                  src={formik?.values?.image}
                  alt="img"
                  className={classes.img}
                />
                <div className={classes.deleteBtnWrapper}>
                  <CloseOutlinedIcon />
                </div>
              </section>
            </Grid>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  )
}

export default AddNotificationModal
