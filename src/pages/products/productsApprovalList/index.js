import React, { useState, useCallback, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "../../../redux/store";
import shopApi from 'services/shop';
import { getAllProducts, updateProductByid, getProductByShopId } from "../../../redux/slices/product/productSlice";
import { getAllActiveShops } from "../../../redux/slices/shop/shopSlice";



const tabListData = [
  { title: `Pending`, tabIndex: 0 },
  { title: 'Rejected', tabIndex: 1 },
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

const ProductsApprovalList = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pendingPageSize, setPendingPageSize] = useState(10);
  const [rejectedPageSize, setRejectedPageSize] = useState(10);
  const [shop, setShop] = useState([]);
  const [shopId, setShopId] = useState();
  const [tabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0);
  const [row, setRow] = useState([]);

  const { products, shopProducts, errorMessage, successMessage, } = useSelector((state) => state.products);
  const { shops } = useSelector((state) => state.shops);

  useEffect(() => {
    if (products || products?.length) {
      setRow(products);
    };
    if (shops?.length > 0) {
      setShop(shops);
    };
    if (shopProducts?.length > 0) {
      setRow(shopProducts);
    }
  }, [products, shops]);

  const handleTabs = (event, index) => {
    setTabValue(index)
  };

  const DataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    productName: data?.name,
    productCategory: data?.product_category?.productCategoryName,
    shopName: data?.shop_category?.shop_name,
    productStatus: data?.product_status,
    row: data,
  }))

  const pendingColumns = [
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
            <div>
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
      field: 'shopName',
      headerName: 'Shop Name',
      minWidth: 300,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.shopName}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'productStatus',
      headerName: 'Status',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.verifyText}>
              <Typography
                variant="body2"
                onClick={() => navigate(`/verifyproduct/${params?.row?.row?._id}`)}
              >
                {params?.row?.productStatus?.toLowerCase() === 'pending'
                  ? 'verify'
                  : ''}
              </Typography>
            </div>
          </>
        )
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllProducts(tabValue === 0 ? "PENDING" : "REJECTED"));
    dispatch(getAllActiveShops("APPROVED"));
  }, [dispatch, tabValue]);

  useEffect(() => {
    if (shopId) {
      fetchProductShops(shopId._id, 'PENDING');
    };
  }, [shopId]);

  const fetchProductShops = async (shopId, status) => {
    const data = {
      shopId: shopId,
      status: status,
    };
    dispatch(getProductByShopId(data));
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Product approval list</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">{DataRows?.length}</Typography>
              </div>
            </section>
            <section className={classesTable.zoneContainer}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="shop"
                id="shop"
                options={shop}
                value={shopId}
                getOptionLabel={(option) => option.shop_name}
                onChange={(e, value) => {
                  setShopId(value)
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
              aria-label="product-approval-list"
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
                        rows={DataRows}
                        columns={pendingColumns}
                        pageSize={pendingPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPendingPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'product_approval_pending_list'}
                      />
                    </Grid>
                  ) : data?.tabIndex === 1 ? (
                    <Grid item xs={12} className={classesTable.tableWrapper}>
                      <CustomDataGrid
                        getRowId={(row) => row?.row?._id}
                        rows={DataRows}
                        columns={pendingColumns}
                        pageSize={rejectedPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setRejectedPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'product_approval_rejected_list'}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} className={classesTable.tableWrapper}>
                      <CustomDataGrid
                        getRowId={(row) => row?.row?._id}
                        rows={DataRows}
                        columns={pendingColumns}
                        pageSize={pendingPageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPendingPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        fileName={'product_approval_pending_list'}
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

export default ProductsApprovalList
