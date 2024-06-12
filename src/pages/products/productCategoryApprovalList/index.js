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
import { imageUrl } from 'constants'
import AddProductCategory from '../productCategory/addProductCategory';

import { getAllProductCategory } from "../../../redux/slices/productCategory/productCategorySlice";


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

const ProductCategoryApprovalList = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pendingPageSize, setPendingPageSize] = useState(10);
  const [rejectedPageSize, setRejectedPageSize] = useState(10);
  const [tabList, setTabList] = useState(tabListData)
  const [tabValue, setTabValue] = useState(0);
  const [row, setRow] = useState([]);
  const [mode, setMode] = useState('verify');
  const [productCategoryId, setProductCategoryId] = useState(null)
  const [openProductCategoryModal, setOpenProductCategoryModal] =
    useState(false);

  const { productCategories, shopProducts, errorMessage, successMessage, } = useSelector((state) => state.productCategory);

  const handleTabs = (event, index) => {
    setTabValue(index)
  };

  useEffect(() => {
    if (productCategories || productCategories?.length) {
      setRow(productCategories);
    };

  }, [productCategories]);

  const handleOpenProductCategoryModal = (id) => {
    setOpenProductCategoryModal(true);
    setProductCategoryId(id);
  };

  const handleCloseProductCategoryModal = () => {
    setOpenProductCategoryModal(false)
    setMode('verify');
    dispatch(getAllProductCategory(tabValue === 0 ? "PENDING" : "REJECTED"));
  };

  const DataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    productName: data?.name,
    productCategory: data?.productCategoryName,
    image: data?.image,
    productCategoryStatus: data?.categoryStatus,
    row: data,
  }));

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
      field: 'image',
      headerName: 'Image',
      minWidth: 300,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <img
                src={`${imageUrl}/${params?.row?.image}`}
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
      field: 'productCategoryStatus',
      headerName: 'Status',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.verifyText}>
              <Typography
                variant="body2"
                onClick={() => handleOpenProductCategoryModal(params?.row?.row?._id)}
              >
                {params?.row?.productCategoryStatus?.toLowerCase() === 'pending'
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
    dispatch(getAllProductCategory(tabValue === 0 ? "PENDING" : "REJECTED"));
  }, [ tabValue])

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Product category approval list</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">{DataRows?.length}</Typography>
              </div>
            </section>
            {/* <section className={classesTable.zoneContainer}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="shop"
                id="shop"
                options={shopOptions}
                value={shop}
                getOptionLabel={(option) => option.shop_name}
                onChange={(e, value) => {
                  setShop(value)
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
            </section> */}
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
      <AddProductCategory
        open={openProductCategoryModal}
        handleClose={handleCloseProductCategoryModal}
        mode={mode}
        isEdit={true}
        productCategoryId={productCategoryId}
      />
    </>
  )
}

export default ProductCategoryApprovalList;
