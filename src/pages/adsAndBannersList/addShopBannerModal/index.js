import React, { useState, useCallback, useEffect } from 'react'
import CustomDialog from 'sharedComponents/customDialog'
import useStyles from '../style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Grid, TextField, Autocomplete, Typography } from '@mui/material'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import _ from 'lodash'
import imageCompression from 'browser-image-compression'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbar } from 'redux/snackbar/actions';
import { showLoader, hideLoader } from 'redux/loader/actions';

import { imageUrl } from 'constants';
import { getAllActiveShops } from 'redux/slices/shop/shopSlice';
import { getAllProductCategory } from 'redux/slices/productCategory/productCategorySlice';
import { uploadShopBannerImage, updateShopBannerById, createShopBanner, getShopBannerById } from 'redux/slices/shopBanner/shopBannerSlice';


const AddShopBannerModal = (props) => {
  const { open, handleClose, mode, shopBannerId } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  const [uploadErrors, setUploadErrors] = useState([])
  const [details, setDetails] = useState(null);
  const { shops } = useSelector(state => state.shops);
  const { productCategories } = useSelector(state => state.productCategory);
  const { currentShopBanner } = useSelector(state => state.shopBanner);

  useEffect(() => {
    open && dispatch(getAllProductCategory("APPROVED"));
    open && dispatch(getAllActiveShops("APPROVED"));
    open && shopBannerId && dispatch(getShopBannerById(shopBannerId));
  }, [dispatch, open, shopBannerId]);

  useEffect(() => {
    if (currentShopBanner) {
      setDetails(currentShopBanner);
    }
  }, [currentShopBanner]);

  // save shop banner
  const handleShopBanner = async (formValues) => {
    dispatch(showLoader('Loading please wait...'))
    const data = {
      name: formValues?.name,
      product_category: formValues?.product_category?._id,
      shop_category: formValues?.shop?._id,
      image: formValues?.image,
    };
    if (mode?.toString().toLowerCase() === 'edit') {
      const updatedData = {
        id: shopBannerId,
        data: data
      }
      await dispatch(updateShopBannerById(updatedData));
      await handleClose();
      await dispatch(hideLoader());
    } else {
      await dispatch(createShopBanner(data));
      await handleClose();
      await dispatch(hideLoader());
    };
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      product_category: null,
      shop: null,
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
      product_category: yup
        .object()
        .required('Please select product category')
        .nullable(),
      shop: yup.object().required('Please select a shop').nullable(),
      image: yup.string().required('Please upload a banner image'),
    }),
    onSubmit: handleShopBanner,
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
      formData?.append('shop_banner', compressedFile, 'compressed_image.webp');

      const res = await dispatch(uploadShopBannerImage(formData));
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
    };
  };

  // Remove image
  const removeFile = () => {
    formik.setFieldValue('image', '')
  };

  // Set formvalues for edit
  useEffect(() => {
    if (!_.isEmpty(details)) {
      const category = productCategories?.find(
        (data) => data?._id === details?.product_category?._id
      )
      const shop = shops?.find(
        (sData) => sData?._id === details?.shop_category?._id
      );
      category && formik?.setFieldValue('product_category', category)
      shop && formik?.setFieldValue('shop', shop)
      formik?.setFieldValue('name', details?.name)
      formik?.setFieldValue('image', details?.image)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, productCategories, shops])

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
            ? 'Edit Shop Banner'
            : 'Add Shop Banner'
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
              name="product_category"
              id="product_category"
              options={productCategories}
              value={formik?.values?.product_category}
              getOptionLabel={(option) => option.productCategoryName || ''}
              onChange={(e, value) => {
                formik?.setFieldValue('product_category', value)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Product category*"
                  error={
                    formik.touched.product_category &&
                    formik.errors.product_category
                  }
                  helperText={
                    formik.touched.product_category &&
                    formik.errors.product_category &&
                    formik.errors.product_category
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} className={classes.input}>
            <Autocomplete
              disablePortal
              disableClearable
              size="small"
              fullWidth
              name="shop"
              id="shop"
              options={shops}
              value={formik?.values?.shop}
              getOptionLabel={(option) => option.shop_name || ''}
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

export default AddShopBannerModal
