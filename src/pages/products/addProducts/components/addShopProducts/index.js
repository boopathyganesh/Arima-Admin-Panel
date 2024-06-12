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
  InputAdornment,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import imageCompression from 'browser-image-compression'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import _ from 'lodash'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';

import productCategoryApi from 'services/productCategory';
import { showLoader, hideLoader } from 'redux/loader/actions';
import { useDispatch } from 'react-redux';
import AddLightBulbs from './shopProducts/addLightBulbs'

const taxRateOptions = [
  { label: '0%', value: 0 },
  { label: '5%', value: 5 },
  { label: '12%', value: 12 },
  { label: '18%', value: 18 },
  { label: '28%', value: 28 },
]

const AddShopProducts = (props) => {
  const { mode, data, isEdit, productData } = props
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [productCategorycOptions, setProductCategoryOptions] = useState([])


  const handleMasterList = (formValues) => {
    navigate(`/addshopproduct/${formValues?.productCategory?._id}`)
  };
  // Get all Shop list api
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
      console.log('get all product category list Api', err)
    }
    productCategoryApi.getAllProductCategory("APPROVED").then(onSuccess, onFailure)
  }, [])
  useEffect(() => {
    getProductCategoryList();
  }, [getProductCategoryList]);

  // const formik = useFormik({
  //   initialValues: {
  //     productCategory: productCategorycOptions.find(option => option.productCategoryName === data?.product_category?.productCategoryName || null),
  //     // subCategory: null,
  //   },
  //   enableReinitialize: true,
  //   validationSchema: yup.object({
  //     productCategory: yup
  //       .object()
  //       .required('Please select product category')
  //       .nullable(),
  //     // subCategory: yup
  //     //   .object()
  //     //   .required('Please select product sub category')
  //     //   .nullable(),
  //   }),
  //   onSubmit: handleMasterList,
  // })
  return (
    <>
      {/* <Grid container className={classes.container}> */}
        {/* <Grid item xs={12}>
          <section className={classes.fieldWrapper}>
            <Grid item xs={12} sm={6} className={classes.input}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                disabled={true}
                name="productCategoryName"
                id="productCategoryName"
                options={productCategorycOptions}
                value={productCategorycOptions.find(option => option.productCategoryName === formik?.values?.productCategory?.productCategoryName) || null}
                getOptionLabel={(option) => option?.productCategoryName}
                onChange={(e, value) => {
                  formik?.setFieldValue('productCategory', value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product category*"
                    error={formik.touched.productCategory && Boolean(formik.errors.productCategory)}
                    helperText={formik.touched.productCategory && formik.errors.productCategory}
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
                name="subCategory"
                id="subCategory"
                options={subCategorycOptions}
                value={formik?.values?.subCategory}
                getOptionLabel={(option) => option.name || ''}
                onChange={(e, value) => {
                  formik?.setFieldValue('subCategory', value)
                }}
                noOptionsText={
                  _.isEmpty(formik?.values?.productCategory)
                    ? 'Please select product category'
                    : 'No options'
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sub category*"
                    error={
                      formik.touched.subCategory && formik.errors.subCategory
                    }
                    helperText={
                      formik.touched.subCategory &&
                      formik.errors.subCategory &&
                      formik.errors.subCategory
                    }
                  />
                )}
              />
            </Grid> 
          </section>
        </Grid>
        <Grid item xs={12} className={classes.btn}>
          <Button
            variant="contained"
            disableElevation
            onClick={formik?.handleSubmit}
          >
            Next
          </Button>
        </Grid> */}
        <AddLightBulbs data={data} />
      {/* </Grid> */}
    </>
  )
}

export default AddShopProducts
