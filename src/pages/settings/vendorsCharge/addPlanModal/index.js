import React, { useEffect, useState } from 'react'
import CustomDialog from 'sharedComponents/customDialog'
import useStyles from './style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Grid, TextField, Typography, Autocomplete } from '@mui/material'
import _ from 'lodash'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

const validityTypeOptions = [
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
]

const AddPlanModal = (props) => {
  const { open, handleClose } = props
  const classes = useStyles()
  const [features, setFeatures] = useState([])

  // save plan
  const handlePlan = (formValues) => {}

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
      price: '',
      validityType: null,
      validity: '',
      discount: '',
      feature: '',
      features: '',
      commissionPercent: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Plan name is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(250, 'Max 250 characters are allowed'),
      title: yup
        .string()
        .required('Plan title is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(500, 'Max 500 characters are allowed'),
      price: yup
        .number()
        .required('Please provide a price for plan')
        .typeError('Only numbers are allowed')
        .min(0, 'Price must be 0 or greater than 0'),
      validityType: yup
        .object()
        .required('Please select a validity type')
        .nullable(),
      validity: yup
        .number()
        .required('Please provide a validity for plan')
        .typeError('Only numbers are allowed')
        .min(1, 'Validity must be 1 or greater than 1'),
      discount: yup
        .number()
        .required('Please provide a discount for plan')
        .typeError('Only numbers are allowed')
        .min(0, 'Discount must be 0 or greater than 0'),
      feature: yup.string(),
      features: yup.string().required('Please add plan features'),
      commissionPercent: yup
        .number()
        .required('Please provide a commission percent for plan')
        .typeError('Only numbers are allowed')
        .min(0, 'Commission must be 0 or greater than 0'),
    }),
    onSubmit: handlePlan,
  })

  // Features error handling
  useEffect(() => {
    if (_.isEmpty(features)) {
      formik?.setFieldValue('features', '')
    } else {
      formik?.setFieldValue('features', 'features')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [features])

  // save feature
  const handleAddFeature = (e) => {
    if (!_.isEmpty(formik?.values?.feature)) {
      setFeatures((prevState) => [...prevState, formik?.values?.feature])
      formik?.setFieldValue('feature', '')
    }
  }

  // Remove feature
  const handleRemoveFeature = (idx) => {
    const updatedFeatures = features.filter((data, index) => index !== idx)
    setFeatures(updatedFeatures)
  }

  return (
    <>
      <CustomDialog
        open={open}
        handleClose={() => {
          handleClose()
          formik.resetForm()
          setFeatures([])
        }}
        title={'Add Plan'}
        btnLabel={'Add'}
        onSubmit={formik?.handleSubmit}
        containerStyle={classes.containerStyle}
      >
        <Grid container>
          <Grid item xs={12}>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="name"
                  id="name"
                  value={formik?.values?.name}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Name*"
                  size="small"
                  error={formik?.errors?.name && formik?.touched?.name}
                  helperText={
                    formik?.errors?.name &&
                    formik?.touched?.name &&
                    formik?.errors?.name
                  }
                />
              </Grid>
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
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <div className={classes.infoLabel}>
                  <Typography variant="body2">Price details</Typography>
                </div>
                <TextField
                  name="price"
                  id="price"
                  value={formik?.values?.price}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Price*"
                  size="small"
                  error={formik?.errors?.price && formik?.touched?.price}
                  helperText={
                    formik?.errors?.price &&
                    formik?.touched?.price &&
                    formik?.errors?.price
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <div className={classes.infoLabel}>
                  <Typography variant="body2">Validity details</Typography>
                </div>
                <section className={classes.fieldWrapper}>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      size="small"
                      fullWidth
                      name="validityType"
                      id="validityType"
                      options={validityTypeOptions}
                      value={formik?.values?.validityType}
                      getOptionLabel={(option) => option.label || ''}
                      onChange={(e, value) => {
                        formik?.setFieldValue('validityType', value)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Validity type*"
                          error={
                            formik.touched.validityType &&
                            formik.errors.validityType
                          }
                          helperText={
                            formik.touched.validityType &&
                            formik.errors.validityType &&
                            formik.errors.validityType
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="validity"
                      id="validity"
                      value={formik?.values?.validity}
                      onChange={formik?.handleChange}
                      type={'text'}
                      fullWidth
                      variant="outlined"
                      label="Validity*"
                      size="small"
                      error={
                        formik?.errors?.validity && formik?.touched?.validity
                      }
                      helperText={
                        formik?.errors?.validity &&
                        formik?.touched?.validity &&
                        formik?.errors?.validity
                      }
                    />
                  </Grid>
                </section>
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <div className={classes.infoLabel}>
                  <Typography variant="body2">Plan discount</Typography>
                </div>
                <TextField
                  name="discount"
                  id="discount"
                  value={formik?.values?.discount}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Discount in %*"
                  size="small"
                  error={formik?.errors?.discount && formik?.touched?.discount}
                  helperText={
                    formik?.errors?.discount &&
                    formik?.touched?.discount &&
                    formik?.errors?.discount
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <div className={classes.infoLabel}>
                  <Typography variant="body2">Plan commission</Typography>
                </div>
                <TextField
                  name="commissionPercent"
                  id="commissionPercent"
                  value={formik?.values?.commissionPercent}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Commission percent (%)*"
                  size="small"
                  error={
                    formik?.errors?.commissionPercent &&
                    formik?.touched?.commissionPercent
                  }
                  helperText={
                    formik?.errors?.commissionPercent &&
                    formik?.touched?.commissionPercent &&
                    formik?.errors?.commissionPercent
                  }
                />
              </Grid>
            </section>
            <div className={classes.infoLabel}>
              <Typography variant="body2">Add features</Typography>
            </div>
            <Grid item xs={12} sm={5.9} className={classes.input}>
              <TextField
                name="feature"
                id="feature"
                value={formik?.values?.feature}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                placeholder="Enter the feature"
                size="small"
                InputProps={{
                  endAdornment: (
                    <div className={classes.addBtn}>
                      <Typography
                        variant="subtitle1"
                        onClick={handleAddFeature}
                      >
                        Add
                      </Typography>
                    </div>
                  ),
                }}
              />
            </Grid>
            <div className={classes.featuresWrapper}>
              {features?.map((data, idx) => (
                <div className={classes.featureContainer}>
                  <div className={classes.checkIcon}>
                    <CheckIcon />
                  </div>
                  <Typography variant="body2">{data} </Typography>
                  <div className={classes.clearIcon}>
                    <ClearIcon onClick={() => handleRemoveFeature(idx)} />
                  </div>
                </div>
              ))}
            </div>
            <Grid item xs={12} className={classes.error}>
              <Typography variant="subtitle1">
                {formik?.errors?.features &&
                  formik?.touched?.features &&
                  formik?.errors?.features}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  )
}

export default AddPlanModal
