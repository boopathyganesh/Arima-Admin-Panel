import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Tab,
  Tabs,
  Box,
} from '@mui/material'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import CustomSwitch from 'sharedComponents/customSwitch'
import { useNavigate } from 'react-router-dom';
import { hideLoader, showLoader } from 'redux/loader/actions';
// import { useDispatch } from 'react-redux';
import { imageUrl } from 'constants';
import productApi from 'services/products';
import shopApi from 'services/shop';
import { showSnackbar } from 'redux/snackbar/actions';

import { useSnackbar } from "notistack";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "../../../redux/store";
import { getAllProducts, updateProductByid, getProductByShopId } from "../../../redux/slices/product/productSlice";
import { getAllActiveShops } from "../../../redux/slices/shop/shopSlice";

const masterSampleData = [
  {
    id: 1,
    productId: 'PR55AR09',
    productName: 'Arima cable',
    productImg: '/assets/images/notification1.png',
    productCategory: 'cables',
    status: false,
  },
  {
    id: 2,
    productId: 'PR55AR19',
    productName: 'Tv cable',
    productImg: '/assets/images/notification1.png',
    productCategory: 'cables',
    status: true,
  },
  {
    id: 3,
    productId: 'PR55AR29',
    productName: 'Arima cable',
    productImg: '/assets/images/notification1.png',
    productCategory: 'cables',
    status: true,
  },
]

const productCategoryOptionsList = [
  { name: 'Cables' },
  { name: 'Wires' },
  { name: 'Electronics' },
]

const tabListData = [
  { title: `Shop`, tabIndex: 0 },
  { title: 'Master', tabIndex: 1 },
]

