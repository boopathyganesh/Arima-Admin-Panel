import React, { useState, useEffect } from 'react'
import CustomDialog from 'sharedComponents/customDialog'
import useStyles from '../style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Grid, TextField, Autocomplete, Typography } from '@mui/material'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import _ from 'lodash'
import imageCompression from 'browser-image-compression'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions';
import { imageUrl } from 'constants'
import { createMainBanner, uploadMainBannerImage, updateMainBannerById, getMainBannerById } from 'redux/slices/mainBanner/mainBannerSlice';
import { getAllProductCategory } from 'redux/slices/productCategory/productCategorySlice';

const AddMainBannerModal = (props) => {
  const { open, handleClose, mode, mainBannerId } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const [uploadErrors, setUploadErrors] = useState([])
  const [details, setDetails] = useState(null);

  const { productCategories } = useSelector(state => state.productCategory);
  const { currentMainBanner } = useSelector(state => state.mainBanner);
  console.log('currentMainBanner', currentMainBanner);

  useEffect(() => {
    open && dispatch(getAllProductCategory("APPROVED"));
    open && mainBannerId && dispatch(getMainBannerById(mainBannerId));
  }, [dispatch, open]);

  useEffect(() => {
    if (currentMainBanner) {
      setDetails(currentMainBanner);
    }
  }, [currentMainBanner])

  // save main banner
  const handleMainBanner = async (formValues) => {
    dispatch(showLoader('Loading please wait...'))
    const data = {
      name: formValues?.name,
      productCategory: formValues?.productCategory?._id,
      image: formValues?.image,
    };
    if (mode?.toString().toLowerCase() === 'edit') {
      const updatedData = {
        id: mainBannerId,
        data: data
      }
      await dispatch(updateMainBannerById(updatedData));
      await handleClose();
      await dispatch(hideLoader());
    } else {
      await dispatch(createMainBanner(data));
      await handleClose();
      await dispatch(hideLoader());
    };
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      productCategory: null,
      image: '/assets/images/notification1.png',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Banner title is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(100, 'Max 100 characters are allowed'),
      productCategory: yup
        .object()
        .required('Please select product category')
        .nullable(),
      image: yup.string().required('Please upload a banner image'),
    }),
    onSubmit: handleMainBanner,
  })

  const handleUpload = async (acceptedFiles) => {
    dispatch(showLoader('Loading please wait...'))
    const imageFile = acceptedFiles;
    const options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      let formData = new FormData();
      formData?.append('main_banner', compressedFile, 'compressed_image.webp');

      const res = await dispatch(uploadMainBannerImage(formData));
      const filepath = res.payload;
      if (filepath) {
        formik?.setFieldValue('image', filepath);
        dispatch(hideLoader('Loading please wait...'))
      } else {
        console.error('Filepath not found in the response.');
        dispatch(hideLoader('Loading please wait...'))
      }
    } catch (error) {
      console.log(error)
    }
  };

  // Remove image
  const removeFile = () => {
    formik.setFieldValue('image', '')
  };

  // Set formvalues for edit
  useEffect(() => {
    if (!_.isEmpty(details)) {
      const category = productCategories?.find(
        (data) => data?._id === details?.productCategory?._id
      );
      category && formik?.setFieldValue('productCategory', category)
      formik?.setFieldValue('name', details?.name)
      formik?.setFieldValue('image', details?.image)
    };
  }, [details, productCategories])

  return (
    <>
      <CustomDialog
        open={open}
        handleClose={() => {
          handleClose()
          formik.resetForm()
          setDetails(null)
        }}
        name={
          mode?.toString().toLowerCase() === 'edit'
            ? 'Edit Main Banner'
            : 'Add Main Banner'
        }
        btnLabel={mode?.toString().toLowerCase() === 'edit' ? 'Update' : 'Add'}
        onSubmit={formik?.handleSubmit}
        containerStyle={classes.containerStyle}
      >
        <Grid container>
          <Grid item xs={12} className={classes.input}>
            <TextField
              name="name"
              id="name"
              value={formik?.values?.name}
              onChange={formik?.handleChange}
              type={'text'}
              fullWidth
              variant="outlined"
              label="Title*"
              size="small"
              error={formik?.errors?.name && formik?.touched?.name}
              helperText={
                formik?.errors?.name &&
                formik?.touched?.name &&
                formik?.errors?.name
              }
            />
          </Grid>
          <Grid item xs={12} className={classes.input}>
            <Autocomplete
              disablePortal
              disableClearable
              size="small"
              fullWidth
              name="productCategory"
              id="productCategory"
              options={productCategories}
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
          <Grid item xs={12} className={classes.uploadWrapper}>
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
            {!_.isEmpty(formik?.values?.image) && (
              <section className={classes.imgWrapper}>
                <img
                  src={`${imageUrl}/${formik?.values?.image}`}
                  alt="img"
                  className={classes.img}
                />
                <div className={classes.deleteBtnWrapper} onClick={removeFile}>
                  <CloseOutlinedIcon />
                </div>
              </section>
            )}
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  )
}

export default AddMainBannerModal
