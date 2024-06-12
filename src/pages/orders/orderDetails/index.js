import React, { useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography, Autocomplete, TextField } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import moment from 'moment'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate, useParams } from 'react-router-dom'

const orderStatusOptions = [
  {
    label: 'Pending',
    key: ['Order placed', 'Exchange', 'Return', 'Refund'],
    value: 'Order placed',
  },
  {
    label: 'Cancelled',
    key: ['Cancelled by customer'],
    value: 'Cancelled by customer',
  },
  {
    label: 'Request rejected',
    key: ['Cancelled by vendor'],
    value: 'Cancelled by vendor',
  },
  { label: 'Processing', key: ['Processing'], value: 'Processing' },
  { label: 'Ready orders', key: ['Ready'], value: 'Ready' },
  {
    label: 'Picked up orders',
    key: ['Delivered by vednor', 'Picked'],
    value: 'Picked',
  },
  {
    label: 'Delivered',
    key: ['Delivered', 'Exchanged', 'Refund'],
    value: 'Delivered',
  },
]

const OrderDetails = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const navigate = useNavigate()
  const { id } = useParams()
  const [orderStatus, setOrderStatus] = useState(null)

  return (
    <>
      <Grid container className={classes.root}>
        {/* Header */}
        <Grid item xs={12}>
          <section className={classes.headerWrapper}>
            <div className={classes.headerLabel}>
              <Typography variant="h5" onClick={() => navigate(-1)}>
                {' '}
                <ArrowBackIosIcon /> Order Details
              </Typography>
            </div>
            <div className={classes.statusWrapper}>
              <Autocomplete
                disablePortal
                disableClearable
                size="small"
                fullWidth
                name="type"
                id="type"
                options={orderStatusOptions}
                value={orderStatus}
                getOptionLabel={(option) => option.label || ''}
                onChange={(e, value) => {
                  setOrderStatus(value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Status"
                    sx={{
                      '& fieldset': { border: 'none' },
                      background: '#fff',
                      borderRadius: 8,
                    }}
                  />
                )}
              />
            </div>
          </section>
        </Grid>
        {/*Order ID & Invoice wrapper */}
        <Grid item xs={12}>
          <section className={classes.container}>
            <div className={classes.orderIdWrapper}>
              <div className={classes.orderId}>
                <Typography variant="h6">
                  Order ID :{' '}
                  <span style={{ color: '#0E5EFA' }}>ODN20030S1</span>
                </Typography>
              </div>
              <div className={classesTable.redStatus}>
                <Typography variant="body1">Cancelled</Typography>
              </div>
            </div>
            <div className={classes.downloadBtn}>
              <Typography variant="body1">
                <FileDownloadOutlinedIcon /> Download
              </Typography>
            </div>
          </section>
        </Grid>
        {/*Order info details container */}
        <Grid item xs={12}>
          <section className={classes.container}>
            <section className={classes.orderDetailsWrapper}>
              <Grid item xs={12} md={8}>
                <section className={classes.detailsContainer}>
                  <div className={classes.detailsHeaderLabel}>
                    <Typography variant="body1">Order Details</Typography>
                  </div>
                  <section className={classes.detailsContainerWrapper}>
                    <Grid item xs={12} md={6}>
                      <div className={classes.detailsSpacing}>
                        <Typography variant="body2">
                          Cagtegory &nbsp; : &nbsp; Tube lights
                        </Typography>
                      </div>
                      <div className={classes.detailsSpacing}>
                        <Typography variant="body2">
                          Order Date &nbsp; : &nbsp;{' '}
                          {moment().format('DD MMM YYYY')}{' '}
                          <span className={classes.greenTime}>
                            {moment().format('hh:mm a')}
                          </span>
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className={classes.detailsSpacing}>
                        <Typography variant="body2">
                          Payment status &nbsp; : &nbsp;{' '}
                          <span className={classes.greenText}>paid</span>
                        </Typography>
                      </div>
                      <div className={classes.detailsSpacing}>
                        <Typography variant="body2">
                          Cancelled Date &nbsp; : &nbsp;{' '}
                          {moment().format('DD MMM YYYY')}{' '}
                          <span className={classes.redTime}>
                            {moment().format('hh:mm a')}
                          </span>
                        </Typography>
                      </div>
                    </Grid>
                  </section>
                </section>
              </Grid>
              <Grid item xs={12} md={4}>
                <section className={classes.detailsContainer}>
                  <div className={classes.detailsHeaderLabel}>
                    <Typography variant="body1">Customer Info</Typography>
                  </div>
                  <div className={classes.detailsSpacing}>
                    <Typography variant="body2">
                      Name &nbsp; : &nbsp; Bruce Wayne
                    </Typography>
                  </div>
                  <div className={classes.detailsSpacing}>
                    <Typography variant="body2">
                      Mobile Number &nbsp; : &nbsp; +91 9360999678
                    </Typography>
                  </div>
                </section>
              </Grid>
            </section>
            {/*Order details table */}
            <Grid item xs={12}>
              <section className={classes.tableWrapper}>
                <table className={classes.table}>
                  <tr className={classes.header}>
                    <th
                      className={classes.snoColumn}
                      style={{ borderTopLeftRadius: 5 }}
                    >
                      <Typography variant="body2">S.No</Typography>
                    </th>
                    <th className={classes.idColumn}>
                      <Typography variant="body2">Product ID</Typography>
                    </th>
                    <th className={classes.nameColumn}>
                      <Typography variant="body2">Product Name</Typography>
                    </th>
                    <th className={classes.priceColumn}>
                      <Typography variant="body2">Product Price</Typography>
                    </th>
                    <th className={classes.quantityColumn}>
                      <Typography variant="body2">Quantity</Typography>
                    </th>
                    <th
                      className={classes.totalPriceColumn}
                      style={{ borderTopRightRadius: 5 }}
                    >
                      <Typography variant="body2">Total Price</Typography>
                    </th>
                  </tr>
                  <tr style={{ background: '#F9F9F9' }}>
                    <td className={classes.snoColumn}>{1}</td>
                    <td className={classes.idColumn}>
                      <Typography variant="body2">PRT57WQ137</Typography>
                    </td>
                    <td className={classes.nameColumn}>
                      <Typography variant="body2">Razor LED Light</Typography>
                    </td>
                    <td className={classes.priceColumn}>
                      <Typography variant="body2">&#x20b9; 145</Typography>
                    </td>
                    <td className={classes.quantityColumn}>
                      <Typography variant="body2">2</Typography>
                    </td>
                    <td className={classes.totalPriceColumn}>
                      {' '}
                      <Typography variant="body2">&#x20b9; 290</Typography>
                    </td>
                  </tr>
                  <tr style={{ background: '#F9F9F9' }}>
                    <td className={classes.snoColumn}>{2}</td>
                    <td className={classes.idColumn}>
                      <Typography variant="body2">PRT57WQ139</Typography>
                    </td>
                    <td className={classes.nameColumn}>
                      <Typography variant="body2">Bajaj LCD Light</Typography>
                    </td>
                    <td className={classes.priceColumn}>
                      <Typography variant="body2">&#x20b9; 145</Typography>
                    </td>
                    <td className={classes.quantityColumn}>
                      <Typography variant="body2">2</Typography>
                    </td>
                    <td className={classes.totalPriceColumn}>
                      {' '}
                      <Typography variant="body2">&#x20b9; 290</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.snoColumn}></td>
                    <td className={classes.idColumn}></td>
                    <td className={classes.nameColumn}></td>
                    <td className={classes.priceColumn}></td>
                    <td className={classes.quantityColumn}>
                      <Typography variant="body2">Sub total</Typography>
                    </td>
                    <td className={classes.totalPriceColumn}>
                      <Typography variant="body2">&#x20b9; 2600.00</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.snoColumn}></td>
                    <td className={classes.idColumn}></td>
                    <td className={classes.nameColumn}></td>
                    <td className={classes.priceColumn}></td>
                    <td className={classes.quantityColumn}>
                      <Typography variant="body2">
                        Estimated Tax (12.5%)
                      </Typography>
                    </td>
                    <td className={classes.totalPriceColumn}>
                      <Typography variant="body2">&#x20b9; 60.00</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.snoColumn}></td>
                    <td className={classes.idColumn}></td>
                    <td className={classes.nameColumn}></td>
                    <td className={classes.priceColumn}></td>
                    <td className={classes.quantityColumn}>
                      <Typography variant="body2">Packing charge</Typography>
                    </td>
                    <td className={classes.totalPriceColumn}>
                      <Typography variant="body2">&#x20b9; 20.00</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.snoColumn}></td>
                    <td className={classes.idColumn}></td>
                    <td className={classes.nameColumn}></td>
                    <td className={classes.priceColumn}></td>
                    <td className={classes.quantityColumn}>
                      <div className={classes.billLabel}>
                        <Typography variant="body2">Bill Total</Typography>
                      </div>
                    </td>
                    <td className={classes.totalPriceColumn}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        &#x20b9; 2680.00
                      </Typography>
                    </td>
                  </tr>
                </table>
              </section>
            </Grid>
          </section>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderDetails
