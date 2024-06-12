import React from 'react'
import useStyles from '../style'
import { Grid, Autocomplete, TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import _ from 'lodash';
import { updateShopByid } from 'redux/slices/shop/shopSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const relationshipOptions = [
  { label: 'Father', value: 'father' },
  { label: 'Mother', value: 'mother' },
  { label: 'Son', value: 'son' },
  { label: 'Daughter', value: 'daughter' },
  { label: 'Brother', value: 'brother' },
  { label: 'Sister', value: 'sister' },
  { label: 'Friend', value: 'friend' },
  { label: 'Others', value: 'others' },
]

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Others', value: 'others' },
]

const NomineeDetails = (props) => {
  const {
    tabList,
    setTabList,
    setTabValue,
    nextTabIndex,
    data,
    isVerify
  } = props
  const classes = useStyles()
  const dispatch = useDispatch();
  const { id } = useParams();

  const nextTab = () => {
    setTabValue(nextTabIndex);
    const updateList = tabList?.map((data) =>
      data?.tabIndex === nextTabIndex
        ? { ...data, disabled: false }
        : { ...data, disabled: true }
    )
    setTabList(updateList);
  };

  const handleNomineeDetails = async (formValues) => {
    dispatch(showLoader('Loading please wait...'))
    const data = {
      nominee_name: formValues?.name,
      nominee_relationship: formValues?.relationship?.value,
      nominee_mobile_number: formValues?.mobileNo,
      nominee_gender: formValues?.gender?.value,
      nominee_address: formValues?.address,
      nominee_info: true,
    };
    const updatedData = {
      id: id,
      data: data
    }
    await dispatch(updateShopByid(updatedData));
    await dispatch(hideLoader());
    await setTabValue(nextTabIndex);
  };

  const formik = useFormik({
    initialValues: {
      // ownerName: null,
      name: data?.nominee_name || '',
      relationship: relationshipOptions.find(option => option.value === data?.nominee_relationship || null),
      mobileNo: data?.nominee_mobile_number || '',
      gender: genderOptions.find(option => option.value === data?.nominee_gender) || null,
      address: data?.nominee_address || '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      // ownerName: yup.object().required('Please select owner name').nullable(),
      name: yup
        .string()
        .required('Nominee name is required')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed')
        .max(100, 'Max 100 characters are allowed')
        .nullable(),
      relationship: yup.object().nullable(),
      mobileNo: yup
        .string()
        .required('Nominee mobile number is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .max(10, `Max 10 digits are allowed`)
        .min(10, `Must be exactly 10 numbers`)
        .nullable(),
      gender: yup.object().nullable(),
      address: yup.string().required('Nominee address is required').nullable(),
    }),
    onSubmit: handleNomineeDetails,
  });

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          {/* <Grid item xs={12} sm={5.9} className={classes.input}>
            <Autocomplete
              disablePortal
              disableClearable
              size="small"
              fullWidth
              name="ownerName"
              id="ownerName"
              options={shopsList}
              value={formik?.values?.ownerName}
              getOptionLabel={(option) => option.name || ''}
              onChange={(e, value) => {
                formik?.setFieldValue('ownerName', value)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Owner name"
                  error={formik.touched.ownerName && formik.errors.ownerName}
                  helperText={
                    formik.touched.ownerName &&
                    formik.errors.ownerName &&
                    formik.errors.ownerName
                  }
                />
              )}
            />
          </Grid> */}
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
                disabled={isVerify}
                error={formik?.errors?.name && formik?.touched?.name}
                helperText={
                  formik?.errors?.name &&
                  formik?.touched?.name &&
                  formik?.errors?.name
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.input}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="relationship"
                disabled={isVerify}
                id="relationship"
                options={relationshipOptions}
                value={formik?.values?.relationship}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => {
                  formik?.setFieldValue('relationship', value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Relationship"
                    error={
                      formik.touched.relationship && formik.errors.relationship
                    }
                    helperText={
                      formik.touched.relationship &&
                      formik.errors.relationship &&
                      formik.errors.relationship
                    }
                  />
                )}
              />
            </Grid>
          </section>
          <section className={classes.fieldWrapper}>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="mobileNo"
                id="mobileNo"
                value={formik?.values?.mobileNo}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Mobile Number*"
                size="small"
                disabled={isVerify}
                error={formik?.errors?.mobileNo && formik?.touched?.mobileNo}
                helperText={
                  formik?.errors?.mobileNo &&
                  formik?.touched?.mobileNo &&
                  formik?.errors?.mobileNo
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.input}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="gender"
                id="gender"
                disabled={isVerify}
                options={genderOptions}
                value={formik?.values?.gender}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => {
                  formik?.setFieldValue('gender', value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Gender"
                    error={formik.touched.gender && formik.errors.gender}
                    helperText={
                      formik.touched.gender &&
                      formik.errors.gender &&
                      formik.errors.gender
                    }
                  />
                )}
              />
            </Grid>
          </section>
          <Grid item xs={12} sm={5.9} className={classes.input}>
            <TextField
              name="address"
              id="address"
              value={formik?.values?.address}
              onChange={formik?.handleChange}
              type={'text'}
              fullWidth
              variant="outlined"
              label="Address*"
              size="small"
              disabled={isVerify}
              multiline
              rows={4}
              error={formik?.errors?.address && formik?.touched?.address}
              helperText={
                formik?.errors?.address &&
                formik?.touched?.address &&
                formik?.errors?.address
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.btnWrapper}>
          {!isVerify &&
            <div className={classes.skipBtn}>
              <Button
                variant="contained"
                disableElevation
                onClick={nextTab}
              >
                Skip
              </Button>
            </div>
          }
          <div className={classes.saveBtn}>
            {isVerify ?
              <Button
                variant="contained"
                disableElevation
                onClick={nextTab}
              >
                Next
              </Button>
              :
              <Button
                variant="contained"
                disableElevation
                onClick={formik?.handleSubmit}
              >
                Next
              </Button>
            }
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default NomineeDetails
