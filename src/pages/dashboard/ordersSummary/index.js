import React from 'react'
import useStyles from '../style'
import { Typography, Select, FormControl, MenuItem } from '@mui/material'

const OrdersSummary = (props) => {
  const { orderSummaryFilter, handleOrderSummaryFilter, ordersSummaryList } =
    props
  const classes = useStyles()

  return (
    <>
      <section className={classes.cardContainer}>
        <div className={classes.cardHeader}>
          <div className={classes.cardHeaderLabel}>
            <Typography variant="h6">Order Summary</Typography>
          </div>
          <div>
            <FormControl
              sx={{ m: 1, width: 120 }}
              size="small"
              classes={{ root: classes.customOutline }}
            >
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={orderSummaryFilter}
                // label="Age"
                onChange={handleOrderSummaryFilter}
              >
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={20}>Last Week</MenuItem>
                <MenuItem value={30}>Last Month</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <section className={classes.cardLabelContainer}>
          {ordersSummaryList?.map((data) => (
            <div className={classes.cardLabelWrapper}>
              <Typography variant="body1">{data?.label}</Typography>
              <div className={classes.summaryCount}>
                <Typography
                  variant="body1"
                  sx={{
                    background: data?.background,
                    color: data?.color,
                  }}
                >
                  {data?.count}
                </Typography>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  )
}

export default OrdersSummary
