import React, { useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography, Button } from '@mui/material'
import moment from 'moment'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import { useNavigate } from 'react-router-dom'

const sampleData = [
  {
    id: 1,
    createdDate: moment(),
    customerName: 'Murphy',
    ticketId: 'TKT45QW35',
    customerPhoneNo: 8908908900,
    issueDescription: 'Damaged product',
    issueStatus: true,
  },
  {
    id: 2,
    createdDate: moment(),
    customerName: 'Murphy',
    ticketId: 'TKT45QW35',
    customerPhoneNo: 8908908900,
    issueDescription: 'Damaged product',
    issueStatus: false,
  },
  {
    id: 3,
    createdDate: moment(),
    customerName: 'Murphy',
    ticketId: 'TKT45QW35',
    customerPhoneNo: 8908908900,
    issueDescription: 'Damaged product',
    issueStatus: true,
  },
]

const CustomerGrievance = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const navigate = useNavigate()
  const [row, setRow] = useState(sampleData)
  const [pageSize, setPageSize] = useState(10)

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    createdDate: data?.createdDate,
    customerName: data?.customerName,
    ticketId: data?.ticketId,
    customerPhoneNo: data?.customerPhoneNo,
    issueDescription: data?.issueDescription,
    issueStatus: data?.issueStatus,
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
      field: 'createdDate',
      headerName: 'Date',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <div>
                <Typography variant="body2">
                  {moment(params?.row?.createdDate).format('DD MMM YYYY')}
                </Typography>
              </div>
              <div
                className={`${classesTable.padding} ${classesTable.timeWrapper}`}
              >
                <Typography variant="body2">
                  {moment(params?.row?.createdDate).format('hh:mm a')}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      minWidth: 300,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.customerName}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'ticketId',
      headerName: 'Ticket ID',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={`${classesTable.orderId} ${classesTable.cursor}`}>
              <Typography
                variant="body2"
                onClick={() => navigate('/grievance/123')}
              >
                {params?.row?.ticketId}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'customerPhoneNo',
      headerName: 'Mobile Number',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.customerPhoneNo}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'issueDescription',
      headerName: 'Issue Description',
      minWidth: 300,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.issueDescription}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'issueStatus',
      headerName: 'Issue Address',
      minWidth: 150,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.issueStatus === true ? (
              <div>
                <Button variant="contained" disableElevation disabled>
                  Addressed
                </Button>
              </div>
            ) : (
              <div className={classesTable.addBtn}>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => navigate('/grievance/123')}
                >
                  Address
                </Button>
              </div>
            )}
          </>
        )
      },
    },
  ]

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.titleWrapper}>
            <div className={classesTable.title}>
              <Typography variant="h5">Customer Grievance</Typography>
            </div>
            <div className={classesTable.countWrapper}>
              <Typography variant="h5">39</Typography>
            </div>
          </section>
        </Grid>
        <Grid item xs={12} className={classesTable.tableWrapper}>
          <CustomDataGrid
            getRowId={(row) => row?.row?.id}
            rows={dataRows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            fileName={'customers_grievance_list'}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerGrievance
