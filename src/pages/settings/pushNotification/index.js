import React, { useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography, Button } from '@mui/material'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import AddIcon from '@mui/icons-material/Add'
import CustomSwitch from 'sharedComponents/customSwitch'
import AddNotificationModal from './AddNotificationModal'

const sampleData = [
  {
    id: 1,
    title: 'Welcome offer',
    sentTo: 'customers',
    description: 'welcome offer mela',
    image: '/assets/images/notification1.png',
    status: true,
  },
  {
    id: 2,
    title: 'Diwali offer',
    sentTo: 'shop',
    description: 'welcome offer mela',
    image: '/assets/images/notification1.png',
    status: false,
  },
  {
    id: 3,
    title: 'Summer offer',
    sentTo: 'customers',
    description: 'welcome offer mela',
    image: '/assets/images/notification1.png',
    status: true,
  },
]

const PushNotification = () => {
  const classes = useStyles()
  const classesTable = useStylesTable()
  const [row, setRow] = useState(sampleData)
  const [pageSize, setPageSize] = useState(10)
  const [openAddNotificationModal, setOpenAddNotificationModal] =
    useState(false)

  // handle push notification modal
  const handleOpenAddNotificationModal = () => {
    setOpenAddNotificationModal(true)
  }
  const handleCloseAddNotificationModal = () => {
    setOpenAddNotificationModal(false)
  }

  const dataRows = _.map(row || [], (data, index) => ({
    sno: index + 1,
    title: data?.title,
    sentTo: data?.sentTo,
    description: data?.description,
    image: data?.image,
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
      field: 'image',
      headerName: 'Image',
      minWidth: 170,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <img
              src={params?.row?.image}
              alt="img"
              className={classesTable.imgSize}
            />
          </>
        )
      },
    },
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 300,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.title}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 380,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.description}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'sentTo',
      headerName: 'Target',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.sentTo}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <CustomSwitch checked={params?.row?.status} />
            </div>
          </>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 160,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div className={classesTable.iconsWrapper}>
              {/* <section className={classesTable.editIcon}>
                <img
                  src="/assets/images/edit.svg"
                  alt="edit"
                  className={classes.editImg}
                />
              </section> */}
              <section className={classesTable.deleteIcon}>
                <img
                  src="/assets/images/delete.svg"
                  alt="delete"
                  className={classes.deleteImg}
                />
              </section>
            </div>
          </>
        )
      },
    },
  ]

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <section className={classesTable.zoneWrapper}>
            <section className={classesTable.titleWrapper}>
              <div className={classesTable.title}>
                <Typography variant="h5">Push notifications</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">59</Typography>
              </div>
            </section>
            <section className={classesTable.addBtn}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleOpenAddNotificationModal}
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
            fileName={'push_notifications_list'}
          />
        </Grid>
      </Grid>
      <AddNotificationModal
        open={openAddNotificationModal}
        handleClose={handleCloseAddNotificationModal}
      />
    </>
  )
}

export default PushNotification
