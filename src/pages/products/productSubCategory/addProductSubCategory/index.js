import React, { useState, useCallback, useEffect } from 'react'
import CustomDialog from 'sharedComponents/customDialog'
import useStyles from './style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Grid, TextField, Autocomplete, Typography } from '@mui/material'
import imageCompression from 'browser-image-compression'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import productsApi from 'services/products'
import { useDispatch } from 'react-redux'
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import _ from 'lodash'
import { imageUrl } from 'constants'

const AddProductCategory = (props) => {
  const { open, handleClose, mode, productSubCategoryId } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const [productCategoryOptions, setProductCategoryOptions] = useState([])
  const [uploadErrors, setUploadErrors] = useState([])
  const [details, setDetails] = useState(null)

  // save product subcategory
  const handleProductSubCategory = (formValues) => {
    dispatch(showLoader('Loading please wait...'))
    const data = {
      productCategory: formValues?.productCategory?._id,
      productSubCategoryName: formValues?.name,
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
        handleClose()
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
      console.log('save product subcategory Api', err)
    }
    mode?.toString().toLowerCase() === 'edit'
      ? productsApi
          .updateProductSubCategory(productSubCategoryId, data)
          .then(onSuccess, onFailure)
      : productsApi.saveProductSubCategory(data).then(onSuccess, onFailure)
  }

  const formik = useFormik({
    initialValues: {
      productCategory: '',
      name: '',
      image: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      productCategory: yup
        .object()
        .required('Please select a product category')
        .nullable(),
      name: yup
        .string()
        .required('Product subcategory name is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(100, 'Max 100 characters are allowed'),
      image: yup.string().required('Please upload a product subcategory image'),
    }),
    onSubmit: handleProductSubCategory,
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
      formData?.append(
        'master_products',
        compressedFile,
        'compressed_image.webp'
      )
      productsApi.saveProductImage(formData).then(onSuccess, onFailure)
    } catch (error) {
      console.log(error)
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

  // Remove image
  const removeFile = () => {
    formik.setFieldValue('image', '')
  }

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
    productsApi.getAllProductCategory().then(onSuccess, onFailure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    open && getAllProductCategoryList()
  }, [getAllProductCategoryList, open])

  // Get product subcategory details
  const getProductSubCategory = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status?.toString().toLowerCase() === 'true') {
        setDetails(res?.data?.data)
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader())
      console.log('get all product subcategory list Api', err)
    }
    productsApi
      .getProductSubCategory(productSubCategoryId)
      .then(onSuccess, onFailure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSubCategoryId])
  useEffect(() => {
    open && productSubCategoryId && getProductSubCategory()
  }, [open, productSubCategoryId, getProductSubCategory])

  // Set formvalues for edit
  useEffect(() => {
    if (!_.isEmpty(details)) {
      const category = productCategoryOptions?.find(
        (data) => data?._id === details?.productCategory?._id
      )
      category && formik?.setFieldValue('productCategory', category)
      formik?.setFieldValue('name', details?.productSubCategoryName)
      formik?.setFieldValue('image', details?.image)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, productCategoryOptions])

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
            ? 'Edit Product SubCategory'
            : 'Add Product SubCategory'
        }
        btnLabel={mode?.toString().toLowerCase() === 'edit' ? 'Update' : 'Add'}
        onSubmit={formik?.handleSubmit}
        containerStyle={classes.containerStyle}
      >
        <Grid container>
          <Grid item xs={12} className={classes.input}>
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
          </Grid>
          <Grid item xs={12} className={classes.input}>
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
                  src={imageUrl + '/' + formik?.values?.image}
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

export default AddProductCategory
