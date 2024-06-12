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
import shopApi from 'services/shop'
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import { imageUrl } from 'constants';
import { uploadDocumentImage, updateShopByid } from 'redux/slices/shop/shopSlice';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';


const haveGstOptions = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
]

const Documents = (props) => {
  const {
    tabList,
    setTabList,
    setTabValue,
    nextTabIndex,
    data,
    isVerify,
    isEdit
  } = props
  const classes = useStyles()
  const dispatch = useDispatch();
  const { id } = useParams();
  const [havingGst, setHavingGst] = useState(false)

  const handleDocuments = async (formValues) => {
    console.log('formValues', formValues);
    // dispatch(showLoader('Loading please wait...'))
    const data = {
      is_gst: formValues?.is_gst?.value,
      gst_number: formValues?.gst_number,
      aadhaar_number: formValues?.aadhaar_number,
      aadhaar_image: formValues?.aadhaar_image,
      pan_number: formValues?.pan_number,
      pan_image: formValues?.pan_image,
      document_info: true,
    }
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
    //     !_.isEmpty(res?.data?.id) &&
    //       localStorage.setItem('currentShopId', formValues?.ownerName?._id)
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
    //   console.log('shop docs update Api', err)
    // }
    // shopApi
    //   .updateShopDetails(formValues?.ownerName?._id, { ...data })
    //   .then(onSuccess, onFailure)
  }

  const formik = useFormik({
    initialValues: {
      // ownerName: null,
      is_gst: haveGstOptions.find(option => option.value === data?.is_gst) || null,
      gst_number: data?.gst_number || '',
      aadhaar_number: data?.aadhaar_number || '',
      aadhaar_image: data?.aadhaar_image || '',
      pan_number: data?.pan_number || '',
      pan_image: data?.pan_image || '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      // ownerName: yup.object().required('Please select owner name').nullable(),
      is_gst: yup.object().required('This field is required').nullable(),
      gst_number: havingGst?.value
        ? yup
          .string()
          .required('Gst number is required')
          .trim()
          .matches(
            /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
            'Enter valid gst number'
          )
          .max(15, `Max 15 digits are allowed`)
          .min(15, `Must be exactly 15 numbers`)
          .nullable()
        : yup
          .string()
          .matches(
            /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
            'Enter valid gst number'
          )
          .max(15, `Max 15 digits are allowed`)
          .min(15, `Must be exactly 15 numbers`)
          .nullable(),
      aadhaar_number: yup
        .string()
        .required('Aadhar number is required')
        .matches(/^[0-9\s]+$/, 'Only Numbers are allowed')
        .max(12, `Max 12 digits are allowed`)
        .min(12, `Must be exactly 12 numbers`)
        .nullable(),
      aadhaar_image: yup.string().required('Please upload Aadhar image').nullable(),
      pan_number: yup
        .string()
        .required('PAN number is required')
        .matches(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/, 'Enter valid id')
        .max(10, `Max 10 digits are allowed`)
        .min(10, `Must be exactly 10 numbers`)
        .nullable(),
      pan_image: yup.string().required('Please upload PAN card image').nullable(),
    }),
    onSubmit: handleDocuments,
  })

  // Set current owner
  // useEffect(() => {
  //   if (mode?.toLowerCase() !== 'edit') {
  //     const shop = shopsList?.find((data) => data?._id === currentShopId)
  //     shop && formik?.setFieldValue('ownerName', shop)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentShopId, mode, shopsList])

  // Save AAdhar card image
  const handleAadharUpload = async (acceptedFiles) => {
    const imageFile = acceptedFiles;
    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    try {
      console.log('imageFile', imageFile);
      const compressedFile = await imageCompression(imageFile, options);
      let formData = new FormData();
      formData?.append('shop_documents', compressedFile, 'compressed_image.webp');

      const res = await dispatch(uploadDocumentImage(formData));
      const filepath = res.payload;
      console.log('filepath', filepath);
      if (filepath) {
        formik?.setFieldValue('aadhaar_image', filepath);
      } else {
        console.error('Filepath not found in the response.');
      }
    } catch (error) {
      console.log(error)
    };
  }

  // Remove AAdhar image
  const removeAadharFile = () => {
    formik.setFieldValue('aadhaar_image', '')
  }

  // Save PAN card image
  const handlePanUpload = async (acceptedFiles) => {
    const imageFile = acceptedFiles;
    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    try {
      console.log('imageFile', imageFile);
      const compressedFile = await imageCompression(imageFile, options);
      let formData = new FormData();
      formData?.append('shop_documents', compressedFile, 'compressed_image.webp');

      const res = await dispatch(uploadDocumentImage(formData));
      const filepath = res.payload;
      if (filepath) {
        formik?.setFieldValue('pan_image', filepath);
      } else {
        console.error('Filepath not found in the response.');
      }
    } catch (error) {
      console.log(error)
    };
  }

  // Remove PAN image
  const removePanFile = () => {
    formik.setFieldValue('pan_image', '')
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
          <section className={classes.fieldWrapper}>
            {/* <Grid item xs={12} sm={6} className={classes.input}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="ownerName"
                id="ownerName"
                disabled={isVerify}
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
            <Grid item xs={12} sm={6} className={classes.input}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="is_gst"
                id="is_gst"
                disabled={isVerify}
                options={haveGstOptions}
                value={formik?.values?.is_gst || null}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => {
                  formik?.setFieldValue('is_gst', value)
                  setHavingGst(value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Do you have GST?*"
                    error={formik.touched.is_gst && formik.errors.is_gst}
                    helperText={
                      formik.touched.is_gst &&
                      formik.errors.is_gst &&
                      formik.errors.is_gst
                    }
                  />
                )}
              />
            </Grid>
          </section>
          {formik?.values?.is_gst?.value && (
            <Grid item xs={12} sm={5.9} className={classes.input}>
              <TextField
                name="gst_number"
                id="gst_number"
                value={formik?.values?.gst_number}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                disabled={isVerify}
                variant="outlined"
                label={
                  formik?.values?.is_gst?.value ? 'GST number*' : 'GST number'
                }
                size="small"
                error={formik?.errors?.gst_number && formik?.touched?.gst_number}
                helperText={
                  formik?.errors?.gst_number &&
                  formik?.touched?.gst_number &&
                  formik?.errors?.gst_number
                }
              />
            </Grid>
          )}
          <section className={classes.subTitle}>
            <Typography variant="body1">Personal ID Proof</Typography>
          </section>
          <section className={classes.uploadContainer}>
            <Grid item xs={12} lg={6}>
              <div className={classes.label}>
                <Typography variant="body1">Aadhar</Typography>
              </div>
              <Grid item xs={12} className={classes.input}>
                <TextField
                  name="aadhaar_number"
                  id="aadhaar_number"
                  value={formik?.values?.aadhaar_number}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Aadhar number*"
                  size="small"
                  disabled={isVerify}
                  error={formik?.errors?.aadhaar_number && formik?.touched?.aadhaar_number}
                  helperText={
                    formik?.errors?.aadhaar_number &&
                    formik?.touched?.aadhaar_number &&
                    formik?.errors?.aadhaar_number
                  }
                />
              </Grid>
              <Grid item xs={12} className={classes.input}>
                {!isVerify &&
                  <section
                    className={
                      !_.isEmpty(formik?.values?.aadhaar_image)
                        ? classes.disableWrapper
                        : classes.uploadWrapper
                    }
                  >
                    <ImageUploader
                      upload={handleAadharUpload}
                      title="Upload your Aadhar card"
                    />
                  </section>
                }
                <Grid item xs={12} className={classes.error}>
                  <Typography variant="subtitle1">
                    {formik?.errors?.aadhaar_image &&
                      formik?.touched?.aadhaar_image &&
                      formik?.errors?.aadhaar_image}
                  </Typography>
                </Grid>
                {!_.isEmpty(formik?.values?.aadhaar_image) && (
                  <section className={classes.imgWrapper}>
                    <img
                      // src={imageUrl + '/' + formik?.values?.aadhaar_image}
                      src={`${imageUrl}/${formik?.values?.aadhaar_image}`}
                      alt="img"
                      className={classes.img}
                    />
                    {!isVerify &&
                      <div
                        className={classes.deleteBtnWrapper}
                        onClick={removeAadharFile}
                      >
                        <CloseOutlinedIcon />
                      </div>
                    }
                  </section>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className={classes.label}>
                <Typography variant="body1">PAN</Typography>
              </div>
              <Grid item xs={12} className={classes.input}>
                <TextField
                  name="pan_number"
                  id="pan_number"
                  disabled={isVerify}
                  value={formik?.values?.pan_number}
                  onChange={(e) => {
                    formik?.setFieldValue(
                      'pan_number',
                      e?.target?.value?.toUpperCase()
                    )
                  }}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="PAN number*"
                  size="small"
                  error={formik?.errors?.pan_number && formik?.touched?.pan_number}
                  helperText={
                    formik?.errors?.pan_number &&
                    formik?.touched?.pan_number &&
                    formik?.errors?.pan_number
                  }
                />
              </Grid>
              <Grid item xs={12} className={classes.input}>
                {!isVerify &&
                  <section
                    className={
                      !_.isEmpty(formik?.values?.pan_image)
                        ? classes.disableWrapper
                        : classes.uploadWrapper
                    }
                  >
                    <ImageUploader
                      upload={handlePanUpload}
                      title="Upload your PAN card"
                    />
                  </section>
                }
                <Grid item xs={12} className={classes.error}>
                  <Typography variant="subtitle1">
                    {formik?.errors?.pan_image &&
                      formik?.touched?.pan_image &&
                      formik?.errors?.pan_image}
                  </Typography>
                </Grid>
                {!_.isEmpty(formik?.values?.pan_image) && (
                  <section className={classes.imgWrapper}>
                    <img
                      src={imageUrl + '/' + formik?.values?.pan_image}
                      alt="img"
                      className={classes.img}
                    />
                    {!isVerify &&
                      <div
                        className={classes.deleteBtnWrapper}
                        onClick={removePanFile}
                      >
                        <CloseOutlinedIcon />
                      </div>
                    }
                  </section>
                )}
              </Grid>
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

export default Documents