function TabPanel(props) {
  const { children, value, index, ...other } = props
  const classes = useStyles()

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.box}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const ProductsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const classesTable = useStylesTable()
  const navigate = useNavigate();
  const [shopPageSize, setShopPageSize] = useState(10)
  const [masterListRow, setMasterListRow] = useState(masterSampleData)
  const [masterListPageSize, setMasterListPageSize] = useState(10);
  const [shop, setShop] = useState([])
  const [productCategory, setProductCategory] = useState(null)
  const [tabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0);
  const [row, setRow] = useState([]);

  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { products, shopProducts, errorMessage, successMessage, } = useSelector((state) => state.products);
  const { shops } = useSelector((state) => state.shops);

  const handleTabs = (event, index) => {
    setTabValue(index)
  };

  useEffect(() => {
    dispatch(getAllProducts("APPROVED"));
    dispatch(getAllActiveShops("APPROVED"));
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      toast.success(errorMessage);
    } else if (successMessage) {
      toast.success(successMessage);
    }
  }, [enqueueSnackbar, successMessage, errorMessage]);

  useEffect(() => {
    if (products || products?.length) {
      setRow(products);
    };
    if (shops?.length) {
      setShop(shops);
    };
    if (shopProducts?.length > 0) {
      setRow(shopProducts);
    }
  }, [products, shops]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8014/uploads/products/image/17178405042386dn707h1glx5xvs8e.webp',
          { responseType: 'arraybuffer' }
        );
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        setSource(`data:image/png;base64,${base64}`);
      } catch (err) {
        setError('Failed to load image');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  const shopDataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    productName: data?.name,
    productImg: data?.product_image,
    productCategory: data?.shop_category?.shop_name,
    shopId: data?.shopId,
    shopName: data?.shop_category?.shop_name,
    stock: data?.stock,
    status: data?.status,
    row: data,
  }));

  const handleChange = (item) => {
    const data = {
      id: item?._id,
      status: item?.status === 1 ? 0 : 1,
    };
    dispatch(updateProductByid(data));
  };

  const shopColumns = [
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
      field: 'productName',
      headerName: 'Product Name',
      minWidth: 340,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.imgNameWrapper}>
              <img
                src={`${imageUrl}/${params?.row?.productImg}`}  //found you
                alt="img"
                className={classesTable.imgSize}
              />
              <div
                className={`${classesTable.linkText} ${classesTable.cursor}`}
              >
                <Typography
                  variant="body2"
                  onClick={() => navigate(`/product/${params?.row?.row?._id}`)}
                >
                  {params?.row?.productName}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'productCategory',
      headerName: 'Product Category',
      minWidth: 300,
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
      headerName: 'Shop Name',
      minWidth: 300,
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
      field: 'stock',
      headerName: 'stock',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.imgNameWrapper}>
              <Typography variant="body2">{params?.row?.stock}</Typography>
              <div
                className={
                  params?.row?.stock >= 1
                    ? classesTable.greenStatus
                    : classesTable.redStatus
                }
              >
                <Typography variant="body2">
                  {params?.row?.stock >= 1 ? 'in stock' : 'out of stock'}
                </Typography>
              </div>
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
              <CustomSwitch checked={params?.row?.status}
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
              <section className={classesTable.editIcon}>
                <img
                  src="/assets/images/edit.svg"
                  alt="edit"
                  className={classes.editImg}
                />
              </section>
              {/* <section className={classesTable.deleteIcon}>
                <img
                  src="/assets/images/delete.svg"
                  alt="delete"
                  className={classes.deleteImg}
                />
              </section> */}
            </div>
          </>
        )
      },
    },
  ];

  const masterListDataRows = _.map(masterListRow || [], (data, index) => ({
    sno: index + 1,
    productName: data?.productName,
    productImg: data?.productImg,
    productCategory: data?.productCategory,
    status: data?.status,
    row: data,
  }))

  const masterListColumns = [
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
      field: 'productName',
      headerName: 'Product Name',
      minWidth: 340,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.imgNameWrapper}>
              <img
                src={params?.row?.productImg}
                alt="img"
                className={classesTable.imgSize}
              />
              <Typography variant="body2">
                {params?.row?.productName}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'productCategory',
      headerName: 'Product Category',
      minWidth: 300,
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
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <CustomSwitch checked={params?.row?.status} />
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
              <section className={classesTable.editIcon}>
                <img
                  src="/assets/images/edit.svg"
                  alt="edit"
                  className={classes.editImg}
                  onClick={() => navigate('/product/123')}
                />
              </section>
              {/* <section className={classesTable.deleteIcon}>
                <img
                  src="/assets/images/delete.svg"
                  alt="delete"
                  className={classes.deleteImg}
                />
              </section> */}
            </div>
          </>
        )
      },
    },
  ]

  const fetchProductShops = async (shopId, status) => {
    const data = {
      shopId: shopId,
      status: status,
    };
    dispatch(getProductByShopId(data));
  };

  useEffect(() => {
    if (productCategory) {
      fetchProductShops(productCategory._id, "APPROVED");
    }
  }, [productCategory]);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Products list</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">{shopDataRows?.length}</Typography>
              </div>
            </section>
            <section className={classesTable.zoneContainer}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="shop_name"
                id="productCategory"
                options={shop}
                value={productCategory}
                getOptionLabel={(option) => option.shop_name}
                onChange={(e, value) => {
                  setProductCategory(value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Shop name"
                    sx={{
                      '& fieldset': { border: 'none' },
                      background: '#fff',
                      borderRadius: 8,
                    }}
                  />
                )}
              />
            </section>
          </section>
        </Grid>
        <Grid item xs={12}>
          <section className={classesTable.tabWrapper}>
            <Tabs
              value={tabValue}
              onChange={handleTabs}
              aria-label="products-list"
              variant="scrollable"
              scrollButtons="auto"
              className={classesTable.tabLabels}
            >
              {tabList?.map(({ title, tabIndex, disabled }) => (
                <Tab
                  label={<Typography variant="body2">{title}</Typography>}
                  {...a11yProps({ tabIndex })}
                  key={title}
                />
              ))}
            </Tabs>
            <Grid item xs={12}>
              {tabList?.map((data) => (
                <TabPanel value={tabValue} index={data?.tabIndex}>
                  {data?.tabIndex === 0 ? (
                    <Grid item xs={12} className={classesTable.tableWrapper}>
                      <CustomDataGrid
                        getRowId={(row) => row?.row?._id}
                        rows={shopDataRows}
                        columns={shopColumns}
                        pageSize={shopPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setShopPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'shop_products_list'}
                      />
                    </Grid>
                  ) : data?.tabIndex === 1 ? (
                    <Grid item xs={12} className={classesTable.tableWrapper}>
                      <CustomDataGrid
                        getRowId={(row) => row?.row?._id}
                        rows={masterListDataRows}
                        columns={masterListColumns}
                        pageSize={masterListPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setMasterListPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'master_list_products_list'}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} className={classesTable.tableWrapper}>
                      <CustomDataGrid
                        getRowId={(row) => row?.row?._id}
                        rows={shopDataRows}
                        columns={shopColumns}
                        pageSize={shopPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setShopPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'shop_products_list'}
                      />
                    </Grid>
                  )}
                </TabPanel>
              ))}
            </Grid>
          </section>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductsList
