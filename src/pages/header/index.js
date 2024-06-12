import React, { useState } from 'react'
import useStyles from './style'
import { Grid, Typography, Avatar, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuToggle } from 'redux/authentication/actions'
import ListIcon from '@mui/icons-material/List'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

const Header = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const triggerHeaderState = useSelector(
    (state) => state?.ProfileSettingsReducer?.triggerHeader
  )
  const menuToggle = useSelector((state) => state?.authReducer?.menuToggle)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    localStorage.clear()
    navigate(0)
  }

  return (
    <>
      <section className={classes.root}>
        <section className={classes.wrapper}>
          <section className={classes.logoWrapper}>
            <section className={classes.mobileMenuContainer}>
              {/* {menuToggle ? (
                <section onClick={() => dispatch(setMenuToggle(!menuToggle))}>
                  <CloseOutlinedIcon />
                </section>
              ) : ( */}
              <section>
                <ListIcon
                  onClick={() => dispatch(setMenuToggle(!menuToggle))}
                />
              </section>
              {/* )} */}
            </section>
            {/* <img
              src="/assets/images/logo.svg"
              alt="logo"
              className={classes.logo}
            /> */}
            <Typography variant="h5">Welcome arima!</Typography>
          </section>
          <section className={classes.profileWrapper}>
            <div className={classes.notiImgWrapper}>
              <img
                src="/assets/images/notification2.png"
                alt="notification"
                className={classes.notiImg}
              />
            </div>
            <div className={classes.avatarWrapper}>
              <div className={classes.name}>
                <Typography variant="body1">Admin</Typography>
              </div>
              <div
                className={classes.avatar}
                id="avatar"
                aria-controls={open ? 'avatar-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Avatar src={'assets/images/avatar.png'} alt={'A'} />
              </div>
            </div>
          </section>
          <Menu
            id="avatar-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'avatar',
            }}
            className={classes.menu}
          >
            <MenuItem
              onClick={() => {
                navigate('/profilesettings')
                handleClose()
              }}
            >
              <section className={classes.profile}>
                <div className={classes.profilePic}>
                  <Avatar src={'assets/images/avatar.png'} alt={'A'} />
                </div>
                <div className={classes.profileLabel}>
                  <Typography varaint="body2">Admin Coimbatore</Typography>
                  <Typography varaint="body2">admin@arimacables.com</Typography>
                </div>
              </section>
            </MenuItem>
            {/* <MenuItem onClick={handleClose} className={classes.label}>
              <Typography
                varaint="body1"
                onClick={() => navigate('/profilesettings')}
              >
                Settings
              </Typography>
            </MenuItem> */}
            <MenuItem className={classes.label} onClick={handleLogout}>
              <Typography varaint="body2">Sign out</Typography>
            </MenuItem>
          </Menu>
        </section>
      </section>
    </>
  )
}

export default Header
