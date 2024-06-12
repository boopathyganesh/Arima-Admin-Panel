import React, { useEffect, useState, useCallback } from 'react'
import useStyles from './style'
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ExpandMore from '@mui/icons-material/ExpandMore'
import list from 'model/menuList'
import { useLocation, useNavigate } from 'react-router-dom'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuToggle } from 'redux/authentication/actions'

const SideBar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const menuToggle = useSelector((state) => state?.authReducer?.menuToggle)
  const [selectedIndex, setSelectedIndex] = useState(pathname)
  const [menuList, setMenuList] = useState(list)

  const handleClick = (index, openState) => {
    const updatedMenuList = menuList?.map((data, idx) => {
      if (data?.isCollapsible) {
        if (idx === index) {
          return { ...data, open: !openState, active: true }
        } else {
          return { ...data, open: false, active: false }
        }
      } else {
        return { ...data, open: false, active: false }
      }
    })
    setMenuList(updatedMenuList)
  }

  useEffect(() => {
    setSelectedIndex(pathname)
  }, [pathname])

  const handleMenuNavigate = (link) => {
    navigate(link)
  }

  // To Open the Active menu Collapsible True when submenu is active
  useEffect(() => {
    let currentArrObj = null
    const currentObjInMainArr = menuList?.find(
      (data) => data?.link === pathname
    )
    if (currentObjInMainArr) {
      currentArrObj = currentObjInMainArr
    } else {
      const currentObjInSubArr = menuList?.find((data) =>
        data?.subMenu?.find((item) => item?.subLink === pathname)
      )
      currentArrObj = currentObjInSubArr
    }
    const updatedMenuList = menuList?.map((data) =>
      data?.name === currentArrObj?.name
        ? { ...data, open: true, active: true }
        : { ...data, open: false, active: false }
    )
    setMenuList(updatedMenuList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <section
        className={
          menuToggle
            ? `${classes.root} ${classes.menuToggle1}`
            : `${classes.root} ${classes.menuToggle2}`
        }
      >
        <div className={classes.logoWrapper}>
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            className={classes.logo}
            onClick={() => navigate('/')}
          />
          <section
            className={classes.closeIconWrapper}
            onClick={() => dispatch(setMenuToggle(!menuToggle))}
          >
            <CloseSharpIcon />
          </section>
        </div>
        <section className={classes.menuWrapper}>
          {menuList?.map((data, idx) => (
            <List
              key={data?.name}
              component="nav"
              aria-label="navMenu"
              onClick={() =>
                data?.isCollapsible === false && handleMenuNavigate(data?.link)
              }
            >
              <ListItemButton
                // selected={data?.link === selectedIndex}
                selected={data?.active === true}
                onClick={() => {
                  handleClick(idx, data?.open)
                }}
                sx={
                  data?.active === true
                    ? {
                        backgroundColor: 'red',
                      }
                    : {}
                }
              >
                <ListItemText
                  primary={
                    <section className={classes.nameWrapper}>
                      <img
                        src={
                          data?.active === true
                            ? data?.activeIcon
                            : data?.normalIcon
                        }
                        alt="icon"
                        className={classes.icon}
                      />
                      <Typography variant="body2">{data?.name}</Typography>
                    </section>
                  }
                  className={
                    // selectedIndex === data?.link
                    data?.active === true
                      ? classes.menuLabels
                      : classes.menuLabels2
                  }
                />
                {/* Accordion Icon */}
                {data?.isCollapsible ? (
                  data?.open ? (
                    <ExpandMore />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )
                ) : (
                  <></>
                )}
              </ListItemButton>
              {/* Accordion */}
              {data?.isCollapsible === true ? (
                <Collapse in={data?.open} timeout="auto" unmountOnExit>
                  {data?.subMenu?.map((item) => (
                    <List
                      component="div"
                      disablePadding
                      key={item?.name}
                      onClick={() =>
                        data?.isCollapsible === true &&
                        handleMenuNavigate(item?.subLink)
                      }
                      className={classes.subMenuLabel}
                      sx={
                        selectedIndex === item?.subLink
                          ? {
                              background: '#EFF5FF',
                              borderRadius: 2,
                            }
                          : {}
                      }
                    >
                      <ListItemButton>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              style={
                                selectedIndex === item?.subLink
                                  ? {
                                      color: '#0E5EFA',
                                    }
                                  : {}
                              }
                            >
                              {item?.name}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              ) : (
                <></>
              )}
            </List>
          ))}
        </section>
      </section>
    </>
  )
}

export default SideBar
