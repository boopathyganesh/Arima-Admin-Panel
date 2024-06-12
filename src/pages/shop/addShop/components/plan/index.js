import React, { useState } from 'react'
import useStyles from '../style'
import planUseStyles from 'pages/settings/vendorsCharge/style'
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Divider,
  useTheme
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import CheckIcon from '@mui/icons-material/Check'
import EastIcon from '@mui/icons-material/East'
import useStylesTable from 'pages/tableStyle/style'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { showLoader, hideLoader } from 'redux/loader/actions'

import { updateShopApproval, updateShopByid } from 'redux/slices/shop/shopSlice'

const planData = [
  {
    planName: 'Free Plan',
    price: 0,
    validityType: 'month',
    validity: 3,
    discount: 30,
    discountedPrice: 0,
    planCaption: 'Free plan to explore our application',
    features: [
      'Create personal dashboard',
      'Perfect package for online store',
      'Create personal dashboard',
      'Perfect package for online store',
    ],
    active: false,
  },
  {
    planName: 'Pro Plan',
    price: 2000,
    validityType: 'year',
    validity: 1,
    discount: 20,
    discountedPrice: 1800,
    planCaption: 'Take advantage and explore our application',
    features: [
      'Create personal dashboard',
      'Perfect package for online store',
      'Create personal dashboard',
      'Perfect package for online store',
    ],
    active: false,
  },
  {
    planName: 'Premium Plan',
    price: 2737,
    validityType: 'month',
    validity: 6,
    discount: 0,
    discountedPrice: 2737,
    planCaption: 'Full advantages of our features and explore our application',
    features: [
      'Create personal dashboard',
      'Perfect package for online store',
      'Create personal dashboard',
      'Perfect package for online store',
    ],
    active: false,
  },
];

const selectedPlanData =
{
  planName: 'Free Plan',
  price: 0,
  validityType: 'month',
  validity: 3,
  discount: 30,
  discountedPrice: 0,
  planCaption: 'Free plan to explore our application',
  features: [
    'Create personal dashboard',
    'Perfect package for online store',
    'Create personal dashboard',
    'Perfect package for online store',
  ],
  active: false,
}


const paymentStatusOptions = [
  { label: 'Paid', value: 'paid' },
  { label: 'UnPaid', value: 'unpaid' },
]

const paymentMethodOptions = [
  { label: 'UPI', value: 'upi' },
  { label: 'Cash on hand', value: 'cashonhand' },
  { label: 'Bank transfer', value: 'banktransfer' },
]

const sampleData = [
  {
    id: 1,
    date: moment(),
    planName: 'Free plan',
    amount: 0,
    expiryDaysRemaining: 0,
  },
  {
    id: 2,
    date: moment(),
    planName: 'Premium plan',
    amount: 2000,
    expiryDaysRemaining: 45,
  },
]

