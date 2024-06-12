import React, { useState } from 'react'
import useStyles from 'pages/products/addProducts/style'
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import _ from 'lodash'
import * as XLSX from 'xlsx'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import imageCompression from 'browser-image-compression'

const UploadExcel = () => {
  const classes = useStyles()
  const [row, setRow] = useState([])
  const [pageSize, setPageSize] = useState(50)
  const [uploadErrors, setUploadErrors] = useState([])

  // Save multiple bulk master list products
  const handleBulkUpload = () => {
    // dispatch(showLoader('Loading please wait...'))
    // const data = row?.map((data) => {
    //   return {
    //     sno: data?.sno,
    //     main_category:
    //       mainCategoryOptions.find(
    //         (item) =>
    //           item?.name?.toLowerCase() === data?.main_category?.toLowerCase()
    //       )?._id || '',
    //     shop_category:
    //       shopCategoryOptions.find(
    //         (item) =>
    //           item?.name?.toLowerCase() === data?.shop_category?.toLowerCase()
    //       )?._id || '',
    //     product_category:
    //       productCategoryOptions.find(
    //         (item) =>
    //           item?.name?.toLowerCase() ===
    //           data?.product_category?.toLowerCase()
    //       )?._id || '',
    //     name: data?.name,
    //     image: !_.isEmpty(data?.image)
    //       ? JSON.stringify([{ photo: `master/products/${data?.image}` }])
    //       : '',
    //     food_classification: data?.food_classification,
    //     brand: data?.brand,
    //     describtion: data?.description,
    //     orgin: data?.origin,
    //     dimension: data?.dimension,
    //     caution: data?.caution,
    //     counts: data?.quantity,
    //     unit: _.isEmpty(data?.unit) ? 'Nos' : data?.unit,
    //     actual_price: _.isEmpty(data?.actual_price)
    //       ? 0
    //       : Number(data?.actual_price),
    //   }
    // })
    // const onSuccess = (res) => {
    //   dispatch(hideLoader())
    //   dispatch(
    //     showSnackbar({
    //       message:
    //         res?.data?.status?.toLowerCase() === 'true'
    //           ? res?.data?.message || 'Added products successfully'
    //           : res?.data?.message || 'Failed to fetch the data',
    //       autoHideDuration: 3000,
    //       anchorOrigin: {
    //         vertical: 'top',
    //         horizontal: 'right',
    //       },
    //       variant:
    //         res?.data?.status?.toLowerCase() === 'true' ? 'success' : 'error',
    //     })
    //   )
    //   if (res?.data?.status?.toLowerCase() === 'true') {
    //     formik.resetForm()
    //     setRow([])
    //   }
    // }
    // const onFailure = (err) => {
    //   dispatch(hideLoader())
    //   showSnackbar({
    //     message: err?.data?.message || 'Failed to fetch the data',
    //     autoHideDuration: 3000,
    //     anchorOrigin: {
    //       vertical: 'top',
    //       horizontal: 'right',
    //     },
    //     variant: 'error',
    //   })
    //   console.log('add bulk master list product api', err)
    // }
    // // console.log('ooooo', data)
    // productsApi
    //   .saveBulkMasterListProducts({ products: data })
    //   .then(onSuccess, onFailure)
  }

  const formik = useFormik({
    initialValues: {
      file: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      file: yup.string().required('Please upload a products excel sheet'),
    }),
    onSubmit: handleBulkUpload,
  })

  // Set the row error field
  const getRowClassName = (params) => {
    if (params.row.isAllValid === false) {
      return classes.errorRow // return custom class name for active rows
    }
    return '' // return empty string for other rows
  }

  // Check if the product row has all required values
  const checkValidProduct = (row, type) => {
    // if (row?.main_category?.toLowerCase() === 'product') {
    //   const checkValidMainCategory = mainCategoryOptions?.find(
    //     (data) =>
    //       data?.name?.toLowerCase() === row?.main_category?.toLowerCase()
    //   )
    //   const checkValidShopCategory = shopCategoryOptions?.find(
    //     (data) =>
    //       data?.name?.toLowerCase() === row?.shop_category?.toLowerCase()
    //   )
    //   const checkValidProductCategory = productCategoryOptions?.find(
    //     (data) =>
    //       data?.name?.toLowerCase() === row?.product_category?.toLowerCase()
    //   )
    //   const checkNameExist = !_.isEmpty(row?.name)
    //   const checkImageExist = !_.isEmpty(row?.image)
    //   const checkFoodTypeExist = true
    //   const checkBrandExist = !_.isEmpty(row?.brand)
    //   const checkDescriptionExist = !_.isEmpty(row?.description)
    //   const checkOriginExist = !_.isEmpty(row?.origin)
    //   const checkValidDimension = dimensionOptions?.find(
    //     (data) => data?.label?.toLowerCase() === row?.dimension?.toLowerCase()
    //   )
    //   const checkCautionExist = !_.isEmpty(row?.caution)
    //   const checkQuantityExist = !_.isEmpty(row?.quantity)
    //   const checkValidUnit = unitOptions?.find(
    //     (data) => data?.label?.toLowerCase() === row?.unit?.toLowerCase()
    //   )
    //   return type === 'bool'
    //     ? Boolean(
    //         checkValidMainCategory &&
    //           checkValidShopCategory &&
    //           checkValidProductCategory &&
    //           checkNameExist &&
    //           checkImageExist &&
    //           checkBrandExist &&
    //           checkDescriptionExist &&
    //           checkOriginExist &&
    //           checkValidDimension &&
    //           checkCautionExist &&
    //           checkQuantityExist &&
    //           checkValidUnit
    //       )
    //     : {
    //         checkValidMainCategory,
    //         checkValidShopCategory,
    //         checkValidProductCategory,
    //         checkNameExist,
    //         checkImageExist,
    //         checkFoodTypeExist,
    //         checkBrandExist,
    //         checkDescriptionExist,
    //         checkOriginExist,
    //         checkValidDimension,
    //         checkCautionExist,
    //         checkQuantityExist,
    //         checkValidUnit,
    //       }
    // } else if (row?.main_category?.toLowerCase() === 'food') {
    //   const checkValidMainCategory = mainCategoryOptions?.find(
    //     (data) =>
    //       data?.name?.toLowerCase() === row?.main_category?.toLowerCase()
    //   )
    //   const checkValidShopCategory = shopCategoryOptions?.find(
    //     (data) =>
    //       data?.name?.toLowerCase() === row?.shop_category?.toLowerCase()
    //   )
    //   const checkValidProductCategory = productCategoryOptions?.find(
    //     (data) =>
    //       data?.name?.toLowerCase() === row?.product_category?.toLowerCase()
    //   )
    //   const checkNameExist = !_.isEmpty(row?.name)
    //   const checkImageExist = !_.isEmpty(row?.image)
    //   const checkFoodTypeExist = foodClassificationOptions?.find(
    //     (data) =>
    //       data?.name?.toLowerCase() === row?.food_classification?.toLowerCase()
    //   )
    //   const checkBrandExist = true
    //   const checkDescriptionExist = !_.isEmpty(row?.description)
    //   const checkOriginExist = true
    //   const checkValidDimension = true
    //   const checkCautionExist = true
    //   const checkQuantityExist = true
    //   const checkValidUnit = true
    //   return type === 'bool'
    //     ? Boolean(
    //         checkValidMainCategory &&
    //           checkValidShopCategory &&
    //           checkValidProductCategory &&
    //           checkNameExist &&
    //           checkImageExist &&
    //           checkFoodTypeExist &&
    //           checkDescriptionExist
    //       )
    //     : {
    //         checkValidMainCategory,
    //         checkValidShopCategory,
    //         checkValidProductCategory,
    //         checkNameExist,
    //         checkImageExist,
    //         checkFoodTypeExist,
    //         checkBrandExist,
    //         checkDescriptionExist,
    //         checkOriginExist,
    //         checkValidDimension,
    //         checkCautionExist,
    //         checkQuantityExist,
    //         checkValidUnit,
    //       }
    // } else if (row?.main_category?.toLowerCase() === 'service') {
    //   const checkValidMainCategory = mainCategoryOptions?.find(
    //     (data) =>
    //       data?.name?.toLowerCase() === row?.main_category?.toLowerCase()
    //   )
    //   const checkValidShopCategory = shopCategoryOptions?.find(
    //     (data) =>
    //       data?.name?.toLowerCase() === row?.shop_category?.toLowerCase()
    //   )
    //   const checkValidProductCategory = productCategoryOptions?.find(
    //     (data) =>
    //       data?.name?.toLowerCase() === row?.product_category?.toLowerCase()
    //   )
    //   const checkNameExist = !_.isEmpty(row?.name)
    //   const checkImageExist = !_.isEmpty(row?.image)
    //   const checkFoodTypeExist = true
    //   const checkBrandExist = true
    //   const checkDescriptionExist = !_.isEmpty(row?.description)
    //   const checkOriginExist = true
    //   const checkValidDimension = true
    //   const checkCautionExist = true
    //   const checkQuantityExist = true
    //   const checkValidUnit = true
    //   return type === 'bool'
    //     ? Boolean(
    //         checkValidMainCategory &&
    //           checkValidShopCategory &&
    //           checkValidProductCategory &&
    //           checkNameExist &&
    //           checkImageExist &&
    //           checkDescriptionExist
    //       )
    //     : {
    //         checkValidMainCategory,
    //         checkValidShopCategory,
    //         checkValidProductCategory,
    //         checkNameExist,
    //         checkImageExist,
    //         checkFoodTypeExist,
    //         checkBrandExist,
    //         checkDescriptionExist,
    //         checkOriginExist,
    //         checkValidDimension,
    //         checkCautionExist,
    //         checkQuantityExist,
    //         checkValidUnit,
    //       }
    // } else {
    //   return false
    // }
  }

  // Upload excel file
  const uploadExcelFile = (acceptedFiles) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const binaryData = event.target.result
      const workbook = XLSX.read(binaryData, { type: 'binary' })
      const worksheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[worksheetName]
      // to extract header title separately
      // const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      // Header title will acts as a key for all values
      const data = XLSX.utils.sheet_to_json(worksheet, {
        defval: '',
        raw: false,
      })
      // console.log(data)
      setRow(data)
      formik.setFieldValue('file', acceptedFiles?.[0]?.path)
    }
    reader.readAsBinaryString(acceptedFiles[0])
  }

  const productDataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    mainCategory: data?.main_category,
    shopCategory: data?.shop_category,
    productCategory: data?.product_category,
    name: data?.name,
    image: data?.image,
    brand: data?.brand,
    foodClassification: data?.food_classification || '',
    description: data?.description,
    origin: data?.origin,
    dimension: data?.dimension,
    caution: data?.caution,
    quantity: data?.quantity,
    unit: data?.unit,
    actualPrice: data?.actual_price,
    isAllValid: checkValidProduct(data, 'bool'),
    isAllValidState: checkValidProduct(data, 'state'),
    row: data,
  }))

  const productColumns = [
    {
      field: 'sno',
      headerName: 'S.No',
      minWidth: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">{params?.row?.sno}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'mainCategory',
      headerName: 'Main Category',
      minWidth: 150,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkValidMainCategory &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.mainCategory)
                  ? params?.row?.mainCategory
                  : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'shopCategory',
      headerName: 'Shop Category',
      minWidth: 150,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkValidShopCategory &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.shopCategory)
                  ? params?.row?.shopCategory
                  : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'productCategory',
      headerName: 'Product Category',
      minWidth: 150,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkValidProductCategory &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.productCategory)
                  ? params?.row?.productCategory
                  : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'name',
      headerName: 'Product Name',
      minWidth: 260,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkNameExist &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.name) ? params?.row?.name : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'image',
      headerName: 'Product Image',
      minWidth: 150,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkImageExist &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.image) ? params?.row?.image : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'brand',
      headerName: 'Product Brand',
      minWidth: 220,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkBrandExist &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.brand) ? params?.row?.brand : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'foodClassification',
      headerName: 'Type',
      minWidth: 180,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkFoodTypeExist &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.foodClassification)
                  ? params?.row?.foodClassification
                  : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'description',
      headerName: 'Product Description',
      minWidth: 280,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkDescriptionExist &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.description)
                  ? params?.row?.description
                  : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'origin',
      headerName: 'Country Of Origin',
      minWidth: 150,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkOriginExist &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.origin) ? params?.row?.origin : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'dimension',
      headerName: 'Dimension',
      minWidth: 120,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkValidDimension &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.dimension)
                  ? params?.row?.dimension
                  : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'caution',
      headerName: 'Caution',
      minWidth: 280,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkCautionExist &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.caution) ? params?.row?.caution : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'quantity',
      headerName: 'Product Quantity',
      minWidth: 150,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkQuantityExist &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {!_.isEmpty(params?.row?.quantity)
                  ? params?.row?.quantity
                  : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'unit',
      headerName: 'Product Unit',
      minWidth: 150,
      sortable: true,
      cellClassName: (params) => {
        return !params?.row?.isAllValidState?.checkValidUnit &&
          params?.row?.isAllValid === false
          ? classes.errorColumn
          : ''
      },
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {' '}
                {!_.isEmpty(params?.row?.unit) ? params?.row?.unit : '-'}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'actualPrice',
      headerName: 'Product MRP',
      minWidth: 150,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classes.lightText}>
              <Typography variant="body2">
                {params?.row?.actualPrice}
              </Typography>
            </div>
          </>
        )
      },
    },
  ]

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={5.9} className={classes.wrapper}>
          <section className={classes.uploadWrapper}>
            <ImageUploader
              upload={uploadExcelFile}
              title="Upload product excel file"
              getErrors={true}
              setUploadErrors={setUploadErrors}
              fileType={`application/*': ['.xlsx']`}
              fileLabel={'.xlsx, file size no more than 5MB'}
            />
          </section>
          <Grid item xs={12} className={classes.error}>
            <Typography variant="subtitle1">
              {formik?.errors?.file &&
                formik?.touched?.file &&
                formik?.errors?.file}
            </Typography>
          </Grid>
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
          {!_.isEmpty(productDataRows) && (
            <Grid item xs={12} className={classes.rowsCaptions}>
              <Typography variant="body1">
                Total rows :- {productDataRows?.length}
                <br />
                Error filled rows :-{' '}
                {productDataRows?.filter((data) => data?.isAllValid === false)
                  ?.length || 0}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} className={classes.btn}>
          <Button
            variant="contained"
            disableElevation
            onClick={formik?.handleSubmit}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default UploadExcel
