import React, { useEffect, useState } from 'react'
import useStyles from './style'
import useStylesTable from 'pages/tableStyle/style'
import { Grid, Typography, Button } from '@mui/material'
import _ from 'lodash'
import CustomDataGrid from 'sharedComponents/customDataGrid'
import AddIcon from '@mui/icons-material/Add'
import CustomSwitch from 'sharedComponents/customSwitch'
import moment from 'moment'
import AddManagerModal from './addManagerModal'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "../../../redux/store";

import { getAllManagers, getManagerById, updateManagerById } from 'redux/slices/manager/managerSlice';

const Manager = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const classesTable = useStylesTable()
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10)
  const [managersData, setManagers] = useState([])
  const [openAddManagerModal, setOpenAddManagerModal] = useState(false);
  const [managerId, setManagerId] = useState(null);
  const [mode, setMode] = useState('new');
  const [editManagerData, setEditManagerData] = useState([]);

  const { managers, currentManager } = useSelector((state) => state.manager);

  useEffect(() => {
    dispatch(getAllManagers());
  }, [dispatch]);

  useEffect(() => {
    if (managers || managers.length) {
      setManagers(managers);
    }
  }, [managers])

  // handle add manager modal
  const handleOpenAddManagerModal = () => {
    setOpenAddManagerModal(true)
  }
  const handleCloseAddManagerModal = () => {
    setOpenAddManagerModal(false)
  };

  const handleChange = (item) => {
    const data = {
      id: item?._id,
      status: item?.status === 1 ? 0 : 1,
    };
    dispatch(updateManagerById(data));
  };

  const editManager = (row) => {
    setMode('edit')
    setManagerId(row?._id)
    setOpenAddManagerModal(true);
  };
  useEffect(() => {
    if (managerId) {
      dispatch(getManagerById(managerId));
    }
  }, [dispatch, managerId]);


  useEffect(() => {
    setEditManagerData(currentManager);
  }, [currentManager]);

  const dataRows = _.map(managersData || [], (data, index) => ({
    sno: index + 1,
    name: data?.name,
    managerId: data?.managerId,
    gender: data?.gender,
    phoneNo: data?.phoneNo,
    email: data?.email,
    shopsAssigned: data?.assignedShops,
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
      field: 'name',
      headerName: 'Name',
      minWidth: 280,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.name}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'managerId',
      headerName: 'ID',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div className={`${classesTable.linkText} ${classesTable.cursor}`}>
              <Typography
                variant="body2"
                onClick={() => navigate(`/manager/123`)}
              >
                {params?.row?.managerId}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.gender}</Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'phoneNo',
      headerName: 'Contact',
      minWidth: 280,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">{params?.row?.phoneNo}</Typography>
              <div className={`${classesTable.padding}`}>
                <Typography variant="body2">{params?.row?.email}</Typography>
              </div>
            </div>
          </>
        )
      },
    },
    {
      field: 'shopsAssigned',
      headerName: 'Assigned Shops',
      minWidth: 180,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography variant="body2">
                {params?.row?.shopsAssigned}
              </Typography>
            </div>
          </>
        )
      },
    },
    {
      field: 'status',
      headerName: 'Activate/Deactivate',
      minWidth: 170,
      sortable: true,
      renderCell: (params) => {
        return (
          <>
            <div>
              <CustomSwitch
                checked={params?.row?.status === 0 ? false : true}
                onChange={() => handleChange(params?.row?.row)}
              />
            </div>
            {/* <div>
              <CustomSwitch checked={params?.row?.status} />
            </div> */}
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

              <section
                className={classesTable.editIcon}
                onClick={() => editManager(params?.row?.row)}
              >
                <img
                  src="/assets/images/edit.svg"
                  alt="edit"
                  className={classes.editImg}
                />
              </section>

              {/* <section className={classesTable.deleteIcon}>
                <img
                  src="/assets/images/delete.svg"
                  alt="delete"
                  className={classes.deleteImg}
                />
              </section> */}
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
                <Typography variant="h5">Manager list</Typography>
              </div>
              <div className={classesTable.countWrapper}>
                <Typography variant="h5">{managersData?.length}</Typography>
              </div>
            </section>
            <section className={classesTable.addBtn}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleOpenAddManagerModal}
              >
                <AddIcon /> Add
              </Button>
            </section>
          </section>
        </Grid>
        <Grid item xs={12} className={classesTable.tableWrapper}>
          <CustomDataGrid
            getRowId={(row) => row?.row?._id}
            rows={dataRows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            fileName={'manager_list'}
          />
        </Grid>
      </Grid>
      <AddManagerModal
        open={openAddManagerModal}
        handleClose={handleCloseAddManagerModal}
        mode={mode}
        managerId={managerId}
        editManagerData={editManagerData}
      />
    </>
  )
}

export default Manager
