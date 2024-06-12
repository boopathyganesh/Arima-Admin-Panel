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
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  InputAdornment,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import imageCompression from 'browser-image-compression'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import _ from 'lodash'
import DeleteIcon from '@mui/icons-material/Delete'

const roomTypeOptions = [
  { label: 'Kitchen', value: 'kitchen' },
  { label: 'Bathroom', value: 'bathroom' },
  { label: 'Bedroom', value: 'bedroom' },
  { label: 'Living room', value: 'livingroom' },
  { label: 'Study room', value: 'studyroom' },
]

const enviromentOptions = [
  { label: 'Indoor', value: 'indoor' },
  { label: 'Outdoor', value: 'outdoor' },
]

const lightTypeOptions = [
  { label: 'Incandescent Bulbs', value: 'incandescent' },
  { label: 'Halogen  Bulbs', value: 'halogen' },
  { label: 'Compact Fluorescent Lamps (CFLs)', value: 'cfl' },
  { label: 'Light Emitting Diodes (LEDs)', value: 'led' },
  { label: 'Fluorescent Tubes', value: 'fluorescent' },
  { label: 'Tungsten Filament Lamps', value: 'tungsten' },
  { label: 'HID (High-Intensity Discharge) Bulbs', value: 'hid' },
  { label: 'Smart Bulbs', value: 'smart' },
  { label: 'Decorative  Bulbs', value: 'decorative ' },
  { label: 'Specialty   Bulbs', value: 'specialty  ' },
]

