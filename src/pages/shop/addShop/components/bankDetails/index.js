import React from 'react'
import useStyles from '../style'
import { Grid, TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import _ from 'lodash';
import { updateShopByid } from 'redux/slices/shop/shopSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const BankDetails = (props) => {
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

  const handleBankDetails = async (formValues) => {
    dispatch(showLoader('Loading please wait...'))
    const data = {
      account_holder_name: formValues?.name,
      bank_name: formValues?.bankName,
      account_number: formValues?.accountNo,
      ifsc_code: formValues?.ifscCode,
      upi_id: formValues?.upiId,
      bank_info: true,
    }
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
      name: data?.account_holder_name || '',
      bankName: data?.bank_name || '',
      accountNo: data?.account_number || '',
      reAccountNo: data?.account_number || '',
      ifscCode: data?.ifsc_code || '',
      upiId: data?.upi_id || '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Account holder name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Only characters are allowed')
        .max(100, 'Max 100 characters')
        .nullable(),
      bankName: yup
        .string()
        .required('Bank name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Only characters are allowed')
        .max(100, 'Max 100 characters')
        .nullable(),
      accountNo: yup
        .string()
        .required('Account number is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .nullable(),
      reAccountNo: yup
        .string()
        .required('Please Re enter the account number')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .oneOf([yup.ref('accountNo'), null], 'Account number must match')
        .nullable(),
      ifscCode: yup
        .string()
        .required('IFSC code is required')
        .matches(/^[a-zA-Z0-9]+$/i, 'Special characters are not allowed')
        .max(100, 'Max 100 characters')
        .nullable(),
      upiId: yup
        .string()
        .matches(/^[\w.-]+@[\w.-]+$/, 'Enter valid upi id')
        .nullable(),
    }),
    onSubmit: handleBankDetails,
  });

  const nextTab = () => {
    setTabValue(nextTabIndex);
    const updateList = tabList?.map((data) =>
      data?.tabIndex === nextTabIndex
        ? { ...data, disabled: false }
        : { ...data, disabled: true }
    )
    setTabList(updateList)
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          {/* <section className={classes.fieldWrapper}>
            <Grid item xs={12} sm={5.9} className={classes.input}>
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
            </Grid>
          </section> */}
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
                label="Account holder name*"
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
              <TextField
                name="bankName"
                id="bankName"
                value={formik?.values?.bankName}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Bank name*"
                size="small"
                disabled={isVerify}
                error={formik?.errors?.bankName && formik?.touched?.bankName}
                helperText={
                  formik?.errors?.bankName &&
                  formik?.touched?.bankName &&
                  formik?.errors?.bankName
                }
              />
            </Grid>
          </section>
          <section className={classes.fieldWrapper}>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="accountNo"
                id="accountNo"
                value={formik?.values?.accountNo}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Account number*"
                size="small"
                disabled={isVerify}
                error={formik?.errors?.accountNo && formik?.touched?.accountNo}
                helperText={
                  formik?.errors?.accountNo &&
                  formik?.touched?.accountNo &&
                  formik?.errors?.accountNo
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="reAccountNo"
                id="reAccountNo"
                value={formik?.values?.reAccountNo}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Re - Account number*"
                size="small"
                disabled={isVerify}
                error={
                  formik?.errors?.reAccountNo && formik?.touched?.reAccountNo
                }
                helperText={
                  formik?.errors?.reAccountNo &&
                  formik?.touched?.reAccountNo &&
                  formik?.errors?.reAccountNo
                }
              />
            </Grid>
          </section>
          <section className={classes.fieldWrapper}>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="ifscCode"
                id="ifscCode"
                value={formik?.values?.ifscCode}
                onChange={(e) => {
                  formik?.setFieldValue(
                    'ifscCode',
                    e?.target?.value?.toUpperCase()
                  )
                }}
                type={'text'}
                fullWidth
                variant="outlined"
                label="IFSC code*"
                size="small"
                disabled={isVerify}
                error={formik?.errors?.ifscCode && formik?.touched?.ifscCode}
                helperText={
                  formik?.errors?.ifscCode &&
                  formik?.touched?.ifscCode &&
                  formik?.errors?.ifscCode
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="upiId"
                id="upiId"
                value={formik?.values?.upiId}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Upi ID"
                size="small"
                disabled={isVerify}
                error={formik?.errors?.upiId && formik?.touched?.upiId}
                helperText={
                  formik?.errors?.upiId &&
                  formik?.touched?.upiId &&
                  formik?.errors?.upiId
                }
              />
            </Grid>
          </section>
        </Grid>
        <Grid item xs={12} className={classes.btn}>
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
        </Grid>
      </Grid>
    </>
  )
}

export default BankDetails
