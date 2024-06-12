import React, { useEffect, useState } from 'react'
import CustomDialog from 'sharedComponents/customDialog'
import useStyles from './style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Grid, TextField, Autocomplete, Typography } from '@mui/material'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import _ from 'lodash'
import imageCompression from 'browser-image-compression'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { imageUrl } from 'constants'
import { useDispatch, useSelector } from '../../../../redux/store';

import { uploadManagerFile, addManager, updateManagerById } from 'redux/slices/manager/managerSlice';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

const AddManagerModal = (props) => {
  const { open, handleClose, mode, editManagerData } = props
  const classes = useStyles();
  const dispatch = useDispatch();
  const [uploadErrors, setUploadErrors] = useState([]);

  console.log('editManagerData', editManagerData);

  // save manager
  const handleManager = async (formValues) => {
    console.log('formValues', formValues);
    const data = {
      name: formValues?.name,
      gender: formValues?.gender?.value,
      phone_number: formValues?.phone_number,
      email: formValues?.email,
      image: formValues?.image
    };
    console.log('formValues11', formValues);
    const updateData = {
      _id: editManagerData?._id,
      data: data
    };

    mode?.toString().toLowerCase() === 'edit'
      ? await dispatch(updateManagerById(updateData))
      : await dispatch(addManager(data));

    handleClose();
  }

  const formik = useFormik({
    initialValues: {
      name: editManagerData?.name || '',
      // gender: editManagerData?.gender || null,
      gender: genderOptions.find(option => option.value === editManagerData?.gender) || null,
      phone_number: editManagerData.phone_number || '',
      email: editManagerData?.email || '',
      image: editManagerData?.image || '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Manager name is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(100, 'Max 100 characters are allowed')
        .nullable(),
      gender: yup.object().required('Please select a gender').nullable(),
      phone_number: yup
        .string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .max(10, `Max 10 digits are allowed`)
        .min(10, `Must be exactly 10 numbers`)
        .nullable(),
      email: yup.string().email('Enter valid email address').nullable(),
      image: yup
        .string()
        // .required('Please upload a profile picture')
        .nullable(),
    }),
    onSubmit: handleManager,
  })

  const handleUpload = async (acceptedFiles) => {
    const imageFile = acceptedFiles;
    const options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      let formData = new FormData();
      formData?.append('admin_manager', compressedFile, 'compressed_image.webp');

      const res = await dispatch(uploadManagerFile(formData));
      const filepath = res.payload;
      if (filepath) {
        formik?.setFieldValue('image', filepath);
      } else {
        console.error('Filepath not found in the response.');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <CustomDialog
        open={open}
        handleClose={() => {
          handleClose()
          formik.resetForm()
        }}
        title={
          mode?.toString().toLowerCase() === 'edit'
            ? 'Edit Manger'
            : 'Add Manager'
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
                <Autocomplete
                  disablePortal
                  disableClearable
                  size="small"
                  fullWidth
                  name="gender"
                  id="gender"
                  options={genderOptions}
                  value={formik?.values?.gender}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, value) => {
                    formik?.setFieldValue('gender', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Gender*"
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
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  type="number"
                  name="phone_number"
                  id="phone_number"
                  value={formik?.values?.phone_number}
                  onChange={formik?.handleChange}
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
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="email"
                  id="email"
                  value={formik?.values?.email}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Email"
                  size="small"
                  error={formik?.errors?.email && formik?.touched?.email}
                  helperText={
                    formik?.errors?.email &&
                    formik?.touched?.email &&
                    formik?.errors?.email
                  }
                />
              </Grid>
            </section>
            <Grid item xs={12} sm={5.9} className={classes.uploadWrapper}>
              <section
                className={
                  !_.isEmpty(formik?.values?.image)
                    ? classes.disableWrapper
                    : classes.uploadWrapper
                }
              >
                <ImageUploader
                  upload={handleUpload}
                  title={'Upload banner image'}
                  getErrors={true}
                  setUploadErrors={setUploadErrors}
                />
              </section>
              {!_.isEmpty(uploadErrors) && (
                <Grid item xs={12} style={{ paddingBlock: 8 }}>
                  {uploadErrors.map(({ file, errors }) => (
                    <div key={file.path}>
                      {errors?.map((e) => (
                        <Typography
                          style={{ color: 'red' }}
                          variant="subtitle1"
                          key={e.code}
                        >
                          {e.message}
                        </Typography>
                      ))}
                    </div>
                  ))}
                </Grid>
              )}
              <Grid item xs={12} className={classes.error}>
                <Typography variant="subtitle1">
                  {formik?.errors?.image &&
                    formik?.touched?.image &&
                    formik?.errors?.image}
                </Typography>
              </Grid>
              <section className={classes.imgWrapper}>

                <img
                  src={`${imageUrl}/${formik?.values?.image}`}
                  alt="img"
                  className={classes.img}
                />
                <div className={classes.deleteBtnWrapper}>
                  <CloseOutlinedIcon />
                </div>
              </section>
            </Grid>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  )
}

export default AddManagerModal
