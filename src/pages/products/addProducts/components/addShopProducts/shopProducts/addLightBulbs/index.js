import React, { useState, useCallback, useEffect } from 'react'
import useStyles from 'pages/products/addProducts/style'
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  useTheme,
  InputAdornment,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import imageCompression from 'browser-image-compression'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import _ from 'lodash'
import AddProductVariant from './addProductVariant'
import DeleteIcon from '@mui/icons-material/Delete';
import { showLoader, hideLoader } from 'redux/loader/actions';
import productCategoryApi from 'services/productCategory';
import shopApi from 'services/shop';
import productApi from 'services/products';
import { imageUrl } from 'constants';
import { useParams, useNavigate } from 'react-router-dom';
import { showSnackbar } from 'redux/snackbar/actions';
import { uploadProductImage, uploadProductImages, addProduct, updateProductByid } from 'redux/slices/product/productSlice';
import { useDispatch } from 'redux/store';

const taxRateOptions = [
  { label: '0%', value: 0 },
  { label: '5%', value: 5 },
  { label: '12%', value: 12 },
  { label: '18%', value: 18 },
  { label: '28%', value: 28 },
]

const sampleVariantData = [
  {
    variantColor: '#000',
    variantMrp: 1099,
    variantSellingPrice: 979,
    variantDiscount: 15,
    variantStockQuantity: 35,
  },
  {
    variantColor: '#008090',
    variantMrp: 2399,
    variantSellingPrice: 1579,
    variantDiscount: 43,
    variantStockQuantity: 107,
  },
]

