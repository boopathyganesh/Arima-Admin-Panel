import React, { useState, useEffect, useCallback } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography, Button } from '@mui/material'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import AddIcon from '@mui/icons-material/Add'
import CustomSwitch from 'sharedComponents/customSwitch'
import moment from 'moment'
import AddCouponModal from './AddCouponModal'
import couponApi from '../../services/coupon'
import { useDispatch, useSelector } from "../../redux/store";
import { showLoader, hideLoader } from 'redux/loader/actions'
import { showSnackbar } from 'redux/snackbar/actions'
import CustomPermissionDialog from 'sharedComponents/customPermissionDialog'

import { getAllProductCategory } from "../../redux/slices/productCategory/productCategorySlice";
import { getAllCoupons, getCouponById, deleteCouponById, updateCouponById } from "../../redux/slices/coupon/couponSlice";


const Coupons = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const classesTable = useStylesTable()
  const [row, setRow] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [openCouponModal, setOpenCouponModal] = useState(false)
  const [mode, setMode] = useState('new')
  const [couponId, setCouponId] = useState(null)
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [prodcutCategories, setProdcutCategories] = useState([]);
  const [couponData, setCoupons] = useState([]);
  const [editCouponData, setEditCouponData] = useState([]);

  const { productCategories, errorMessage, successMessage, } = useSelector((state) => state.productCategory);
  const { coupons, currentCoupon } = useSelector((state) => state.coupon);


  // handle coupon modal
  const handleOpenCouponModal = () => {
    setOpenCouponModal(true)
  }
  const handleCloseCouponModal = () => {
    setOpenCouponModal(false)
    setMode('new')
    setCouponId(null);
    dispatch(getAllCoupons());
  };

  useEffect(() => {
    if (couponId) {
      dispatch(getCouponById(couponId));
    }
  }, [dispatch, couponId]);

  useEffect(() => {
    setEditCouponData(currentCoupon);
    console.log('currentCoupon', currentCoupon);
  }, [currentCoupon]);

  useEffect(() => {
    if (productCategories || productCategories?.length) {
      setProdcutCategories(productCategories);
    };
    if (coupons || coupons?.length) {
      setCoupons(coupons);
    }
  }, [productCategories, coupons]);



  // handle delete main permission modal
  const handleOpenPermissionModal = (row) => {
    setOpenPermissionModal(true)
    setCouponId(row?._id)
  }
  const handleClosePermissionModal = () => {
    setOpenPermissionModal(false)
    setCouponId(null)
    dispatch(getAllCoupons());
  }

  useEffect(() => {
    dispatch(getAllProductCategory("APPROVED"));
    dispatch(getAllCoupons());
  }, [dispatch]);


  const dataRows = _.map(couponData || [], (data, index) => ({
    sno: index + 1,
    title: data?.title,
    productCategory: data?.product_category?.productCategoryName,
    shopId: data?.shopId,
    shopName: data?.shop_category?.shop_name,
    couponType: data?.type,
    code: data?.code,
    startDate: moment(),
    endDate: moment(),
    limit: data?.limit,
    discount_type: data?.discount_type,
    discount: data?.discount,
    maxDiscount: data?.maxDiscount,
    minPurchase: data?.minPurchase,
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
      field: 'title',
      headerName: 'Title',
      minWidth: 250,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.title}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'ProductCategory',
      headerName: 'Product Category',
      minWidth: 250,
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
      field: 'shopName',
      headerName: 'Shop',
      minWidth: 250,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.shopName}</Typography>
              <div
                className={`${classesTable.padding} ${classesTable.linkText} ${classesTable.cursor}`}
              >
                <Typography variant="body2">{params?.row?.shopId}</Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'couponType',
      headerName: 'Coupon Type',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.couponType}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'code',
      headerName: 'Code',
      minWidth: 220,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.code}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      minWidth: 170,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {moment(params?.row?.startDate).format('d MMM YYYY')}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      minWidth: 170,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {moment(params?.row?.endDate).format('d MMM YYYY')}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'limit',
      headerName: 'Coupon Limit',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.limit} users
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'discount_type',
      headerName: 'discount Type',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.discount_type}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'discount',
      headerName: 'Discount',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.discount}
                {params?.row?.discount_type?.toLowerCase() === 'percentage'
                  ? '%'
                  : ''}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'maxDiscount',
      headerName: 'Max Discount',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                &#x20b9; {params?.row?.maxDiscount}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'minPurchase',
      headerName: 'Min Purchase',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                &#x20b9; {params?.row?.minPurchase}
              </Typography>
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
              <CustomSwitch checked={params?.row?.status} onChange={() => handleCouponChange(params?.row?.row)} />
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
              <section className={classesTable.editIcon} onClick={() => editCoupon(params?.row?.row)}>
                <img
                  src="/assets/images/edit.svg"
                  alt="edit"
                  className={classes.editImg}
                />
              </section>
              <section className={classesTable.deleteIcon} onClick={() => handleOpenPermissionModal(params?.row?.row)}>
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


  /* update coupon status */
  const handleCouponChange = (item) => {
    // dispatch(showLoader('Loading please wait...'))
    const data = {
      id: item?._id,
      status: item?.status === 1 ? 0 : 1,
    };

    dispatch(updateCouponById(data));
  };


  /* Update coupon */
  const editCoupon = (row) => {
    setMode('edit')
    setCouponId(row?._id)
    handleOpenCouponModal()
  }


  /* delete coupon */
  const handleRemoveCoupon = async () => {
    await dispatch(deleteCouponById(couponId));
    handleClosePermissionModal();
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Coupon list</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">{couponData.length}</Typography>
              </div>
            </section>
            <section className={classesTable.addBtn}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleOpenCouponModal}
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
            fileName={'coupon_list'}
          />
        </Grid>
      </Grid>
      <AddCouponModal
        open={openCouponModal}
        handleClose={handleCloseCouponModal}
        mode={mode}
        couponId={couponId}
        categoryData={prodcutCategories}
        editCouponData={editCouponData}
      />

      <CustomPermissionDialog
        open={openPermissionModal}
        handleClose={handleClosePermissionModal}
        onClickYes={handleRemoveCoupon}
      />

    </>
  )
}

export default Coupons
