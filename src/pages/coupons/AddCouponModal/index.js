import React, { useState, useCallback, useEffect } from 'react'
import CustomDialog from 'sharedComponents/customDialog'
import useStyles from './style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import _ from 'lodash'
import { Grid, TextField, Autocomplete, Typography } from '@mui/material'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import couponApi from 'services/coupon'
import { useDispatch } from 'react-redux'
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import productsApi from 'services/products'
import shopApi from 'services/shop';

import { createCoupon, updateCouponById } from 'redux/slices/coupon/couponSlice';

const discountTypeOptions = [
  { label: 'Percentage', value: 'percentage' },
  { label: 'Rupees', value: 'rupees' },
]
const couponTypeOptions = [
  { label: 'shop wise', value: 'shopwise' },
  { label: 'product wise', value: 'productwise' },
]

const AddCouponModal = (props) => {
  const { open, handleClose, title, btnLabel, mode, couponId, categoryData, editCouponData } = props;

  const classes = useStyles()
  const dispatch = useDispatch()
  const [productCategoryOptions, setProductCategoryOptions] = useState([])
  const [shopOptions, setShopOptions] = useState([])
  const [couponType, setCouponType] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [discountType, setDiscountType] = useState(null)
  const [details, setDetails] = useState(null);

  // save coupon
  const handleCoupon = (formValues) => {
    const data = {
      title: formValues?.title,
      product_category: formValues?.productCategory?._id,
      type: formValues?.couponType?.value,
      shop_category: formValues?.shop?._id,
      code: formValues?.code,
      limitUser: formValues?.limitUser,
      startDate: formValues?.startDate?.toISOString(),
      expiryDate: formValues?.expiryDate?.toISOString(),
      discount_type: formValues?.discountType?.value,
      discount: formValues?.discount,
      maxDiscount: formValues?.maxDiscount,
      minPurchase: formValues?.minPurchase,
    };
    if (data) {
      mode?.toString().toLowerCase() === 'edit' ?
        dispatch(updateCouponById(couponId, data))
        : dispatch(createCoupon(data));
      handleClose();
    };
  }

  const formik = useFormik({
    initialValues: {
      title: editCouponData?.title || '',
      productCategory: editCouponData?.product_category?.productCategoryName || null,
      couponType: editCouponData?.type || null,
      shop: editCouponData?.shop_category?.shop_name || null,
      code: editCouponData?.code || '',
      limitUser: editCouponData?.limitUser || '',
      startDate: editCouponData?.startDate || '',
      expiryDate: editCouponData?.expiryDate || '',
      discountType: editCouponData?.discount_type || null,
      discount: editCouponData?.discount || '',
      maxDiscount: editCouponData?.maxDiscount || '',
      minPurchase: editCouponData?.minPurchase || '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup
        .string()
        .required('Title is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(250, 'Max 250 characters are allowed')
        .nullable(),
      couponType: yup.object().required('Please select coupon type').nullable(),
      shop:
        couponType?.value === 'shopwise'
          ? yup.object().required('Please select a shop').nullable()
          : yup.object().nullable(),
      productCategory:
        couponType?.value === 'productwise'
          ? yup.object().required('Please select product category').nullable()
          : yup.object().nullable(),
      code: yup
        .string()
        .required('Code is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(50, 'Max 50 characters are allowed')
        .nullable(),
      limitUser: yup
        .number()
        .required('Please enter limits for same user')
        .min(1, 'Count must be 1 or greater than 1')
        .typeError('Only numbers are allowed')
        .nullable(),
      startDate: yup
        .date()
        .required('Please select start date')
        .min(moment().subtract(1, 'd'), 'Invalid date')
        .max(moment().add(6, 'months'), 'Invalid date')
        .nullable(),
      expiryDate: yup
        .date()
        .required('Please select end date')
        .min(yup.ref('startDate'), 'Expiry cannot be less than start date')
        .nullable(),
      discountType: yup
        .object()
        .required('Please select discount type')
        .nullable(),
      discount:
        discountType?.value?.toLowerCase() === 'percentage'
          ? yup
            .number()
            .required('Discount is required')
            .max(100, 'Max 100 percentage are allowed')
            .min(0, 'Negative numbers are not allowed')
            .typeError('Only numbers are allowed')
            .nullable()
          : yup
            .number()
            .required('Discount is required')
            .min(0, 'Negative numbers are not allowed')
            .typeError('Only numbers are allowed')
            .nullable(),
      maxDiscount:
        discountType?.label?.toLowerCase() === 'rupees'
          ? yup
            .number()
            .min(0, 'Negative numbers are not allowed')
            .typeError('Only numbers are allowed')
            .nullable()
          : yup
            .number()
            .required('Please enter max discount')
            .min(0, 'Negative numbers are not allowed')
            .typeError('Only numbers are allowed')

            .nullable(),
      minPurchase: yup
        .number()
        .required('Min purchase price is required')
        .min(0, 'Negative numbers are not allowed')
        .typeError('Only numbers are allowed')
        .nullable(),
    }),
    onSubmit: handleCoupon,
  })

  // Get all product category list options api
  const getAllProductCategoryList = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status?.toString().toLowerCase() === 'true') {
        setProductCategoryOptions(res?.data?.data)
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader())
      console.log('get all product category list Api', err)
    }
    // productsApi.getAllProductCategory().then(onSuccess, onFailure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // Get all shop list options api
  const getAllShopList = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status?.toString().toLowerCase() === 'true') {
        setShopOptions(res?.data?.data)
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader())
      console.log('get all shop list Api', err)
    }
    shopApi.getAllActiveShopsList("APPROVED").then(onSuccess, onFailure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    open && getAllProductCategoryList()
    open && getAllShopList()
  }, [getAllProductCategoryList, getAllShopList, open, couponId])


  // Set formvalues for edit
  useEffect(() => {
    if (!_.isEmpty(details)) {

      const category = productCategoryOptions?.find(
        (data) => data?._id === details?.product_category
      )

      const cType = couponTypeOptions?.find(
        (data) => data?.value === details?.type
      )

      const shop = shopOptions?.find(
        (data) => data?._id === details?.shop_category
      )


      console.log(555);
      console.log(shopOptions);

      formik?.setFieldValue('productCategory', category)
      formik?.setFieldValue('shop', shop)
      formik?.setFieldValue('title', details?.title)
      formik?.setFieldValue('couponType', cType)
      formik?.setFieldValue('code', details?.code)
      formik?.setFieldValue('limitUser', details?.limit)
      formik?.setFieldValue('startDate', details?.start_date)
      formik?.setFieldValue('expiryDate', details?.expiry_date)
      formik?.setFieldValue('discountType', details?.discount_type)
      formik?.setFieldValue('discount', details?.discount)
      formik?.setFieldValue('maxDiscount', details?.max_discount)
      formik?.setFieldValue('minPurchase', details?.min_discount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, productCategoryOptions, shopOptions]);
  return (
    <>
      <CustomDialog
        open={open}
        handleClose={() => {
          handleClose()
          formik.resetForm()
          setDetails(null)
        }}
        title={
          mode?.toString().toLowerCase() === 'edit'
            ? 'Edit Coupon'
            : 'Add Coupon'
        }
        btnLabel={mode?.toString().toLowerCase() === 'edit' ? 'Update' : 'Add'}
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
              {/* <Grid item xs={12} sm={6} className={classes.input}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  size="small"
                  fullWidth
                  name="productCategory"
                  id="productCategory"
                  options={productCategoryOptions}
                  value={formik?.values?.productCategory}
                  getOptionLabel={(option) => option.productCategoryName || ''}
                  onChange={(e, value) => {
                    formik?.setFieldValue('productCategory', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product category*"
                      error={
                        formik.touched.productCategory &&
                        formik.errors.productCategory
                      }
                      helperText={
                        formik.touched.productCategory &&
                        formik.errors.productCategory &&
                        formik.errors.productCategory
                      }
                    />
                  )}
                />
              </Grid> */}

              <Grid item xs={12} sm={6} className={classes.input}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  size="small"
                  fullWidth
                  name="couponType"
                  id="couponType"
                  options={couponTypeOptions}
                  value={formik?.values?.couponType}
                  getOptionLabel={(option) => option.label || formik?.values?.couponType}
                  onChange={(e, value) => {
                    formik?.setFieldValue('couponType', value)
                    setCouponType(value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Coupon type*"
                      error={
                        formik.touched.couponType && formik.errors.couponType
                      }
                      helperText={
                        formik.touched.couponType &&
                        formik.errors.couponType &&
                        formik.errors.couponType
                      }
                    />
                  )}
                />
              </Grid>

            </section>
            <section className={classes.fieldWrapper}>
              {couponType?.value === 'shopwise' || editCouponData ? (
                <>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      size="small"
                      fullWidth
                      name="shop"
                      id="shop"
                      options={shopOptions}
                      value={formik?.values?.shop}
                      getOptionLabel={(option) => option.shop_name || formik?.values?.shop}
                      onChange={(e, value) => {
                        formik?.setFieldValue('shop', value)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Shop*"
                          error={formik.touched.shop && formik.errors.shop}
                          helperText={
                            formik.touched.shop &&
                            formik.errors.shop &&
                            formik.errors.shop
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
                      name="productCategory"
                      id="productCategory"
                      options={categoryData}
                      value={formik?.values?.productCategory}
                      getOptionLabel={(option) => option.productCategoryName || formik?.values?.productCategory}
                      onChange={(e, value) => {
                        formik?.setFieldValue('productCategory', value)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Product category*"
                          error={
                            formik.touched.productCategory &&
                            formik.errors.productCategory
                          }
                          helperText={
                            formik.touched.productCategory &&
                            formik.errors.productCategory &&
                            formik.errors.productCategory
                          }
                        />
                      )}
                    />
                  </Grid>
                </>
              ) : couponType?.value === 'productwise' ? (
                <>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      size="small"
                      fullWidth
                      name="productCategory"
                      id="productCategory"
                      options={categoryData}
                      value={formik?.values?.productCategory}
                      getOptionLabel={(option) => option.productCategoryName}
                      onChange={(e, value) => {
                        formik?.setFieldValue('productCategory', value)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Product category*"
                          error={
                            formik.touched.productCategory &&
                            formik.errors.productCategory
                          }
                          helperText={
                            formik.touched.productCategory &&
                            formik.errors.productCategory &&
                            formik.errors.productCategory
                          }
                        />
                      )}
                    />
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6}>
                <div className={classes.infoLabel}>
                  <Typography variant="body2">Validity Date</Typography>
                </div>
                <section className={classes.fieldWrapper}>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <MobileDatePicker
                        label="Start date*"
                        value={formik?.values?.startDate}
                        onChange={(value) => {
                          formik.setFieldValue('startDate', value)
                          value && setStartDate(value)
                        }}
                        inputFormat="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                        minDate={new Date()}
                        maxDate={moment().add(6, 'month')}
                        showTodayButton={false}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            error={
                              formik.touched.startDate &&
                              formik.errors.startDate
                            }
                            helperText={
                              formik.touched.startDate &&
                              formik.errors.startDate &&
                              formik.errors.startDate
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <MobileDatePicker
                        label="Expiry date*"
                        value={formik?.values?.expiryDate}
                        onChange={(value) =>
                          formik.setFieldValue('expiryDate', value)
                        }
                        inputFormat="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                        minDate={new Date()}
                        maxDate={moment().add(1, 'years')}
                        showTodayButton={false}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            error={
                              formik.touched.expiryDate &&
                              formik.errors.expiryDate
                            }
                            helperText={
                              formik.touched.expiryDate &&
                              formik.errors.expiryDate &&
                              formik.errors.expiryDate
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </section>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.infoLabel}>
                  <Typography variant="body2">Coupon Code</Typography>
                </div>
                <section className={classes.fieldWrapper}>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <TextField
                      name="limitUser"
                      id="limitUser"
                      value={formik?.values?.limitUser}
                      onChange={formik?.handleChange}
                      type={'text'}
                      fullWidth
                      variant="outlined"
                      label="Limit user*"
                      size="small"
                      error={
                        formik?.errors?.limitUser && formik?.touched?.limitUser
                      }
                      helperText={
                        formik?.errors?.limitUser &&
                        formik?.touched?.limitUser &&
                        formik?.errors?.limitUser
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <TextField
                      name="code"
                      id="code"
                      value={formik?.values?.code}
                      onChange={(e) => {
                        formik.setFieldValue(
                          'code',
                          e?.target?.value?.toUpperCase()
                        )
                      }}
                      type={'text'}
                      fullWidth
                      variant="outlined"
                      label="Code*"
                      size="small"
                      error={formik?.errors?.code && formik?.touched?.code}
                      helperText={
                        formik?.errors?.code &&
                        formik?.touched?.code &&
                        formik?.errors?.code
                      }
                    />
                  </Grid>
                </section>
              </Grid>
            </section>
            <div className={classes.infoLabel}>
              <Typography variant="body2">Discount Details</Typography>
            </div>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6}>
                <section className={classes.fieldWrapper}>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      size="small"
                      fullWidth
                      name="discountType"
                      id="discountType"
                      options={discountTypeOptions}
                      value={formik?.values?.discountType}
                      getOptionLabel={(option) => option.label || formik?.values?.discountType}
                      onChange={(e, value) => {
                        formik?.setFieldValue('discountType', value)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Discount type*"
                          error={
                            formik.touched.discountType &&
                            formik.errors.discountType
                          }
                          helperText={
                            formik.touched.discountType &&
                            formik.errors.discountType &&
                            formik.errors.discountType
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <TextField
                      name="discount"
                      id="discount"
                      value={formik?.values?.discount}
                      onChange={formik?.handleChange}
                      type={'text'}
                      fullWidth
                      variant="outlined"
                      label="Discount*"
                      size="small"
                      error={
                        formik?.errors?.discount && formik?.touched?.discount
                      }
                      helperText={
                        formik?.errors?.discount &&
                        formik?.touched?.discount &&
                        formik?.errors?.discount
                      }
                    />
                  </Grid>
                </section>
              </Grid>
              <Grid item xs={12} sm={6}>
                <section className={classes.fieldWrapper}>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <TextField
                      name="maxDiscount"
                      id="maxDiscount"
                      value={formik?.values?.maxDiscount}
                      onChange={formik?.handleChange}
                      type={'text'}
                      fullWidth
                      variant="outlined"
                      label="Max discount*"
                      size="small"
                      error={
                        formik?.errors?.maxDiscount &&
                        formik?.touched?.maxDiscount
                      }
                      helperText={
                        formik?.errors?.maxDiscount &&
                        formik?.touched?.maxDiscount &&
                        formik?.errors?.maxDiscount
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.input}>
                    <TextField
                      name="minPurchase"
                      id="minPurchase"
                      value={formik?.values?.minPurchase}
                      onChange={formik?.handleChange}
                      type={'text'}
                      fullWidth
                      variant="outlined"
                      label="Min purchase*"
                      size="small"
                      error={
                        formik?.errors?.minPurchase &&
                        formik?.touched?.minPurchase
                      }
                      helperText={
                        formik?.errors?.minPurchase &&
                        formik?.touched?.minPurchase &&
                        formik?.errors?.minPurchase
                      }
                    />
                  </Grid>
                </section>
              </Grid>
            </section>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  )
}

export default AddCouponModal
