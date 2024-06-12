import React, { useState } from 'react'
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
import { useNavigate } from 'react-router-dom'

const taxRateOptions = [
  { label: '0%', value: 0 },
  { label: '5%', value: 5 },
  { label: '12%', value: 12 },
  { label: '18%', value: 18 },
  { label: '28%', value: 28 },
]

const AddMasterListProducts = (props) => {
  const { mode } = props
  const classes = useStyles()
  const navigate = useNavigate()
  const [productCategorycOptions, setProductCategoryOptions] = useState([
    { name: 'Light bulbs' },
  ])
  const [subCategorycOptions, setSubCategoryOptions] = useState([
    { name: 'LED bulbs' },
  ])

  const handleMasterList = (formValues) => {
    navigate('/addmasterproduct/123/123')
  }

  const formik = useFormik({
    initialValues: {
      productCategory: null,
      subCategory: null,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      productCategory: yup
        .object()
        .required('Please select product category')
        .nullable(),
      subCategory: yup
        .object()
        .required('Please select product sub category')
        .nullable(),
    }),
    onSubmit: handleMasterList,
  })

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <section className={classes.fieldWrapper}>
            <Grid item xs={12} sm={6} className={classes.input}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="productCategory"
                id="productCategory"
                options={productCategorycOptions}
                value={formik?.values?.productCategory}
                getOptionLabel={(option) => option.name || ''}
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
        </Grid>
      </Grid>
    </>
  )
}

export default AddMasterListProducts