const AddLightBulbs = (props) => {
  const { data, isEdit, isVerify } = props
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [productCategorycOptions, setProductCategoryOptions] = useState([]);
  const [shopListOptions, setShopListOptions] = useState([]);
  const [openVariantModal, setOpenVariantModal] = useState(false)
  const [variantList, setVariantList] = useState(sampleVariantData);
  const [uploadErrors, setUploadErrors] = useState([]);



  // Handle add product variant
  const handleOpenVariantModal = () => {
    setOpenVariantModal(true)
  }
  const handleCloseVariantModal = () => {
    setOpenVariantModal(false)
  };

  const getProductCategoryList = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader());
      if (res?.data?.status === true) {
        setProductCategoryOptions(res?.data?.data);
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader());
    }
    productCategoryApi.getAllProductCategory("APPROVED").then(onSuccess, onFailure)
  }, [])

  const getShopList = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader());
      if (res?.data?.status === true) {
        setShopListOptions(res?.data?.data);
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader());
    }
    shopApi.getAllActiveShopsList("APPROVED").then(onSuccess, onFailure)
  }, [])

  useEffect(() => {
    getProductCategoryList();
    getShopList();
  }, [getProductCategoryList, getShopList]);

  const handleShopProducts = async (formValues) => {
    console.log('formValues', formValues)
    const data = {
      brand: formValues?.brand,
      caution: formValues?.caution,
      origin: formValues?.origin,
      description: formValues?.description,
      isexchange: formValues?.isexchange,
      product_profile_image: formValues?.product_profile_image,
      is_gst: formValues?.is_gst,
      mrp: formValues?.mrp,
      product_category: formValues?.product_category?._id,
      product_image: formValues?.product_image,
      name: formValues?.name,
      quantity: formValues?.quantity,
      isreturn: formValues?.isreturn,
      returnDays: formValues?.returnDays,
      selling_price: formValues?.selling_price,
      shop_category: formValues?.shop_category?._id,
      product_tax_value: formValues?.product_tax_value?.value,
      warranty: formValues?.warranty,
      discount: formValues?.discount,
      stock: formValues?.stock
    };
    if (isEdit) {
      const updatedData = {
        id: id,
        data: data
      };
      console.log('updated', updatedData);
      await dispatch(updateProductByid(updatedData));
      await navigate('/productslist');
    } else {
      await dispatch(addProduct(data));
      await navigate('/productslist');
    }
  };

  const formik = useFormik({
    initialValues: {
      product_category: productCategorycOptions.find(option => option.productCategoryName === data?.product_category?.productCategoryName || null),
      shop_category: shopListOptions.find(option => option.shop_name === data?.shop_category?.shop_name || null),
      name: data?.name || '',
      brand: data?.brand || '',
      origin: data?.origin || '',
      warranty: data?.warranty || '',
      description: data?.description || '',
      caution: data?.caution || '',
      quantity: data?.quantity || '',
      stock: data?.stock || '',
      mrp: data?.mrp || '',
      selling_price: data?.selling_price || '',
      is_gst: data?.is_gst || '',
      product_tax_value: data?.product_tax_value || '',
      isreturn: data?.isreturn || false,
      isexchange: data?.isexchange || false,
      discount: data?.discount || '',
      returnDays: data?.returnDays || '',
      product_image: data?.product_image || '/assets/images/notification1.png',
      product_profile_image: data?.product_profile_image || ['/assets/images/notification1.png'],
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      shop_category: yup.object().required('Please select a shop').nullable(),
      product_category: yup
        .object()
        .required('Please select product category')
        .nullable(),
      name: yup
        .string()
        .required('Product name is required')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/i, 'Special characters are not allowed')
        .min(3, 'Must be at least 3 characters long')
        .max(250, 'Max 250 characters are allowed')
        .nullable(),
      brand: yup
        .string()
        .required('Brand name is required')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/i, 'Special characters are not allowed')
        .min(3, 'Must be at least 3 characters long')
        .max(250, 'Max 250 characters are allowed')
        .nullable(),
      origin: yup
        .string()
        .required('Country of origin is required')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed')
        .min(3, 'Must be at least 3 characters long')
        .max(100, 'Max 100 characters are allowed')
        .nullable(),
      warranty: yup
        .string()
        .required('Product warranty is required')
        .matches(/^[0-9]+$/, 'Only numbers are allowed')
        .nullable(),
      description: yup
        .string()
        .required('Product description is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(1000, 'Max 1000 characters are allowed')
        .nullable(),
      caution: yup
        .string()
        .required('Caution is required')
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(500, 'Max 500 characters are allowed')
        .nullable(),
      quantity: yup
        .string()
        .required('Product quantity is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .nullable(),
      stock: yup
        .string()
        .required('Stock quantity is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .nullable(),
      mrp: yup
        .string()
        .required('Product MRP is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .nullable(),
      selling_price: yup
        .string()
        .required('Product selling price is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .test(
          'max-count',
          'Selling price should not be greater than MRP',
          (val) => parseInt(val) <= formik.values.mrp
        )
        .nullable(),
      is_gst: yup.bool().nullable(),
      product_tax_value: yup.object().nullable(),
      isreturn: yup.bool().nullable(),
      isexchange: yup.bool().nullable(),
      returnDays: yup.mixed().when(['isreturn', 'isexchange'], {
        is: (isreturn, isexchange) =>
          isreturn || isexchange,
        then: yup
          .number()
          //.object()
          .required('Return/Exchange days is required')
          .nullable(),
        otherwise: yup.object().nullable(),
      }),
      product_image: yup
        .string()
        .required('Please upload product profile image')
        .nullable(),
      product_profile_image: yup
        .array()
        .required('Please upload product images')
        .nullable(),
    }),
    onSubmit: handleShopProducts,
  });

  const handleProductSingleImgUpload = async (acceptedFiles) => {
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
      formData?.append('products_image', compressedFile, 'compressed_image.webp');

      const res = await dispatch(uploadProductImage(formData));
      const filepath = res.payload;
      console.log('filepath', filepath);
      if (filepath) {
        formik?.setFieldValue('product_image', filepath);
      } else {
        console.error('Filepath not found in the response.');
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleProductUploadImages = async (acceptedFiles) => {
    const options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    };
    let imagePaths = [];
    try {
      let formData = new FormData();

      for (let i = 0; i < acceptedFiles.length; i++) {
        const imageFile = acceptedFiles[i];
        const compressedFile = await imageCompression(imageFile, options);
        formData.append('products_images', compressedFile, `compressed_image_${i + 1}.webp`);
      };

      const response = await dispatch(uploadProductImages(formData));
      const uploadedDetails = response?.payload?.data;
      const webpPaths = uploadedDetails.filter(detail => detail.filename.endsWith('.webp')).map(detail => detail.filepath);

      // Update formik state with the webp image paths
      if (webpPaths.length > 0) {
        imagePaths = webpPaths;
        formik?.setFieldValue('product_profile_image', imagePaths);
        console.log('Webp image paths updated in formik:', imagePaths);
      } else {
        console.error('No webp format images found in the server response:', uploadedDetails);
      }
      console.log('response', response);
    } catch (error) {
      console.error('An error occurred during the upload:', error);
    }
  };

  const productApproveReject = (status) => {
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
        navigate('/productslist');
        // if (status === "APPROVED") {
        //   navigate('/productslist');
        // } else {
        //   navigate('/productsapprovallist');
        // }

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
    productApi.ProdcuctApproveReject(id, status).then(onSuccess, onFailure)
  };

  const handleDiscountCalculation = () => {
    const mrp = parseInt(formik.values.mrp) || 0;
    const selling_price = parseInt(formik.values.selling_price) || 0;
    const discount = ((mrp - selling_price) / mrp) * 100;
    return isNaN(discount) ? '' : `${discount.toFixed(2)}%`;
  };

  useEffect(() => {
    const mrp = parseInt(formik.values.mrp) || 0;
    const selling_price = parseInt(formik.values.selling_price) || 0;
    const discount = ((mrp - selling_price) / mrp) * 100;
    formik?.setFieldValue('discount', isNaN(discount) ? '' : discount.toFixed(2));
  }, [formik.values.mrp, formik.values.selling_price]);


  return (
    <>
      <section className={`${classes.root} ${classes.productContainer}`}>
        <Grid container>
          <Grid item xs={12}>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  size="small"
                  fullWidth
                  name="shop_category"
                  id="shop_category"
                  options={shopListOptions}
                  disabled={isVerify}
                  // value={formik?.values?.shop_category}
                  value={shopListOptions.find(option => option.shop_name === formik?.values?.shop_category?.shop_name) || null}
                  getOptionLabel={(option) => option.shop_name}
                  onChange={(e, value) => {
                    formik?.setFieldValue('shop_category', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Shop*"
                      error={formik.touched.shop_category && formik.errors.shop_category}
                      helperText={
                        formik.touched.shop_category &&
                        formik.errors.shop_category &&
                        formik.errors.shop_category
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
                  name="productCategoryName"
                  id="productCategoryName"
                  options={productCategorycOptions}
                  disabled={isVerify}
                  value={productCategorycOptions.find(option => option.productCategoryName === formik?.values?.product_category?.productCategoryName) || null}
                  // value={formik?.values?.product_category}
                  getOptionLabel={(option) => option.productCategoryName}
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
            </section>{' '}
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="name"
                  id="name"
                  value={formik?.values?.name}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  disabled={isVerify}
                  variant="outlined"
                  label="Product name*"
                  size="small"
                  error={
                    formik?.errors?.name && formik?.touched?.name
                  }
                  helperText={
                    formik?.errors?.name &&
                    formik?.touched?.name &&
                    formik?.errors?.name
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="brand"
                  id="brand"
                  value={formik?.values?.brand}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  disabled={isVerify}
                  variant="outlined"
                  label="Brand name*"
                  size="small"
                  error={
                    formik?.errors?.brand && formik?.touched?.brand
                  }
                  helperText={
                    formik?.errors?.brand &&
                    formik?.touched?.brand &&
                    formik?.errors?.brand
                  }
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="origin"
                  id="origin"
                  value={formik?.values?.origin}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  disabled={isVerify}
                  variant="outlined"
                  label="Country of origin*"
                  size="small"
                  error={
                    formik?.errors?.origin &&
                    formik?.touched?.origin
                  }
                  helperText={
                    formik?.errors?.origin &&
                    formik?.touched?.origin &&
                    formik?.errors?.origin
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="warranty"
                  id="warranty"
                  value={formik?.values?.warranty}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Product warranty*"
                  disabled={isVerify}
                  size="small"
                  error={formik?.errors?.warranty && formik?.touched?.warranty}
                  helperText={
                    formik?.errors?.warranty &&
                    formik?.touched?.warranty &&
                    formik?.errors?.warranty
                  }
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="description"
                  id="description"
                  value={formik?.values?.description}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Description*"
                  disabled={isVerify}
                  size="small"
                  multiline
                  rows={4}
                  error={
                    formik?.errors?.description && formik?.touched?.description
                  }
                  helperText={
                    formik?.errors?.description &&
                    formik?.touched?.description &&
                    formik?.errors?.description
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="caution"
                  id="caution"
                  value={formik?.values?.caution}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  disabled={isVerify}
                  variant="outlined"
                  label="Caution*"
                  size="small"
                  multiline
                  rows={4}
                  error={formik?.errors?.caution && formik?.touched?.caution}
                  helperText={
                    formik?.errors?.caution &&
                    formik?.touched?.caution &&
                    formik?.errors?.caution
                  }
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="quantity"
                  id="quantity"
                  value={formik?.values?.quantity}
                  onChange={formik?.handleChange}
                  type={'text'}
                  disabled={isVerify}
                  fullWidth
                  variant="outlined"
                  label="Quantity*"
                  size="small"
                  error={formik?.errors?.quantity && formik?.touched?.quantity}
                  helperText={
                    formik?.errors?.quantity &&
                    formik?.touched?.quantity &&
                    formik?.errors?.quantity
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="stock"
                  id="stock"
                  value={formik?.values?.stock}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  disabled={isVerify}
                  variant="outlined"
                  label="Stock*"
                  size="small"
                  error={formik?.errors?.stock && formik?.touched?.stock}
                  helperText={
                    formik?.errors?.stock &&
                    formik?.touched?.stock &&
                    formik?.errors?.stock
                  }
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="mrp"
                  id="mrp"
                  value={formik?.values?.mrp}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  disabled={isVerify}
                  label="MRP*"
                  size="small"
                  error={formik?.errors?.mrp && formik?.touched?.mrp}
                  helperText={
                    formik?.errors?.mrp &&
                    formik?.touched?.mrp &&
                    formik?.errors?.mrp
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="selling_price"
                  id="selling_price"
                  value={formik?.values?.selling_price}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  disabled={isVerify}
                  variant="outlined"
                  label="Selling price*"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.password}
                      >
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#129A43',
                            backgroundColor: '#E2E2E2',
                            paddingInline: 12,
                            paddingBlock: 2,
                            borderRadius: 4,
                            fontWeight: 600,
                          }}
                        >
                          Dis: {handleDiscountCalculation()}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  error={
                    formik?.errors?.selling_price &&
                    formik?.touched?.selling_price
                  }
                  helperText={
                    formik?.errors?.selling_price &&
                    formik?.touched?.selling_price &&
                    formik?.errors?.selling_price
                  }
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      id="is_gst"
                      name="is_gst"
                      checked={formik?.values?.is_gst}
                      control={<Checkbox />}
                      disabled={isVerify}
                      label="Inclusive of GST"
                      labelPlacement="end"
                      onChange={(e) =>
                        formik?.setFieldValue(
                          `is_gst`,
                          e?.target?.checked
                        )
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  size="small"
                  fullWidth
                  name="product_tax_value"
                  id="product_tax_value"
                  options={taxRateOptions}
                  value={formik?.values?.product_tax_value}
                  getOptionLabel={(option) => option.label || formik?.values?.product_tax_value}
                  onChange={(e, value) => {
                    formik?.setFieldValue('product_tax_value', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tax rate"
                      error={formik.touched.product_tax_value && formik.errors.product_tax_value}
                      helperText={
                        formik.touched.product_tax_value &&
                        formik.errors.product_tax_value &&
                        formik.errors.product_tax_value
                      }
                    />
                  )}
                />
              </Grid>
            </section>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      id="isreturn"
                      name="isreturn"
                      checked={formik?.values?.isreturn}
                      control={<Checkbox />}
                      label="Return available"
                      labelPlacement="end"
                      disabled={isVerify}
                      onChange={(e) =>
                        formik?.setFieldValue(
                          `isreturn`,
                          e?.target?.checked
                        )
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      id="isexchange"
                      name="isexchange"
                      disabled={isVerify}
                      checked={formik?.values?.isexchange}
                      control={<Checkbox />}
                      label="Exchange available"
                      labelPlacement="end"
                      onChange={(e) =>
                        formik?.setFieldValue(
                          `isexchange`,
                          e?.target?.checked
                        )
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </section>
            {formik?.values?.isreturn ||
              formik?.values?.isexchange ? (
              <Grid item xs={12} sm={5.9} className={classes.input}>
                <TextField
                  name="returnDays"
                  id="returnDays"
                  value={formik?.values?.returnDays}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  disabled={isVerify}
                  variant="outlined"
                  label="Return days*"
                  size="small"
                  error={
                    formik?.errors?.returnDays && formik?.touched?.returnDays
                  }
                  helperText={
                    formik?.errors?.returnDays &&
                    formik?.touched?.returnDays &&
                    formik?.errors?.returnDays
                  }
                />
              </Grid>
            ) : (
              <></>
            )}
          </Grid>

          {/* Product main profile image */}
          <Grid item xs={12} className={classes.infoLabel}>
            {isVerify ?
              <Typography variant="body1">Main product image</Typography> :
              <Typography variant="body1">Upload main product image</Typography>
            }
          </Grid>
          <Grid item xs={12} sm={5.9} className={classes.input}>
            {!isVerify &&
              <section
              // className={
              //   !_.isEmpty(formik?.values?.product_image)
              //     ? classes.disableWrapper
              //     : classes.uploadWrapper
              // }
              >
                <ImageUploader
                  upload={handleProductSingleImgUpload}
                  title="Upload your product profile image"
                  multiple={false}
                  maxFiles={1}
                />
              </section>
            }
            <Grid item xs={12} className={classes.error}>
              <Typography variant="subtitle1">
                {formik?.errors?.product_image &&
                  formik?.touched?.product_image &&
                  formik?.errors?.product_image}
              </Typography>
            </Grid>
            <section className={classes.imgWrapper}>
              <img
                src={`${imageUrl}/${formik?.values?.product_image}`}
                alt="img"
                className={classes.img}
              />
              {!isVerify &&
                <div className={classes.deleteBtnWrapper}>
                  <CloseOutlinedIcon />
                </div>
              }
            </section>
          </Grid>

          {/* Product images */}
          {/* <Grid item xs={12} className={classes.infoLabel}>
            {isVerify ?
              <Typography variant="body1">Product image</Typography> :
              <Typography variant="body1">Upload more product image</Typography>
            }
          </Grid> */}
          {/* <Grid item xs={12} sm={5.9} className={classes.uploadWrapper}>
            <section
              className={
                !_.isEmpty(formik?.values?.product_profile_image)
                  ? classes.disableWrapper
                  : classes.uploadWrapper
              }
            >
              <ImageUploader
                upload={handleProductUploadImages}
                title={'Upload banner image'}
                getErrors={true}
                setUploadErrors={setUploadErrors}
                multiple={true}
                maxFiles={3}
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
            <Grid item xs={12}>
              {formik?.values?.product_profile_image?.map((image => (
                <>
                  <Grid className={classes.error}>
                    <Typography variant="subtitle1">
                      {formik?.errors?.product_profile_image &&
                        formik?.touched?.product_profile_image &&
                        formik?.errors?.product_profile_image}
                    </Typography>
                  </Grid>
                  <section className={classes.imgWrapper}>

                    <img
                      src={`${imageUrl}/${image}`}
                      alt="img"
                      className={classes.img}
                    />
                    <div className={classes.deleteBtnWrapper}>
                    <CloseOutlinedIcon />
                  </div>
                  </section>
                </>
              )))}
            </Grid>
          </Grid> */}

          {/* NEW CODE */}
          {/* Product main profile image */}



          <Grid item xs={12} className={classes.infoLabel}>
            {isVerify ?
              <Typography variant="body1">Product image</Typography> :
              <Typography variant="body1">Upload more product image</Typography>
            }
          </Grid>
          <Grid item xs={12} sm={5.9} className={classes.input}>
            {!isVerify &&
              <section
                className={
                  !_.isEmpty(formik?.values?.product_profile_image)
                    ? classes.disableWrapper
                    : classes.uploadWrapper
                }
              >
                <ImageUploader
                  upload={handleProductUploadImages}
                  title={'Upload banner image'}
                  getErrors={true}
                  setUploadErrors={setUploadErrors}
                  multiple={true}
                  maxFiles={3}
                />
              </section>
            }



            <Grid item xs={12} className={classes.error}>
              <Typography variant="subtitle1">
                {formik?.errors?.product_profile_image &&
                  formik?.touched?.product_profile_image &&
                  formik?.errors?.product_profile_image}
              </Typography>
            </Grid>
            {console.log('formik?.values?.product_profile_image', formik?.values?.product_profile_image)}
            <Grid item xs={12} style={{ display: 'flex', gap: '10px' }}>
              {formik?.values?.product_profile_image?.map((image) => (
                < section className={classes.imgWrapper} >
                  <img
                    src={`${imageUrl}/${image}`}
                    alt="img"
                    className={classes.img}
                  />
                  {!isVerify &&
                    <div className={classes.deleteBtnWrapper}>
                      <CloseOutlinedIcon />
                    </div>
                  }
                </section>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.btn}>
            {isVerify ?
              <>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#dd0000", color: "#fff", width: "15%" }}
                  disableElevation
                  onClick={() => productApproveReject("REJECTED")}
                  sx={{ backgroundColor: theme.palette.common.error }}
                >
                  Reject
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  variant="contained"
                  style={{ width: "15%" }}
                  onClick={() => productApproveReject("APPROVED")}
                >
                  Accept
                </Button>

              </>
              :
              <Button
                variant="contained"
                disableElevation
                onClick={formik?.handleSubmit}
              >
                Save
              </Button>
            }
          </Grid>

          {/* Variant table data */}
          {/* <Grid item xs={12}>
            {!_.isEmpty(variantList || []) && variantList && (
              <Grid
                item
                xs={12}
             
                className={classes.table}
              >
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="body2">Variant Image</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">Variant Color</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">Variant MRP</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            Variant Selling Price
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">Discount (%)</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {' '}
                            Variant Stock Quantity
                          </Typography>
                        </TableCell>
                        <TableCell align="center">Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mode?.toLowerCase() === 'edit'
                        ? _.map(variantList || [], (data, idx) => (
                          <>
                            <TableRow
                              key={idx}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">
                                <img
                                  src={'/assets/images/notification1.png'}
                                  alt="img"
                                  className={classes.variantImgWrapper}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">
                                  {!_.isEmpty(data?.Product?.color)
                                    ? data?.Product?.color
                                    : '-'}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">
                                  {data?.Product?.actual_price}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">
                                  {data?.Product?.selling_price}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">
                                  {data?.Product?.discount_perc || 0}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">
                                  {data?.Product?.stock}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <div className={classes.removeIcon}>
                                  <DeleteIcon
                                  onClick={() =>
                                    removeVariantListData(
                                      data?.Product?._id,
                                      idx
                                    )
                                  }
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          </>
                        ))
                        : _.map(variantList || [], (data, idx) => (
                          <>
                            <TableRow
                              key={idx}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">
                                <img
                                  src={'/assets/images/notification1.png'}
                                  alt="img"
                                  className={classes.variantImgWrapper}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <div className={classes.variantColor}>
                                  <Typography
                                    variant="body2"
                                    style={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: 4,
                                      backgroundColor: data?.variantColor,
                                    }}
                                  >
                                    {!_.isEmpty(data?.variantColor)
                                      ? data?.variantColor
                                      : '-'}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">
                                  {data?.variantMrp}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">
                                  {data?.variantSellingPrice}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">
                                  {data?.variantDiscount || 0}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">
                                  {data?.variantStockQuantity}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <div className={classes.removeIcon}>
                                  <DeleteIcon
                                  onClick={() =>
                                    removeVariantListData(
                                      data?.Product?._id,
                                      idx
                                    )
                                  }
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} className={classes.variantBtn}>
            <Button
              variant="contained"
              disableElevation
              onClick={handleOpenVariantModal}
            >
              + Add Product Variant
            </Button>
          </Grid>

          <Grid item xs={12} className={classes.btn}>
            <Button
              variant="contained"
              disableElevation
              onClick={formik?.handleSubmit}
            >
              Add
            </Button>
          </Grid> */}
        </Grid>
      </section >
      <AddProductVariant
        open={openVariantModal}
        handleClose={handleCloseVariantModal}
      />
    </>
  )
}

export default AddLightBulbs
