import React, { useCallback, useEffect, useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography, Button } from '@mui/material'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import AddIcon from '@mui/icons-material/Add'
import CustomSwitch from 'sharedComponents/customSwitch'
import AddProductCategory from './addProductCategory';
import { showSnackbar } from 'redux/snackbar/actions'
import { showLoader, hideLoader } from 'redux/loader/actions'
import _ from 'lodash'
import { imageUrl } from 'constants'
import CustomPermissionDialog from 'sharedComponents/customPermissionDialog'
import productCategoryApi from 'services/productCategory';

import { getAllProductCategory, updateProductCategoryById } from 'redux/slices/productCategory/productCategorySlice';
import { useDispatch, useSelector } from 'react-redux';


const ProductCategory = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const dispatch = useDispatch()
  const [row, setRow] = useState([])
  const [pageSize, setPageSize] = useState(10);
  const [openProductCategoryModal, setOpenProductCategoryModal] =
    useState(false)
  const [mode, setMode] = useState('new');
  const [productCategoryId, setProductCategoryId] = useState(null)
  const [openPermissionModal, setOpenPermissionModal] = useState(false);

  const { productCategories, shopProducts, errorMessage, successMessage } = useSelector((state) => state.productCategory);

  // handle product category modal
  const handleOpenProductCategoryModal = () => {
    setOpenProductCategoryModal(true)
  }
  const handleCloseProductCategoryModal = () => {
    setOpenProductCategoryModal(false)
    setMode('new')
    setProductCategoryId(null)
    dispatch(getAllProductCategory("APPROVED"));
  }

  // handle delete permission modal
  const handleOpenPermissionModal = (row) => {
    setOpenPermissionModal(true)
    setProductCategoryId(row?._id)
  }
  const handleClosePermissionModal = () => {
    setOpenPermissionModal(false)
    setProductCategoryId(null)
  }

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    productCategory: data?.productCategoryName,
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
      field: 'image',
      headerName: 'Image',
      minWidth: 200,
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
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <CustomSwitch
                checked={params?.row?.status === 0 ? false : true}
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
                onClick={() => editProductCategory(params?.row?.row)}
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
  ];

  useEffect(() => {
    dispatch(getAllProductCategory("APPROVED"));
  }, [dispatch]);

  useEffect(() => {
    if (productCategories) {
      setRow(productCategories);
    }
  }, [productCategories])



  // update product category status
  const handleChange = async (item) => {
    // dispatch(showLoader('Loading please wait...'))
    const data = {
      id: item?._id,
      status: item?.status === 1 ? 0 : 1,
      categoryStatus: "APPROVED",
      updateStatus: false
    };
    await dispatch(updateProductCategoryById(data));
  }

  // Update product category
  const editProductCategory = (row) => {
    setMode('edit')
    setProductCategoryId(row?._id)
    handleOpenProductCategoryModal()
  };

  // delete product category
  const handleRemoveProductCategory = () => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader())
      if (res?.data?.status) {
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
        dispatch(getAllProductCategory("APPROVED"));
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
      console.log('delete product category Api', err)
    }
    productCategoryApi
      .removeProductCategory(productCategoryId)
      .then(onSuccess, onFailure)
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Product Category</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">{row?.length}</Typography>
              </div>
            </section>
            <section className={classesTable.addBtn}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleOpenProductCategoryModal}
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
            fileName={'product_category_list'}
          />
        </Grid>
      </Grid>
      <AddProductCategory
        open={openProductCategoryModal}
        handleClose={handleCloseProductCategoryModal}
        mode={mode}
        productCategoryId={productCategoryId}
      />
      <CustomPermissionDialog
        open={openPermissionModal}
        handleClose={handleClosePermissionModal}
        onClickYes={handleRemoveProductCategory}
      />
    </>
  )
}

export default ProductCategory
