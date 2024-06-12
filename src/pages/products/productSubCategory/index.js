import React, { useState, useCallback, useEffect } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography, Button } from '@mui/material'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import AddIcon from '@mui/icons-material/Add'
import CustomSwitch from 'sharedComponents/customSwitch'
import AddProductSubCategory from './addProductSubCategory'
import productsApi from 'services/products'
import { useDispatch } from 'react-redux'
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import _ from 'lodash'
import { imageUrl } from 'constants'
import CustomPermissionDialog from 'sharedComponents/customPermissionDialog'

const sampleData = [
  {
    id: 1,
    ProductCategory: 'Cables',
    ProductSubCategory: 'Tv Cables',
    status: true,
  },
  {
    id: 2,
    ProductCategory: 'Lights',
    ProductSubCategory: 'LED light',
    status: false,
  },
  {
    id: 3,
    ProductCategory: 'Batteries',
    ProductSubCategory: 'Lithium batteries',
    status: true,
  },
]

const ProductSubCategory = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const dispatch = useDispatch()
  const [row, setRow] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [openProductSubCategoryModal, setOpenProductSubCategoryModal] =
    useState(false)
  const [mode, setMode] = useState('new')
  const [productSubCategoryId, setProductSubCategoryId] = useState(null)
  const [openPermissionModal, setOpenPermissionModal] = useState(false)

  // handle product sub category modal
  const handleOpenProductSubCategoryModal = () => {
    setOpenProductSubCategoryModal(true)
  }
  const handleCloseProductSubCategoryModal = () => {
    setOpenProductSubCategoryModal(false)
    setMode('new')
    setProductSubCategoryId(null)
    getAllProductSubCategoryList()
  }

  // handle delete permission modal
  const handleOpenPermissionModal = (row) => {
    setOpenPermissionModal(true)
    setProductSubCategoryId(row?._id)
  }
  const handleClosePermissionModal = () => {
    setOpenPermissionModal(false)
    setProductSubCategoryId(null)
  }

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    productCategory: data?.productCategory?.productCategoryName,
    productSubCategory: data?.productSubCategoryName,
    image: data?.image,
    status: data?.status,
    row: data,
  }))

  const columns = [
    {
      field: 'sno',
      headerName: 'S.No',
      minWidth: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.rowPadding}>
              <Typography variant="body2">{params?.row?.sno}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'productCategory',
      headerName: 'Product Category',
      minWidth: 280,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.productCategory}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'productSubCategory',
      headerName: 'Product SubCategory',
      minWidth: 280,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.productSubCategory}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'image',
      headerName: 'Image',
      minWidth: 120,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <img
                src={imageUrl + '/' + params?.row?.image}
                alt="img"
                width={80}
                height={50}
              />
            </div>
          </>
        )
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <CustomSwitch
                checked={params?.row?.status}
                onChange={() => handleChange(params?.row?.row)}
              />
            </div>
          </>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 160,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.iconsWrapper}>
              <section
                className={classesTable.editIcon}
                onClick={() => editProductSubCategory(params?.row?.row)}
              >
                <img
                  src="/assets/images/edit.svg"
                  alt="edit"
                  className={classes.editImg}
                />
              </section>
              <section
                className={classesTable.deleteIcon}
                onClick={() => handleOpenPermissionModal(params?.row?.row)}
              >
                <img
                  src="/assets/images/delete.svg"
                  alt="delete"
                  className={classes.deleteImg}
                />
              </section>
            </div>
          </>
        )
      },
    },
  ]

  // Get all product subcategory list api
  const getAllProductSubCategoryList = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status?.toString().toLowerCase() === 'true') {
        setRow(res?.data?.data)
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader())
      console.log('get all product subcategory list Api', err)
    }
    productsApi.getAllProductSubCategory().then(onSuccess, onFailure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    getAllProductSubCategoryList()
  }, [getAllProductSubCategoryList])

  // update product category status
  const handleChange = (item) => {
    dispatch(showLoader('Loading please wait...'))
    const data = {
      status: item?.status === 1 ? 0 : 1,
    }
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status?.toString().toLowerCase() === 'true') {
        dispatch(
          showSnackbar({
            message: res?.data?.message || 'Info updated successfully',
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            variant: 'success',
          })
        )
        getAllProductSubCategoryList()
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
      console.log('update product subcategory Api', err)
    }
    productsApi
      .updateProductSubCategory(item?._id, data)
      .then(onSuccess, onFailure)
  }

  // Update product subcategory
  const editProductSubCategory = (row) => {
    setMode('edit')
    setProductSubCategoryId(row?._id)
    handleOpenProductSubCategoryModal()
  }

  // delete product subcategory
  const handleRemoveProductSubCategory = () => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status?.toString().toLowerCase() === 'true') {
        dispatch(
          showSnackbar({
            message: res?.data?.message || 'Info deleted successfully',
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            variant: 'success',
          })
        )
        handleClosePermissionModal()
        getAllProductSubCategoryList()
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
      console.log('delete product subcategory Api', err)
    }
    productsApi
      .removeProductSubCategory(productSubCategoryId)
      .then(onSuccess, onFailure)
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Product SubCategory</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">{row?.length}</Typography>
              </div>
            </section>
            <section className={classesTable.addBtn}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleOpenProductSubCategoryModal}
              >
                <AddIcon /> Add
              </Button>
            </section>
          </section>
        </Grid>
        <Grid item xs={12} className={classesTable.tableWrapper}>
          <CustomDataGrid
            getRowId={(row) => row?.row?._id}
            rows={dataRows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            fileName={'product_subcategory_list'}
          />
        </Grid>
      </Grid>
      <AddProductSubCategory
        open={openProductSubCategoryModal}
        handleClose={handleCloseProductSubCategoryModal}
        mode={mode}
        productSubCategoryId={productSubCategoryId}
      />
      <CustomPermissionDialog
        open={openPermissionModal}
        handleClose={handleClosePermissionModal}
        onClickYes={handleRemoveProductSubCategory}
      />
    </>
  )
}

export default ProductSubCategory
