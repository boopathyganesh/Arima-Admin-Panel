import React, { useState, useEffect, useRef } from 'react'
import useStyles from './style'
import useStylesRoot from '../style'
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  useMediaQuery,
} from '@mui/material'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { numberToIndianSystem } from 'utils/numberToIndianRupee'
import { useTheme } from '@mui/material/styles'

ChartJS.register(ArcElement, Tooltip, Legend)

const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="body2"
          component="div"
          sx={{ color: '#243465', fontWeight: 600 }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export const data = {
  labels: ['Sales', 'Income'],
  datasets: [
    {
      label: '%',
      data: [49, 51],
      backgroundColor: ['#0E5EFA', '#129A43'],
      borderColor: ['#0E5EFA', '#129A43'],
      borderWidth: 1,
    },
  ],
}

const options = {
  cutout: '65%', // Adjust the cutout percentage for inner circle
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.parsed
          const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0)
          const percentage = ((value / total) * 100).toFixed(2)
          return `${percentage}%`
        },
      },
    },
  },
}

const PieChart = (props) => {
  const { incomeFilter, setIncomeFilter, handleIncomeFilter } = props
  const classes = useStyles()
  const classesRoot = useStylesRoot()
  const theme = useTheme()
  const smallDevices = useMediaQuery(theme.breakpoints.down('lg'))
  const [salesProgress, setSalesProgress] = useState(91)
  const [incomeProgress, setIncomeProgress] = useState(67)

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx
        const xCoor = chart.getDatasetMeta(0).data[0].x
        const yCoor = chart.getDatasetMeta(0).data[0].y
        //   ctx.restore()
        var fontSize = (height / 300).toFixed(2)
        ctx.font = fontSize + 'em Poppins, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#4D4E4E'
        var text = `Total Income`,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2
        ctx.fillText(text, xCoor, yCoor - 11)
        var text1 = `${numberToIndianSystem(57139)}`,
          textX1 = Math.round((width - ctx.measureText(text1).width) / 2),
          textY1 = height / 2
        ctx.font = 'bolder' + fontSize + 'em Poppins, sans-serif'
        ctx.fillStyle = '#243465'
        ctx.fillText(text1, xCoor, yCoor + 21)
        ctx.save()
      },
    },
  ]

  return (
    <>
      <section className={classesRoot.cardContainer}>
        <div className={classesRoot.cardHeader}>
          <div className={classesRoot.cardHeaderLabel}>
            <Typography variant="h6">Total Income</Typography>
          </div>
          <div>
            <FormControl
              sx={{ m: 1, width: 120 }}
              size="small"
              classes={{ root: classesRoot.customOutline }}
            >
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={incomeFilter}
                // label="Age"
                onChange={handleIncomeFilter}
              >
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={20}>Last Week</MenuItem>
                <MenuItem value={30}>Last Month</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <section className={classes.progressContainer}>
          <div className={classes.salesProgress}>
            <CircularProgressWithLabel value={salesProgress} />
          </div>
          <div>
            <div className={classes.progressTitle}>
              <Typography variant="body2">Total Sales</Typography>
            </div>
            <div className={classes.progressPercent}>
              <Typography variant="subtitle1">Today 2.5% up </Typography>
            </div>
          </div>
        </section>
        <section className={classes.progressContainer}>
          <div className={classes.incomeProgress}>
            <CircularProgressWithLabel value={incomeProgress} />
          </div>
          <div>
            <div className={classes.progressTitle}>
              <Typography variant="body2">Total Income</Typography>
            </div>
            <div className={classes.progressPercent}>
              <Typography variant="subtitle1">Today 1% down </Typography>
            </div>
          </div>
        </section>
        <section className={classes.chartWrapper}>
          <div className={classes.chartContainer}>
            <Doughnut data={data} options={options} plugins={plugins} />
          </div>
        </section>
      </section>
    </>
  )
}

export default PieChart