const AddLightBulbMaster = (props) => {
  const { mode } = props
  const classes = useStyles()
  const [productImages, setProductImages] = useState([])

  const handleLightBulbs = (formValues) => {}

  const formik = useFormik({
    initialValues: {
      productName: '',
      brandName: '',
      countryOfOrigin: '',
      bulbBase: '',
      roomType: null,
      environment: '',
      wattage: '',
      lightType: null,
      colorTemperature: '',
      lightColor: '',
      specialFeatures: '',
      description: '',
      caution: '',
      image: '/assets/images/notification1.png',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      productName: yup
        .string()
        .required('Product name is required')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/i, 'Special characters are not allowed')
        .min(3, 'Must be at least 3 characters long')
        .max(250, 'Max 250 characters are allowed')
        .nullable(),
      brandName: yup
        .string()
        .required('Brand name is required')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/i, 'Special characters are not allowed')
        .min(3, 'Must be at least 3 characters long')
        .max(250, 'Max 250 characters are allowed')
        .nullable(),
      countryOfOrigin: yup
        .string()
        .required('Country of origin is required')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/i, 'Special characters are not allowed')
        .min(3, 'Must be at least 3 characters long')
        .max(250, 'Max 250 characters are allowed')
        .nullable(),
      bulbBase: yup
        .string()
        .required('Bulb base is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(100, 'Max 100 characters are allowed')
        .nullable(),
      roomType: yup.object().required('Please select room type').nullable(),
      environment: yup
        .object()
        .required('Please select indoor or outdoor')
        .nullable(),
      wattage: yup
        .number()
        .required('Bulb wattage is required')
        .typeError('Only numbers are allowed')
        .nullable(),
      lightType: yup.object().required('Please select light type').nullable(),
      colorTemperature: yup
        .string()
        .required('Color temperature is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(250, 'Max 250 characters are allowed')
        .nullable(),
      lightColor: yup
        .string()
        .required('Light color is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(250, 'Max 250 characters are allowed')
        .nullable(),
      specialFeatures: yup
        .string()
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(500, 'Max 500 characters are allowed')
        .nullable(),
      description: yup
        .string()
        .required('Description is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(500, 'Max 500 characters are allowed')
        .nullable(),
      caution: yup
        .string()
        .required('Caution is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(500, 'Max 500 characters are allowed')
        .nullable(),
    }),
    onSubmit: handleLightBulbs,
  })

  const handleProductImgUpload = async (acceptedFiles) => {
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
      <section className={`${classes.root} ${classes.productContainer}`}>
        <Grid container>
          {/* <Grid item xs={12} className={classes.productTitle}>
            <Typography variant="h6">Add Product</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="productName"
                  id="productName"
                  value={formik?.values?.productName}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Product name*"
                  size="small"
                  error={
                    formik?.errors?.productName && formik?.touched?.productName
                  }
                  helperText={
                    formik?.errors?.productName &&
                    formik?.touched?.productName &&
                    formik?.errors?.productName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="brandName"
                  id="brandName"
                  value={formik?.values?.brandName}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Brand name*"
                  size="small"
                  error={
                    formik?.errors?.brandName && formik?.touched?.brandName
                  }
                  helperText={
                    formik?.errors?.brandName &&
                    formik?.touched?.brandName &&
                    formik?.errors?.brandName
                  }
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="countryOfOrigin"
                  id="countryOfOrigin"
                  value={formik?.values?.countryOfOrigin}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Country of origin*"
                  size="small"
                  error={
                    formik?.errors?.countryOfOrigin &&
                    formik?.touched?.countryOfOrigin
                  }
                  helperText={
                    formik?.errors?.countryOfOrigin &&
                    formik?.touched?.countryOfOrigin &&
                    formik?.errors?.countryOfOrigin
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="bulbBase"
                  id="bulbBase"
                  value={formik?.values?.bulbBase}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Bulb base*"
                  size="small"
                  error={formik?.errors?.bulbBase && formik?.touched?.bulbBase}
                  helperText={
                    formik?.errors?.bulbBase &&
                    formik?.touched?.bulbBase &&
                    formik?.errors?.bulbBase
                  }
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  size="small"
                  fullWidth
                  name="roomType"
                  id="roomType"
                  options={roomTypeOptions}
                  value={formik?.values?.roomType}
                  getOptionLabel={(option) => option.label || ''}
                  onChange={(e, value) => {
                    formik?.setFieldValue('roomType', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Room type*"
                      error={formik.touched.roomType && formik.errors.roomType}
                      helperText={
                        formik.touched.roomType &&
                        formik.errors.roomType &&
                        formik.errors.roomType
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  size="small"
                  fullWidth
                  name="environment"
                  id="environment"
                  options={enviromentOptions}
                  value={formik?.values?.environment}
                  getOptionLabel={(option) => option.label || ''}
                  onChange={(e, value) => {
                    formik?.setFieldValue('environment', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Indoor/Outdoor*"
                      error={
                        formik.touched.environment && formik.errors.environment
                      }
                      helperText={
                        formik.touched.environment &&
                        formik.errors.environment &&
                        formik.errors.environment
                      }
                    />
                  )}
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="wattage"
                  id="wattage"
                  value={formik?.values?.wattage}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Wattage*"
                  size="small"
                  error={formik?.errors?.wattage && formik?.touched?.wattage}
                  helperText={
                    formik?.errors?.wattage &&
                    formik?.touched?.wattage &&
                    formik?.errors?.wattage
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  size="small"
                  fullWidth
                  name="lightType"
                  id="lightType"
                  options={lightTypeOptions}
                  value={formik?.values?.lightType}
                  getOptionLabel={(option) => option.label || ''}
                  onChange={(e, value) => {
                    formik?.setFieldValue('lightType', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Light type*"
                      error={
                        formik.touched.lightType && formik.errors.lightType
                      }
                      helperText={
                        formik.touched.lightType &&
                        formik.errors.lightType &&
                        formik.errors.lightType
                      }
                    />
                  )}
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="colorTemperature"
                  id="colorTemperature"
                  value={formik?.values?.colorTemperature}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Color temperature*"
                  size="small"
                  error={
                    formik?.errors?.colorTemperature &&
                    formik?.touched?.colorTemperature
                  }
                  helperText={
                    formik?.errors?.colorTemperature &&
                    formik?.touched?.colorTemperature &&
                    formik?.errors?.colorTemperature
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <section style={{ width: 80 }}>
                  <TextField
                    name="lightColor"
                    id="lightColor"
                    value={formik?.values?.lightColor}
                    onChange={formik?.handleChange}
                    type={'color'}
                    fullWidth
                    variant="outlined"
                    label="Light color*"
                    size="small"
                    error={
                      formik?.errors?.lightColor && formik?.touched?.lightColor
                    }
                  />
                </section>
                <Grid item xs={12} className={classes.error}>
                  <Typography variant="subtitle1">
                    {formik?.errors?.lightColor &&
                      formik?.touched?.lightColor &&
                      formik?.errors?.lightColor}
                  </Typography>
                </Grid>
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="specialFeatures"
                  id="specialFeatures"
                  value={formik?.values?.specialFeatures}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Special features"
                  size="small"
                  multiline
                  rows={4}
                  error={
                    formik?.errors?.specialFeatures &&
                    formik?.touched?.specialFeatures
                  }
                  helperText={
                    formik?.errors?.specialFeatures &&
                    formik?.touched?.specialFeatures &&
                    formik?.errors?.specialFeatures
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
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
            </section>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="caution"
                id="caution"
                value={formik?.values?.caution}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Caution*"
                size="small"
                multiline
                rows={4}
                error={formik?.errors?.caution && formik?.touched?.caution}
                helperText={
                  formik?.errors?.caution &&
                  formik?.touched?.caution &&
                  formik?.errors?.caution
                }
              />
            </Grid>

            {/* Product images */}
            <Grid item xs={12} className={classes.infoLabel}>
              <Typography variant="body1">Upload product image</Typography>
            </Grid>
            <Grid item xs={12} sm={5.9} className={classes.input}>
              <section
                className={
                  !_.isEmpty(formik?.values?.productMainImg)
                    ? classes.disableWrapper
                    : classes.uploadWrapper
                }
              >
                <ImageUploader
                  upload={handleProductImgUpload}
                  title="Upload product image"
                  multiple={true}
                  maxFiles={3}
                />
              </section>
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
            <Grid item xs={12} className={classes.btn}>
              <Button
                variant="contained"
                disableElevation
                onClick={formik?.handleSubmit}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </section>
    </>
  )
}

export default AddLightBulbMaster