const Plan = ({ data, isVerify }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const classesPlan = planUseStyles()
  const classesTable = useStylesTable()
  const [planList, setPlanList] = useState(planData);
  const [selectedPlan, setSelectedPlan] = useState(selectedPlanData)
  const [row, setRow] = useState(sampleData)
  const [pageSize, setPageSize] = useState(10);
  const theme = useTheme();


  const handlePlan = async (formValues) => {
    dispatch(showLoader('Loading please wait...'))
    const data = {
      amount: formValues?.amount,
      transactionId: formValues?.transactionId,
      paymentMode: formValues?.paymentMode,
      paymentStatus: formValues?.paymentStatus,
      selected_plan_name: formValues?.amount === 0 ? "Free Plan" : formValues?.amount === 2000 ? "Pro Plan" : "Premium Plan",
      plan_info: true,
    };
    const updatedData = {
      id: id,
      data: data
    }
    await dispatch(updateShopByid(updatedData));
    await dispatch(hideLoader());
    await navigate('/shopslist');
  }

  const formik = useFormik({
    initialValues: {
      amount: '',
      transactionId: '',
      paymentMode: null,
      paymentStatus: null
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      amount: yup
        .number()
        .required('Amount is required')
        .typeError('Only numbers are allowed')
        .nullable(),
      transactionId: yup
        .string()
        // .required('Transaction ID is required')
        .trim()
        .matches(/^[a-z0-9]+$/i, 'Special characters are not allowed')
        .nullable(),
      paymentMode: yup
        .object()
        // .required('Please select payment mode')
        .nullable(),
      paymentStatus: yup
        .object()
        // .required('Please select payment status')
        .nullable(),
    }),
    onSubmit: handlePlan,
  });


  // Handle active plan
  const handleSelectPlan = (idx, activeStatus, price) => {
    const updatedPlan = planData?.map((data, index) =>
      index === idx
        ? { ...data, active: !activeStatus }
        : { ...data, active: false }
    )
    setPlanList(updatedPlan)
    formik?.setFieldValue('amount', price)
  }

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    date: data?.date,
    planName: data?.planName,
    amount: data?.amount,
    expiryDaysRemaining: data?.expiryDaysRemaining,
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
      field: 'date',
      headerName: 'Purchased on',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {moment(params?.row?.date).format('DD MMM YYYY')}
              </Typography>
              <Typography variant="body2" className={classes.padding}>
                {moment(params?.row?.date).format('hh:mm a')}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'planName',
      headerName: 'Plan Name',
      minWidth: 280,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.planName}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'amount',
      headerName: 'Plan Price',
      minWidth: 220,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                &#x20b9; {params?.row?.amount}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'expiryDaysRemaining',
      headerName: 'Validity',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.expiryDaysRemaining === 0 ? (
              <div className={classesTable.redText}>
                <Typography variant="body2">Expired</Typography>
              </div>
            ) : (
              <div>
                <Typography variant="body2">
                  Expires in {params?.row?.expiryDaysRemaining}
                </Typography>
              </div>
            )}
          </>
        )
      },
    },
  ];

  const shopApproveReject = async (status) => {
    const data = {
      id: id,
      status: status
    };
    await dispatch(updateShopApproval(data));
    await navigate('/shopslist');
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          {/* <Grid item xs={12} sm={5.9} className={classes.input}>
            <Autocomplete
              disablePortal
              disableClearable
              size="small"
              fullWidth
              name="ownerName"
              id="ownerName"
              options={ownerOptions}
              value={formik?.values?.ownerName}
              getOptionLabel={(option) => option.name || ''}
              onChange={(e, value) => {
                formik?.setFieldValue('ownerName', value)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Owner name"
                  error={formik.touched.ownerName && formik.errors.ownerName}
                  helperText={
                    formik.touched.ownerName &&
                    formik.errors.ownerName &&
                    formik.errors.ownerName
                  }
                />
              )}
            />
          </Grid> */}
          <section className={classes.container}>
            <div className={classes.label}>
              {isVerify ? <Typography variant="h6">Selected Plan</Typography>
                : <Typography variant="h6">Plan List</Typography>
              }
            </div>
            <section
              style={{ marginBlockEnd: 20 }}
              className={classesPlan.planWrapper}
            >
              {isVerify ?
                <Grid item xs={12} sm={6} md={4}>
                  <section className={classesPlan.planContainer}>
                    <div className={classesPlan.title}>
                      <Typography variant="h5">{selectedPlan?.planName}</Typography>
                    </div>
                    <div className={classesPlan.price}>
                      <Typography variant="h5">
                        &#x20b9;{' '}
                        {selectedPlan?.discount !== 0
                          ? selectedPlan?.discountedPrice
                          : selectedPlan?.price}{' '}
                        <span className={classesPlan.themeColor}>/</span>
                        <span
                          className={`${classesPlan.validityLabel} ${classesPlan.themeColor}`}
                        >
                          &nbsp;{selectedPlan?.validity} &nbsp;
                          {selectedPlan?.validityType}
                        </span>
                      </Typography>
                    </div>
                    {selectedPlan?.price === 0 || selectedPlan?.discount === 0 ? (
                      ''
                    ) : (
                      <div className={`${classesPlan.discountWrapper}`}>
                        <Typography variant="body2">
                          {selectedPlan?.discount}% off
                        </Typography>
                      </div>
                    )}
                    <div
                      className={`${classesPlan.planCaption} ${classesPlan.themeColor} `}
                    >
                      <Typography variant="body2">
                        {selectedPlan?.planCaption}
                      </Typography>
                    </div>
                    <div className={classesPlan.divider}>
                      <Divider />
                    </div>
                    <div className={classesPlan.featuresWrapper}>
                      <div className={classesPlan.featureContainer}>
                        <Typography variant="body2">
                          <CheckIcon /> Create personal dashboard
                        </Typography>
                      </div>
                      <div className={classesPlan.featureContainer}>
                        <Typography variant="body2">
                          <CheckIcon /> Perfect package for online store
                        </Typography>
                      </div>
                      <div className={classesPlan.featureContainer}>
                        <Typography variant="body2">
                          <CheckIcon /> Create personal dashboard
                        </Typography>
                      </div>
                      <div className={classesPlan.featureContainer}>
                        <Typography variant="body2">
                          <CheckIcon /> Perfect package for online store
                        </Typography>
                      </div>
                    </div>
                    <div
                      className={
                        selectedPlan?.active === true
                          ? classes.purchasedBtn
                          : classes.purchaseBtn
                      }
                    >
                      {!isVerify &&
                        <Button
                          variant="contained"
                          disableElevation
                          onClick={() =>
                            handleSelectPlan(selectedPlan?.active, selectedPlan?.price)
                          }
                        >
                          {selectedPlan?.active === true ? 'Purchased' : 'Purchase'}{' '}
                          <EastIcon />
                        </Button>
                      }
                    </div>
                  </section>
                </Grid> : <>
                  {planList?.map((data, idx) => (
                    <Grid item xs={12} sm={6} md={4}>
                      <section className={classesPlan.planContainer}>
                        <div className={classesPlan.title}>
                          <Typography variant="h5">{data?.planName}</Typography>
                        </div>
                        <div className={classesPlan.price}>
                          <Typography variant="h5">
                            &#x20b9;{' '}
                            {data?.discount !== 0
                              ? data?.discountedPrice
                              : data?.price}{' '}
                            <span className={classesPlan.themeColor}>/</span>
                            <span
                              className={`${classesPlan.validityLabel} ${classesPlan.themeColor}`}
                            >
                              &nbsp;{data?.validity} &nbsp;
                              {data?.validityType}
                            </span>
                          </Typography>
                        </div>
                        {data?.price === 0 || data?.discount === 0 ? (
                          ''
                        ) : (
                          <div className={`${classesPlan.discountWrapper}`}>
                            <Typography variant="body2">
                              {data?.discount}% off
                            </Typography>
                          </div>
                        )}
                        <div
                          className={`${classesPlan.planCaption} ${classesPlan.themeColor} `}
                        >
                          <Typography variant="body2">
                            {data?.planCaption}
                          </Typography>
                        </div>
                        <div className={classesPlan.divider}>
                          <Divider />
                        </div>
                        <div className={classesPlan.featuresWrapper}>
                          <div className={classesPlan.featureContainer}>
                            <Typography variant="body2">
                              <CheckIcon /> Create personal dashboard
                            </Typography>
                          </div>
                          <div className={classesPlan.featureContainer}>
                            <Typography variant="body2">
                              <CheckIcon /> Perfect package for online store
                            </Typography>
                          </div>
                          <div className={classesPlan.featureContainer}>
                            <Typography variant="body2">
                              <CheckIcon /> Create personal dashboard
                            </Typography>
                          </div>
                          <div className={classesPlan.featureContainer}>
                            <Typography variant="body2">
                              <CheckIcon /> Perfect package for online store
                            </Typography>
                          </div>
                        </div>
                        <div
                          className={
                            data?.active === true
                              ? classes.purchasedBtn
                              : classes.purchaseBtn
                          }
                        >
                          {!isVerify &&
                            <Button
                              variant="contained"
                              disableElevation
                              onClick={() =>
                                handleSelectPlan(idx, data?.active, data?.price)
                              }
                            >
                              {data?.active === true ? 'Purchased' : 'Purchase'}{' '}
                              <EastIcon />
                            </Button>
                          }
                        </div>
                      </section>
                    </Grid>
                  ))}
                </>}

            </section>
          </section>

          {!isVerify &&
            <>
              {formik?.values?.amount !== 0 &&
                <>
                  < section className={classes.fieldWrapper}>
                    <Grid item xs={12} sm={6} className={classes.input}>
                      <TextField
                        name="amount"
                        id="amount"
                        value={formik?.values?.amount}
                        onChange={formik?.handleChange}
                        type={'text'}
                        fullWidth
                        variant="outlined"
                        label="Amount*"
                        size="small"
                        disabled
                        error={formik?.errors?.amount && formik?.touched?.amount}
                        helperText={
                          formik?.errors?.amount &&
                          formik?.touched?.amount &&
                          formik?.errors?.amount
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.input}>
                      <TextField
                        name="transactionId"
                        id="transactionId"
                        value={formik?.values?.transactionId}
                        onChange={formik?.handleChange}
                        type={'text'}
                        fullWidth
                        variant="outlined"
                        label="Transaction ID*"
                        size="small"
                        error={
                          formik?.errors?.transactionId &&
                          formik?.touched?.transactionId
                        }
                        helperText={
                          formik?.errors?.transactionId &&
                          formik?.touched?.transactionId &&
                          formik?.errors?.transactionId
                        }
                      />
                    </Grid>
                  </section>
                  <section className={classes.fieldWrapper}>
                    <Grid item xs={12} sm={6} className={classes.input}>
                      <Autocomplete
                        disablePortal
                        disableClearable
                        size="small"
                        fullWidth
                        name="paymentMode"
                        id="paymentMode"
                        options={paymentStatusOptions}
                        value={formik?.values?.paymentMode}
                        getOptionLabel={(option) => option.label || ''}
                        onChange={(e, value) => {
                          formik?.setFieldValue('paymentMode', value)
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Payment mode* "
                            error={
                              formik.touched.paymentMode && formik.errors.paymentMode
                            }
                            helperText={
                              formik.touched.paymentMode &&
                              formik.errors.paymentMode &&
                              formik.errors.paymentMode
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
                        name="paymentStatus"
                        id="paymentStatus"
                        options={paymentMethodOptions}
                        value={formik?.values?.paymentStatus}
                        getOptionLabel={(option) => option.label || ''}
                        onChange={(e, value) => {
                          formik?.setFieldValue('paymentStatus', value)
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Payment status*"
                            error={
                              formik.touched.paymentStatus &&
                              formik.errors.paymentStatus
                            }
                            helperText={
                              formik.touched.paymentStatus &&
                              formik.errors.paymentStatus &&
                              formik.errors.paymentStatus
                            }
                          />
                        )}
                      />
                    </Grid>
                  </section>
                </>
              }
              <Grid item xs={12} className={classesTable.tableWrapper}>
                <CustomDataGrid
                  getRowId={(row) => row?.row?.id}
                  rows={dataRows}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  fileName={'coupon_list'}
                />
              </Grid>
            </>
          }
          <Grid item xs={12} className={classes.btn}>
            {isVerify ?
              <>
                <Button
                  sx={{ mr: 1 }}
                  variant="contained"
                  style={{ width: "15%" }}
                  onClick={() => shopApproveReject("APPROVED")}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#dd0000", color: "#fff", width: "15%" }}
                  disableElevation
                  onClick={() => shopApproveReject("REJECTED")}
                  sx={{ backgroundColor: theme.palette.common.error }}
                >
                  Reject
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
        </Grid>
      </Grid >
    </>
  )
}

export default Plan
