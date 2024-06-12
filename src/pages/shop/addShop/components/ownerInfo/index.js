import React from 'react'
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
import shopApi from 'services/shop';
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import { imageUrl } from 'constants';
import { uploadOwnerImage, createShop, updateShopByid } from 'redux/slices/shop/shopSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Others', value: 'others' },
]

const OwnerInfo = (props) => {
  const { tabList, setTabList, setTabValue, nextTabIndex, data, isEdit, isVerify } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleOwnerInfo = async (formValues) => {
    console.log('formValues', formValues);
    // dispatch(showLoader('Loading please wait...'))
    const data = {
      name: formValues?.name,
      email: formValues?.email,
      gender: formValues?.gender?.value,
      phone_number: formValues?.phone_number,
      image: formValues?.image,
      owner_address: formValues?.owner_address,
      personal_info: true,
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
    };
  }

  const formik = useFormik({
    initialValues: {
      name: data?.name || '',
      email: data?.email || '',
      gender: data?.gender || null,
      phone_number: data?.phone_number || '',
      owner_address: data?.owner_address || '',
      image: data?.image || '',
      // owner_address: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Vendor name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Only characters are allowed')
        .max(100, 'Max 100 characters are allowed')
        .nullable(),
      email: yup.string().email('Enter a valid email').nullable(),
      gender: yup.object().nullable(),
      phone_number: yup
        .string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .max(10, `Max 10 digits are allowed`)
        .min(10, `Must be exactly 10 numbers`)
        .nullable(),
      image: yup.string().required('Profile image is required').nullable(),
      owner_address: yup.string().required('Address is required').nullable(),
    }),
    onSubmit: handleOwnerInfo,
  })

  // Save shop owner profile image
  const handleUpload = async (acceptedFiles) => {
    const imageFile = acceptedFiles;
    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      let formData = new FormData();
      formData?.append('shop_profile', compressedFile, 'compressed_image.webp');

      const res = await dispatch(uploadOwnerImage(formData));
      const filepath = res.payload;
      console.log(filepath)
      if (filepath) {
        formik?.setFieldValue('image', filepath);
      } else {
        console.error('Filepath not found in the response.');
      }
    } catch (error) {
      console.log(error)
    };
  }

  // Remove image
  const removeFile = () => {
    formik.setFieldValue('image', '')
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
            <Grid item xs={12} sm={6} className={classes.input}>
              <TextField
                name="name"
                id="name"
                value={formik?.values?.name}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Vendor name*"
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
                name="email"
                id="email"
                value={formik?.values?.email}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Email ID"
                size="small"
                disabled={isVerify}
                error={formik?.errors?.email && formik?.touched?.email}
                helperText={
                  formik?.errors?.email &&
                  formik?.touched?.email &&
                  formik?.errors?.email
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
                name="gender"
                id="gender"
                disabled={isVerify}
                options={genderOptions}
                value={formik?.values?.gender}
                getOptionLabel={(option) => option.label || formik?.values?.gender}
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
                disabled={isVerify}
                error={formik?.errors?.phone_number && formik?.touched?.phone_number}
                helperText={
                  formik?.errors?.phone_number &&
                  formik?.touched?.phone_number &&
                  formik?.errors?.phone_number
                }
              />
            </Grid>
          </section>
          <section className={classes.uploadContainer}>
            <Grid item xs={12} lg={6} className={classes.input}>
              {!isVerify && <section
                className={
                  !_.isEmpty(formik?.values?.image)
                    ? classes.disableWrapper
                    : classes.uploadWrapper
                }
              >
                <ImageUploader
                  upload={handleUpload}
                  title={'Upload profile image'}
                />
              </section>}

              <Grid item xs={12} className={classes.error}>
                <Typography variant="subtitle1">
                  {formik?.errors?.image &&
                    formik?.touched?.image &&
                    formik?.errors?.image}
                </Typography>
              </Grid>
              {!_.isEmpty(formik?.values?.image) && (
                <section className={classes.imgWrapper}>
                  <img
                    src={`${imageUrl}/${formik?.values?.image}`}
                    alt="img"
                    className={classes.img}
                  />
                  {!isVerify && <div
                    className={classes.deleteBtnWrapper}
                    onClick={removeFile}
                  >
                    <CloseOutlinedIcon />
                  </div>}

                </section>
              )}
            </Grid>
            <Grid item xs={12} lg={6} className={classes.input}>
              <TextField
                name="owner_address"
                id="owner_address"
                value={formik?.values?.owner_address}
                onChange={formik?.handleChange}
                type={'text'}
                fullWidth
                variant="outlined"
                label="Address*"
                size="small"
                disabled={isVerify}
                multiline
                rows={4.5}
                error={formik?.errors?.owner_address && formik?.touched?.owner_address}
                helperText={
                  formik?.errors?.owner_address &&
                  formik?.touched?.owner_address &&
                  formik?.errors?.owner_address
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
              {isEdit ? 'Update' : 'Next'}
            </Button>
          }
        </Grid>
      </Grid>
    </>
  )
}

export default OwnerInfo
