import React from 'react'
import useStyles from '../style'
import { Grid, TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup';


import { createVendorContact, updateVendorContactById } from 'redux/slices/vendorContact/vendorContactSlice';
import { useDispatch } from 'redux/store';

const Vendor = ({ vendorData, isEdit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleContactDetails = async (formValues) => {
    const data = {
      name: formValues?.name,
      phone_number: formValues?.phone_number,
      email: formValues?.email,
      whatsAppNumber: formValues?.whatsAppNumber
    };
    const updateData = {
      _id: vendorData?._id,
      data: data
    };
    if (isEdit) {
      console.log('updateData', updateData);
      await dispatch(updateVendorContactById(updateData))
    } else {
      await dispatch(createVendorContact(formValues))
    }
  }

  const formik = useFormik({
    initialValues: {
      name: vendorData?.name || '',
      phone_number: vendorData?.phone_number || '',
      email: vendorData?.email || '',
      whatsAppNumber: vendorData?.whatsAppNumber || '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Name is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(100, 'Max 100 characters are allowed')
        .nullable(),
      phone_number: yup
        .string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .max(10, `Max 10 digits are allowed`)
        .min(10, `Must be exactly 10 numbers`)
        .nullable(),
      email: yup.string().required('Email id is required').email(),
      whatsAppNumber: yup
        .string()
        .required('Whatsapp mobile number is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .max(10, `Max 10 digits are allowed`)
        .min(10, `Must be exactly 10 numbers`)
        .nullable(),
    }),
    onSubmit: handleContactDetails,
  })

  return (
    <>
      <Grid container className={classes.root}>
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
                name="phone_number"
                id="phone_number"
                value={formik?.values?.phone_number}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Mobile number*"
                size="small"
                error={formik?.errors?.phone_number && formik?.touched?.phone_number}
                helperText={
                  formik?.errors?.phone_number &&
                  formik?.touched?.phone_number &&
                  formik?.errors?.phone_number
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
                label="Email*"
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
                name="whatsAppNumber"
                id="whatsAppNumber"
                value={formik?.values?.whatsAppNumber}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="WhatsApp number*"
                size="small"
                error={
                  formik?.errors?.whatsAppNumber && formik?.touched?.whatsAppNumber
                }
                helperText={
                  formik?.errors?.whatsAppNumber &&
                  formik?.touched?.whatsAppNumber &&
                  formik?.errors?.whatsAppNumber
                }
              />
            </Grid>
          </section>
          <Grid item xs={12} className={classes.btn}>
            <Button
              variant="contained"
              disableElevation
              onClick={formik?.handleSubmit}
            >
               {!isEdit ? "Add" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Vendor
