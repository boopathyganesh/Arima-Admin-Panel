import React, { useState, useCallback, useEffect } from 'react'
import CustomDialog from 'sharedComponents/customDialog'
import useStyles from './style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Grid, TextField, Typography, Button } from '@mui/material'
import imageCompression from 'browser-image-compression'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch } from 'react-redux'
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import _ from 'lodash'
import { imageUrl } from 'constants';
import productCategoryApi from 'services/productCategory'
import { useNavigate } from 'react-router-dom'

const AddProductCategory = (props) => {
  const { open, handleClose, mode, productCategoryId, isEdit } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [uploadErrors, setUploadErrors] = useState([])
  const [details, setDetails] = useState(null);

  // save product category
  const handleProductCategory = (formValues) => {
    dispatch(showLoader('Loading please wait...'))
    const data = {
      productCategoryName: formValues?.name,
      image: formValues?.image,
    }
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status?.toString().toLowerCase() === 'true') {
        dispatch(
          showSnackbar({
            message: res?.data?.message || 'Info saved successfully',
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            variant: 'success',
          })
        )
        handleClose();
        navigate('/productcategory');
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader())
      dispatch(
        showSnackbar({
          message: err?.response?.data?.message || 'Failed to fetch data',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          variant: 'error',
        })
      )
      console.log('save product category Api', err)
    }
    mode?.toString().toLowerCase() === 'edit'
      ? productCategoryApi
        .updateProductCategory(productCategoryId, data)
        .then(onSuccess, onFailure)
      : productCategoryApi.saveProductCategory(data).then(onSuccess, onFailure)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Product category name is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(100, 'Max 100 characters are allowed'),
      image: yup.string().required('Please upload a product category image'),
    }),
    onSubmit: handleProductCategory,
  })
  // Save shop owner profile image
  const handleUpload = async (acceptedFiles, uploadErrors) => {
    const imageFile = acceptedFiles;
    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    if (imageFile || imageFile !== undefined) {
      try {
        dispatch(showLoader('Image uploading please wait...'))
        const onSuccess = (res) => {
          dispatch(hideLoader())
          if (res?.data?.status?.toString().toLowerCase() === 'true') {
            dispatch(
              showSnackbar({
                message: res?.data?.message || 'Image uploaded successfully',
                autoHideDuration: 3000,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
                variant: 'success',
              })
            )
            formik?.setFieldValue('image', res?.data?.data?.filepath)
          }
        }
        const onFailure = (err) => {
          dispatch(hideLoader())
          dispatch(
            showSnackbar({
              message: err?.response?.data?.message || 'Failed to fetch data',
              autoHideDuration: 3000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
              variant: 'error',
            })
          )
          console.log('save product category image', err)
        }
        const compressedFile = await imageCompression(imageFile, options)
        let formData = new FormData()
        formData?.append('products_category', compressedFile, 'compressed_image.webp')
        productCategoryApi.UploadCategoryImage(formData).then(onSuccess, onFailure)
      } catch (error) {
        dispatch(
          showSnackbar({
            message: 'Something went wrong',
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            variant: 'error',
          })
        )
      }
    }

  }

  // Remove image
  const removeFile = () => {
    formik.setFieldValue('image', '')
  }

  // Get product category details
  const getProductCategory = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status) {
        setDetails(res?.data?.data)
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader());
    }
    productCategoryApi.getProductCategory(productCategoryId).then(onSuccess, onFailure);
  }, [productCategoryId]);

  useEffect(() => {
    open && productCategoryId && getProductCategory()
  }, [open, productCategoryId, getProductCategory])

  // Set formvalues for edit
  useEffect(() => {
    if (!_.isEmpty(details)) {
      formik?.setFieldValue('name', details?.productCategoryName)
      formik?.setFieldValue('image', details?.image)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  const productCategoryApproveReject = (status) => {
    dispatch(showLoader('Loading please wait...'))

    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status) {
        dispatch(
          showSnackbar({
            message: res?.data?.message || 'Info saved successfully',
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            variant: 'success',
          })
        )
        handleClose();
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader())
      dispatch(
        showSnackbar({
          message: err?.response?.data?.message || 'Failed to fetch data',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          variant: 'error',
        })
      )
      console.log('login Api', err)
    }
    productCategoryApi.ProdcuctCtegoryApproveReject(productCategoryId, status).then(onSuccess, onFailure)
  }
  return (
    <>
      <CustomDialog
        open={open}
        handleClose={() => {
          handleClose();
          formik.resetForm();
          setDetails(null);
        }}
        title={
          mode?.toString().toLowerCase() === 'edit'
            ? 'Edit Product Category'
            : mode?.toString().toLowerCase() === 'verify'
              ? 'Verify Product Category'
              : 'Add Product Category'
        }
        mode={mode}
        isEdit={isEdit}
        btnLabel={mode?.toString().toLowerCase() === 'edit' ? 'Update' : mode?.toString().toLowerCase() === 'verify' ? ['Accept', 'Reject'] : 'Add'}
        onSubmit={formik?.handleSubmit}
        containerStyle={classes.containerStyle}
        showDefaultButtons={false}
        productCategoryApproveReject={productCategoryApproveReject}
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
              disabled={isEdit}
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
          <Grid item xs={12} className={classes.uploadWrapper}>
            {!isEdit &&
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
            }
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
                  src={imageUrl + '/' + formik?.values?.image}
                  alt="img"
                  className={classes.img}
                />
                {!isEdit &&
                  <div className={classes.deleteBtnWrapper} onClick={removeFile}>
                    <CloseOutlinedIcon />
                  </div>
                }
              </section>
            )}
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  )
}

export default AddProductCategory
