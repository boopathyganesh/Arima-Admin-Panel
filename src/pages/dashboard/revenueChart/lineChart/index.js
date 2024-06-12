import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
      text: 'Weekly Chart',
    },
    font: {
      family: 'Poppins, sans-serif',
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      ticks: {
        font: {
          family: 'Nunito Sans, sans-serif',
        },
      },
    },
    x: {
      ticks: {
        font: {
          family: 'Poppins, sans-serif',
        },
      },
    },
  },
}

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const data = {
  labels,
  datasets: [
    {
      label: 'Sales',
      data: [200, 400, 600, 800, 500, 1200, 300],
      borderColor: '#0E5EFA',
      backgroundColor: '#129A43',
      yAxisID: 'y',
      borderWidth: 1.5,
    },
  ],
}

const LineChart = () => {
  return (
    <>
      <section style={{ paddingBlockStart: 12 }}>
        <Line options={options} data={data} />
      </section>
    </>
  )
}

export default LineChart
