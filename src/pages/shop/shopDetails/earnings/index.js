import React, { useState } from 'react'
import useStyles from './style'
import { Typography, FormControl, Select, MenuItem } from '@mui/material'

const Earnings = () => {
  const classes = useStyles()
  const [filter, setFilter] = useState(30)

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return (
    <>
      <section className={classes.root}>
        <div className={classes.cardHeader}>
          <div className={classes.cardHeaderLabel}>
            <Typography variant="body1">Shop Earnings</Typography>
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
                value={filter}
                onChange={handleFilter}
              >
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={20}>Last Week</MenuItem>
                <MenuItem value={30}>Overall</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <section className={classes.earningsWrapper}>
          <div className={classes.earningsContainer}>
            <section className={classes.earningCaptions}>
              <Typography variant="body2">Total Earnings</Typography>
            </section>
            <section className={classes.earningNumber}>
              <Typography
                variant="body2"
                sx={{ background: '#EFF5FF', color: '#0E5EFA' }}
              >
                12313
              </Typography>
            </section>
          </div>
          <div className={classes.earningsContainer}>
            <section className={classes.earningCaptions}>
              <Typography variant="body2">Total Orders</Typography>
            </section>
            <section className={classes.earningNumber}>
              <Typography
                variant="body2"
                sx={{ background: '#FFFAEC', color: '#FFB800' }}
              >
                10757
              </Typography>
            </section>
          </div>
          <div className={classes.earningsContainer}>
            <section className={classes.earningCaptions}>
              <Typography variant="body2">Delivered</Typography>
            </section>
            <section className={classes.earningNumber}>
              <Typography
                variant="body2"
                sx={{ background: '#EDFFED', color: '#129A43' }}
              >
                11757
              </Typography>
            </section>
          </div>
          <div className={classes.earningsContainer}>
            <section className={classes.earningCaptions}>
              <Typography variant="body2">Cancelled</Typography>
            </section>
            <section className={classes.earningNumber}>
              <Typography
                variant="body2"
                sx={{ background: '#FFDADA', color: '#D62020' }}
              >
                11757
              </Typography>
            </section>
          </div>
          <div className={classes.earningsContainer}>
            <section className={classes.earningCaptions}>
              <Typography variant="body2">Rejected</Typography>
            </section>
            <section className={classes.earningNumber}>
              <Typography
                variant="body2"
                sx={{ background: '#FFF3E9', color: '#FF7A00' }}
              >
                17757
              </Typography>
            </section>
          </div>
        </section>
      </section>
    </>
  )
}

export default Earnings
