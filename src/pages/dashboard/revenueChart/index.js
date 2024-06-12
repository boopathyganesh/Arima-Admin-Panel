import React from 'react'
import useStyles from '../style'
import { Typography, Select, FormControl, MenuItem } from '@mui/material'
import LineChart from './lineChart'

const RevenueChart = (props) => {
  const { revenueFilter, handleRevenueFilter } = props
  const classes = useStyles()

  return (
    <>
      <section className={classes.cardContainer}>
        <div className={classes.cardHeader}>
          <div className={classes.cardHeaderLabel}>
            <Typography variant="h6">Revenue</Typography>
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
                value={revenueFilter}
                // label="Age"
                onChange={handleRevenueFilter}
              >
                <MenuItem value={10}>Weekly</MenuItem>
                <MenuItem value={20}>Monthly</MenuItem>
                <MenuItem value={30}>Yearly</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <LineChart />
      </section>
    </>
  )
}

export default RevenueChart
