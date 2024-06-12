import React, { useState, useEffect } from 'react'
import useStyles from '../style'
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ImageUploader from '../imageUploader'
import _ from 'lodash'
import imageCompression from 'browser-image-compression'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import shopApi from 'services/shop'
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import { imageUrl } from 'constants'
import moment from 'moment';
import { uploadShopImage, createShop, updateShopByid } from 'redux/slices/shop/shopSlice';
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

const holidayOptions = [
  { label: 'Sunday', value: 'sunday' },
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
]

const ShopDetails = (props) => {
  const {
    mode,
    tabList,
    setTabList,
    setTabValue,
    nextTabIndex,
    shopsList,
    currentShopId,
    data,
    isVerify,
    isEdit
  } = props
  const classes = useStyles()
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleShopDetails = async (formValues) => {
    console.log('formValues', formValues);
    const data = {
      shop_name: formValues?.shop_name,
      shop_mobile_number: formValues?.shop_mobile_number,
      open_time:
        moment().format('YYYY-MM-DD') +
        ' ' +
        moment(formValues?.values?.shopOpeningTime).format('HH:mm:ss'),
      close_time:
        moment().format('YYYY-MM-DD') +
        ' ' +
        moment(formValues?.values?.shopClosingTime).format('HH:mm:ss'),
      holiday: formValues?.holiday?.map((data) => data?.value).toString(),
      shop_address: formValues?.shopAddress,
      shop_description: formValues?.shopDescription,
      shop_image: formValues?.shop_image,
      shop_info: true,
    }
    if (isEdit) {
      const updatedData = {
        id: id,
        data: data
      }
      await dispatch(updateShopByid(updatedData));
      await setTabValue(nextTabIndex);
      const updateList = tabList?.map((data) =>
        data?.tabIndex === nextTabIndex
          ? { ...data, disabled: false }
          : { ...data, disabled: true }
      );
      console.log('updateList', updateList);
      await setTabList(updateList)
    } else {
      const response = await dispatch(createShop(data));
      if (response) {
        const vendorId = response.payload.id;
        await navigate(`/shopEdit/${vendorId}`)
      }
    }
    // dispatch(showLoader('Loading please wait...'))
    // const data = {
    //   shop_name: formValues?.shop_name,
    //   shop_mobile_number: formValues?.shop_mobile_number,
    //   open_time:
    //     moment().format('YYYY-MM-DD') +
    //     ' ' +
    //     moment(formValues?.values?.shopOpeningTime).format('HH:mm:ss'),
    //   close_time:
    //     moment().format('YYYY-MM-DD') +
    //     ' ' +
    //     moment(formValues?.values?.shopClosingTime).format('HH:mm:ss'),
    //   holiday: formValues?.holiday?.map((data) => data?.value).toString(),
    //   shop_address: formValues?.shopAddress,
    //   shop_description: formValues?.shopDescription,
    //   shop_image: formValues?.shop_image,
    //   shop_info: true,
    // }
    // const onSuccess = (res) => {
    //   dispatch(hideLoader())
    //   if (res?.data?.status?.toLowerCase() === 'true') {
    //     dispatch(
    //       showSnackbar({
    //         message: res?.data?.message || 'Info saved successfully',
    //         autoHideDuration: 3000,
    //         anchorOrigin: {
    //           vertical: 'top',
    //           horizontal: 'right',
    //         },
    //         variant: 'success',
    //       })
    //     )
    //     formik?.resetForm()
    //     // !_.isEmpty(res?.data?.id) &&
    //     //   localStorage.setItem('currentShopId', formValues?.ownerName?._id)
    //     setTabValue(nextTabIndex)
    //     const updateList = tabList?.map((data) =>
    //       data?.tabIndex === nextTabIndex
    //         ? { ...data, disabled: false }
    //         : { ...data, disabled: true }
    //     )
    //     setTabList(updateList)
    //   }
    // }
    // const onFailure = (err) => {
    //   dispatch(hideLoader())
    //   dispatch(
    //     showSnackbar({
    //       message: err?.response?.data?.message || 'Failed to fetch data',
    //       autoHideDuration: 3000,
    //       anchorOrigin: {
    //         vertical: 'top',
    //         horizontal: 'right',
    //       },
    //       variant: 'error',
    //     })
    //   )
    //   console.log('shop details update Api', err)
    // }
    // shopApi
    //   .updateShopDetails(formValues?.ownerName?._id, { ...data })
    //   .then(onSuccess, onFailure)
  }
  const convertToHolidayArray = (selectedHoliday) => {
    if (selectedHoliday) {
      return [{ label: selectedHoliday, value: selectedHoliday }];
    }
    return [];
  };

  const formik = useFormik({
    initialValues: {
      // ownerName: null,
      shop_name: data?.shop_name || '',
      shop_mobile_number: data?.shop_mobile_number || '',
      shopOpeningTime: data?.open_time || '',
      shopClosingTime: data?.close_time || '',
      holiday: convertToHolidayArray(data?.holiday) || [],
      shopAddress: data?.shop_address || '',
      shopDescription: data?.shop_description || '',
      shop_image: data?.shop_image || '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      // ownerName: yup.object().required('Please select owner name').nullable(),
      shop_name: yup
        .string()
        .required('Shop name is required')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed')
        .min(3, 'Shop name must be atleast 3 characters long')
        .max(100, 'Max 100 characters are allowed')
        .nullable(),
      shop_mobile_number: yup
        .string()
        .required('Shop mobile number is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .max(10, `Max 10 digits are allowed`)
        .min(10, `Must be exactly 10 numbers`)
        .nullable(),
      shopAddress: yup
        .string()
        .required('Address is required')
        .trim()
        .min(10, 'Must be atleast 10 characters long')
        .max(250, 'Max 250 characters are allowed')
        .nullable(),
      shopOpeningTime: yup
        .string()
        .required('Please select opening time')
        .nullable(),
      shopClosingTime: yup
        .string()
        .required('Please select closing time')
        .nullable(),
      holiday: yup.array().nullable(),
      shop_image: yup.string().required('Shop image is required').nullable(),
      shopDescription: yup
        .string()
        .required('Shop description is required')
        .trim()
        .min(20, 'Must be atleast 20 characters long')
        .max(500, 'Max 500 characters are allowed')
        .nullable(),
    }),
    onSubmit: handleShopDetails,
  })

  // Set current owner
  // useEffect(() => {
  //   if (mode?.toLowerCase() !== 'edit') {
  //     const shop = shopsList?.find((data) => data?._id === currentShopId)
  //     shop && formik?.setFieldValue('ownerName', shop)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentShopId, mode, shopsList])

  // Save shop owner profile image
  const handleUpload = async (acceptedFiles) => {
    const imageFile = acceptedFiles
    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      let formData = new FormData();
      formData?.append('shop_image', compressedFile, 'compressed_image.webp');

      const res = await dispatch(uploadShopImage(formData));
      const filepath = res.payload;
      if (filepath) {
        formik?.setFieldValue('shop_image', filepath);
      } else {
        console.error('Filepath not found in the response.');
      }
    } catch (error) {
      console.log(error)
    };
  }

  // Remove image
  const removeFile = () => {
    formik.setFieldValue('shop_image', '')
  };

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
                  label="Owner name*"
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
                name="shop_name"
                id="shop_name"
                value={formik?.values?.shop_name}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Shop name*"
                size="small"
                disabled={isVerify}
                error={formik?.errors?.shop_name && formik?.touched?.shop_name}
                helperText={
                  formik?.errors?.shop_name &&
                  formik?.touched?.shop_name &&
                  formik?.errors?.shop_name
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="shop_mobile_number"
                id="shop_mobile_number"
                value={formik?.values?.shop_mobile_number}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Mobile No*"
                size="small"
                disabled={isVerify}
                error={
                  formik?.errors?.shop_mobile_number && formik?.touched?.shop_mobile_number
                }
                helperText={
                  formik?.errors?.shop_mobile_number &&
                  formik?.touched?.shop_mobile_number &&
                  formik?.errors?.shop_mobile_number
                }
              />
            </Grid>
          </section>
          <Grid item xs={12}>
            <div className={classes.timeLabel}>
              <Typography variant="body2">Shop Timing</Typography>
            </div>
          </Grid>
          <section className={classes.fieldWrapper}>
            <Grid item xs={12} sm={6}>
              <section className={classes.fieldWrapper}>
                <Grid item xs={12} sm={6} className={classes.input}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileTimePicker
                      label="Opening time*"
                      disabled={isVerify}
                      value={formik?.values?.shopOpeningTime}
                      onChange={(value) => {
                        formik?.setFieldValue('shopOpeningTime', value)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          fullWidth
                          error={
                            formik.touched.shopOpeningTime &&
                            formik.errors.shopOpeningTime
                          }
                          helperText={
                            formik.touched.shopOpeningTime &&
                            formik.errors.shopOpeningTime &&
                            formik.errors.shopOpeningTime
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.input}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileTimePicker
                      label="Closing time*"
                      disabled={isVerify}
                      value={formik?.values?.shopClosingTime}
                      onChange={(value) => {
                        formik?.setFieldValue('shopClosingTime', value)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          fullWidth
                          error={
                            formik.touched.shopClosingTime &&
                            formik.errors.shopClosingTime
                          }
                          helperText={
                            formik.touched.shopClosingTime &&
                            formik.errors.shopClosingTime &&
                            formik.errors.shopClosingTime
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </section>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.input}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="holiday"
                disabled={isVerify}
                id="holiday"
                options={holidayOptions}
                // value={[{ label: 'Sunday', value: 'sunday' }]}
                value={formik?.values?.holiday}
                getOptionLabel={(option) => option?.label}
                onChange={(e, value) => {
                  formik?.setFieldValue('holiday', value)
                }}
                multiple
                autoHighlight
                filterSelectedOptions
                filterSelectedOptionsisOptionEqualToValue={(option, value) =>
                  option?.label === value?.label
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Holiday"
                    error={formik.touched.holiday && formik.errors.holiday}
                    helperText={
                      formik.touched.holiday &&
                      formik.errors.holiday &&
                      formik.errors.holiday
                    }
                  />
                )}
              />
            </Grid>
          </section>
          <section className={classes.uploadContainer}>
            <Grid item xs={12} lg={6} className={classes.input}>
              <TextField
                name="shopAddress"
                id="shopAddress"
                value={formik?.values?.shopAddress}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                disabled={isVerify}
                label="Shop address*"
                size="small"
                multiline
                rows={4.5}
                error={
                  formik?.errors?.shopAddress && formik?.touched?.shopAddress
                }
                helperText={
                  formik?.errors?.shopAddress &&
                  formik?.touched?.shopAddress &&
                  formik?.errors?.shopAddress
                }
              />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.input}>
              <TextField
                name="shopDescription"
                id="shopDescription"
                value={formik?.values?.shopDescription}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Shop description*"
                size="small"
                disabled={isVerify}
                multiline
                rows={4.5}
                error={
                  formik?.errors?.shopDescription &&
                  formik?.touched?.shopDescription
                }
                helperText={
                  formik?.errors?.shopDescription &&
                  formik?.touched?.shopDescription &&
                  formik?.errors?.shopDescription
                }
              />
            </Grid>
          </section>
          <section className={classes.uploadContainer}>
            <Grid item xs={12} lg={5.9} className={classes.input}>
              {!isVerify && <section
                className={
                  !_.isEmpty(formik?.values?.shop_image)
                    ? classes.disableWrapper
                    : classes.uploadWrapper
                }
              >
                <ImageUploader
                  upload={handleUpload}
                  title="Upload profile image"
                />
              </section>
              }
              <Grid item xs={12} className={classes.error}>
                <Typography variant="subtitle1">
                  {formik?.errors?.shop_image &&
                    formik?.touched?.shop_image &&
                    formik?.errors?.shop_image}
                </Typography>
              </Grid>
              {!_.isEmpty(formik?.values?.shop_image) && (
                <section className={classes.imgWrapper}>
                  <img
                    src={`${imageUrl}/${formik?.values?.shop_image}`}
                    alt="img"
                    className={classes.img}
                  />
                  {!isVerify &&
                    <div
                      className={classes.deleteBtnWrapper}
                      onClick={removeFile}
                    >
                      <CloseOutlinedIcon />
                    </div>
                  }
                </section>
              )}
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
              {isEdit ? 'Update' : 'Next'}
            </Button>
          }
        </Grid>
      </Grid>
    </>
  )
}

export default ShopDetails
