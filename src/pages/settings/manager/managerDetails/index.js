import React, { useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Avatar,
  Button,
} from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import moment from 'moment'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate, useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import AssignShopModal from './assignShopModal'

const sampleData = [
  {
    id: 1,
    shopId: 'SH55AR09',
    shopName: 'Wayne enterprise',
    createdAt: moment(),
    category: 'Tube lights',
    zone: 'Gandhipuram',
    ownerName: 'Bruce Wayne',
    ownerPhoneNo: '7773337773',
    isGst: true,
    planName: 'Free plan',
    updatedTime: moment(),
    shopStatus: 'Pending',
    active: true,
    status: true,
  },
  {
    id: 2,
    shopId: 'SH55AR09',
    shopName: 'RKO electronics shop',
    createdAt: moment(),
    category: 'Tube lights',
    zone: 'Peelamedu',
    ownerName: 'Frances ha',
    ownerPhoneNo: '7773337773',
    isGst: false,
    planName: 'Free plan',
    updatedTime: moment(),
    shopStatus: 'Pending',
    active: false,
    status: false,
  },
  {
    id: 3,
    shopId: 'SH55AR09',
    shopName: 'RKO electronics shop',
    createdAt: moment(),
    category: 'Tube lights',
    zone: 'Singanallur',
    ownerName: 'Sherlock',
    ownerPhoneNo: '7773337773',
    isGst: true,
    planName: 'Free plan',
    updatedTime: moment(),
    shopStatus: 'Pending',
    active: true,
    status: true,
  },
]

const ManagerDetails = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const navigate = useNavigate()
  const { id } = useParams()
  const [row, setRow] = useState(sampleData)
  const [pageSize, setPageSize] = useState(10)
  const [openShopAssignModal, setShopAssignModal] = useState(false)

  // Handle shop assign modal
  const handleOpenShopAssignModal = () => {
    setShopAssignModal(true)
  }
  const handleCloseShopAssignModal = () => {
    setShopAssignModal(false)
  }

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    shopId: data?.shopId,
    shopName: data?.shopName,
    category: data?.category,
    zone: data?.zone,
    ownerName: data?.ownerName,
    ownerPhoneNo: data?.ownerPhoneNo,
    status: data?.status,
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
      field: 'shopId',
      headerName: 'Shop ID',
      minWidth: 220,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={`${classesTable.linkText} ${classesTable.cursor}`}>
              <Typography
                variant="body2"
                onClick={() => navigate('/shopdetails/123')}
              >
                {params?.row?.shopId}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'shopName',
      headerName: 'shop Name',
      minWidth: 340,
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
      field: 'category',
      headerName: 'Product Category',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.category}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'zone',
      headerName: 'Shop Zone',
      minWidth: 240,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.zone}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'ownerName',
      headerName: 'Owner',
      minWidth: 340,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <div className={classesTable.linkText}>
                <Typography variant="body2">
                  {params?.row?.ownerName}
                </Typography>
              </div>
              <div className={`${classesTable.padding}`}>
                <Typography variant="body2">
                  {params?.row?.ownerPhoneNo}
                </Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'status',
      headerName: 'Action',
      minWidth: 180,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div className={`${classesTable.redText} ${classesTable.cursor}`}>
              <Typography variant="body2">remove</Typography>
            </div>
          </>
        )
      },
    },
  ]

  return (
    <>
      <Grid container className={classes.root}>
        {/* Header */}
        <Grid item xs={12}>
          <div className={classes.headerLabel}>
            <Typography variant="h5" onClick={() => navigate(-1)}>
              {' '}
              <ArrowBackIosIcon /> Manager Details
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} lg={6}>
            <section className={classes.cardContainer}>
              <section className={classes.avatarWrapper}>
                <Avatar src="/assets/images/frances1.png" alt="user" />
                <div>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Frances Ha
                  </Typography>
                  <div className={classes.padding}>
                    <Typography variant="body2" color="primary">
                      ID : MNG007UIT
                    </Typography>
                  </div>
                  <div className={classes.padding}>
                    <Typography variant="body2">
                      Email Id : frances@gmail.in
                    </Typography>
                  </div>
                  <div className={classes.padding}>
                    <Typography variant="body2">
                      Phone no : +91 7773337771
                    </Typography>
                  </div>
                </div>
              </section>
            </section>
          </Grid>
          <Grid item xs={12}>
            <section className={classes.cardContainer}>
              <Grid item xs={12}>
                <section className={classesTable.zoneWrapper}>
                  <section className={classesTable.titleWrapper}>
                    <div className={classesTable.title}>
                      <Typography variant="h5">Shops Assigned</Typography>
                    </div>
                    <div className={classesTable.countWrapper}>
                      <Typography variant="h5">7</Typography>
                    </div>
                  </section>
                  <section className={classesTable.addBtn}>
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={handleOpenShopAssignModal}
                    >
                      <AddIcon /> Add
                    </Button>
                  </section>
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
                  fileName={`manager_${id}_assignedshop_list`}
                />
              </Grid>
            </section>
          </Grid>
        </Grid>
      </Grid>
      <AssignShopModal
        open={openShopAssignModal}
        handleClose={handleCloseShopAssignModal}
      />
    </>
  )
}

export default ManagerDetails
