import React, { useState } from 'react'
import CustomDialog from 'sharedComponents/customDialog'
import useStyles from './style'
import {
  Grid,
  TextField,
  Autocomplete,
  Typography,
  InputAdornment,
  Button,
} from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const AssignShopModal = (props) => {
  const { open, handleClose } = props
  const classes = useStyles()
  const [uploadErrors, setUploadErrors] = useState([])
  const [search, setSearch] = useState(null)
  const [zoneOptions, setZoneOptions] = useState([
    { label: 'Chennai' },
    { label: 'Coimbatore' },
    { label: 'Madurai' },
  ])
  const [zone, setZone] = useState(null)
  const [shopList, setShopList] = useState([
    {
      image: '/assets/images/wayne.webp',
      shopName: 'Wayne enterprises',
      shopId: 'SHT57QAZ1',
      assigned: false,
    },
    {
      image: '/assets/images/wayne.webp',
      shopName: 'Cosmic electronics',
      shopId: 'SHT57QAZ2',
      assigned: true,
    },
    {
      image: '/assets/images/wayne.webp',
      shopName: 'Seven cables',
      shopId: 'SHT57QAZ3',
      assigned: false,
    },
  ])

  // handle search
  const handleSearch = (e) => {
    setSearch(e?.target?.value)
  }

  return (
    <>
      <CustomDialog
        open={open}
        handleClose={() => {
          handleClose()
        }}
        title={'Assign Shops'}
        btnLabel={'Add'}
        containerStyle={classes.containerStyle}
        removeSubmitBtn={true}
      >
        <Grid container>
          <Grid item xs={12}>
            <section className={classes.headerWrapper}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Shops List</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <section className={classes.fieldWrapper}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="search"
                      id="search"
                      value={search}
                      onChange={handleSearch}
                      type={'text'}
                      fullWidth
                      variant="outlined"
                      placeholder="Enter shop name"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      size="small"
                      fullWidth
                      name="zone"
                      id="zone"
                      options={zoneOptions}
                      value={zone}
                      getOptionLabel={(option) => option.label || ''}
                      onChange={(e, value) => {
                        setZone(value)
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Zone" />
                      )}
                    />
                  </Grid>{' '}
                </section>
              </Grid>
            </section>
          </Grid>
          <Grid item xs={12}>
            <section className={classes.shopsContainer}>
              {shopList?.map((data) => (
                <Grid item xs={12} key={data?.shopId}>
                  <section className={classes.shopWrapper}>
                    <div className={classes.shopInfoWrapper}>
                      <img
                        src={data?.image}
                        alt={'img'}
                        className={classes.shopImg}
                      />
                      <div>
                        <Typography variant="body1">
                          {data?.shopName}
                        </Typography>
                        <Typography
                          variant="body1"
                          color={'primary'}
                          style={{ paddingBlockStart: 6 }}
                        >
                          {data?.shopId}
                        </Typography>
                      </div>
                    </div>
                    {data?.assigned === false ? (
                      <div className={classes.btn}>
                        <Button variant="contained" disableElevation fullWidth>
                          Assign
                        </Button>
                      </div>
                    ) : (
                      <div className={classes.btn}>
                        {' '}
                        <Button
                          variant="contained"
                          disableElevation
                          disabled
                          fullWidth
                        >
                          Assigned
                        </Button>
                      </div>
                    )}
                  </section>
                </Grid>
              ))}
            </section>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  )
}

export default AssignShopModal
