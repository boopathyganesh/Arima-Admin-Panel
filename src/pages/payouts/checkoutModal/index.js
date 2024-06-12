import React, { useState } from 'react'
import useStyles from './style'
import { Grid, Typography, TextField, Autocomplete } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import CustomDialog from 'sharedComponents/customDialog'

const paymentMethodOptions = [
  { label: 'UPI', value: 'upi' },
  { label: 'Cash on hand', value: 'cashonhand' },
  { label: 'Bank transfer', value: 'banktransfer' },
]

const CheckoutModal = (props) => {
  const { open, handleClose } = props
  const classes = useStyles()
  const [paymentMode, setPaymentMode] = useState(null)

  // handle payout checkout
  const handleCheckout = (formValues) => {}

  const formik = useFormik({
    initialValues: {
      date: '',
      paymentMethod: null,
      transactionId: '',
      amount: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      date: yup
        .date()
        .required('Please select payment date')
        .min(moment().subtract(1, 'month'), 'Invalid date')
        .max(moment(), 'Invalid date')
        .nullable(),
      paymentMethod: yup
        .object()
        .required('Please select payment method')
        .nullable(),
      transactionId:
        paymentMode?.value === 'cashonhand'
          ? yup.string().max(30, 'Max 30 characters').nullable()
          : yup
              .string()
              .required('Please enter transaction ID')
              .trim()
              .max(30, 'Max 30 characters')
              .nullable(),
      amount: yup
        .number()
        .required('Please enter amount')
        .typeError('Only numbers are allowed')
        .min(0, 'Amount must be 0 or greater than zero')
        .nullable(),
    }),
    onSubmit: handleCheckout,
  })

  return (
    <>
      <CustomDialog
        open={open}
        handleClose={() => {
          handleClose()
          formik.resetForm()
        }}
        title={'Payout Checkout'}
        btnLabel={'Settle'}
        onSubmit={formik?.handleSubmit}
        containerStyle={classes.containerStyle}
      >
        <Grid container>
          <Grid item xs={12}>
            <section className={classes.detailsContainer}>
              <div className={classes.detailsWrapper}>
                <Typography variant="body1">
                  <span className={classes.detailsKey}>
                    {' '}
                    Customer name &nbsp; :{' '}
                  </span>{' '}
                  <span className={classes.detailsValue}>
                    &nbsp; Frances Ha
                  </span>
                </Typography>
              </div>
              <div className={classes.detailsWrapper}>
                <Typography variant="body1">
                  <span className={classes.detailsKey}> UPI ID &nbsp; : </span>{' '}
                  <span className={classes.detailsValue}>
                    &nbsp; 8667223203@apl
                  </span>
                </Typography>
              </div>
              <div className={classes.detailsWrapper}>
                <Typography variant="body1">
                  <span className={classes.detailsKey}>
                    {' '}
                    Bank account number &nbsp; :{' '}
                  </span>{' '}
                  <span className={classes.detailsValue}>
                    &nbsp; 86672232030913
                  </span>
                </Typography>
              </div>
              <div className={classes.detailsWrapper}>
                <Typography variant="body1">
                  <span className={classes.detailsKey}>
                    {' '}
                    IFSC code &nbsp; :{' '}
                  </span>{' '}
                  <span className={classes.detailsValue}>
                    &nbsp; IDQW123QWE123SA
                  </span>
                </Typography>
              </div>
            </section>
          </Grid>
          <Grid item xs={12}>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    label="Date*"
                    value={formik?.values?.date}
                    onChange={(value) => {
                      formik.setFieldValue('date', value)
                    }}
                    inputFormat="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                    minDate={moment().subtract(1, 'month')}
                    maxDate={moment()}
                    showTodayButton={false}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        error={formik.touched.date && formik.errors.date}
                        helperText={
                          formik.touched.date &&
                          formik.errors.date &&
                          formik.errors.date
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  size="small"
                  fullWidth
                  name="paymentMethod"
                  id="paymentMethod"
                  options={paymentMethodOptions}
                  value={formik?.values?.paymentMethod}
                  getOptionLabel={(option) => option.label || ''}
                  onChange={(e, value) => {
                    formik?.setFieldValue('paymentMethod', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Payment method*"
                      error={
                        formik.touched.paymentMethod &&
                        formik.errors.paymentMethod
                      }
                      helperText={
                        formik.touched.paymentMethod &&
                        formik.errors.paymentMethod &&
                        formik.errors.paymentMethod
                      }
                    />
                  )}
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="transactionId"
                  id="transactionId"
                  value={formik?.values?.transactionId}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Transaction ID*"
                  size="small"
                  error={
                    formik?.errors?.transactionId &&
                    formik?.touched?.transactionId
                  }
                  helperText={
                    formik?.errors?.transactionId &&
                    formik?.touched?.transactionId &&
                    formik?.errors?.transactionId
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="amount"
                  id="amount"
                  value={formik?.values?.amount}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Amount*"
                  size="small"
                  error={formik?.errors?.amount && formik?.touched?.amount}
                  helperText={
                    formik?.errors?.amount &&
                    formik?.touched?.amount &&
                    formik?.errors?.amount
                  }
                />
              </Grid>
            </section>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  )
}

export default CheckoutModal
