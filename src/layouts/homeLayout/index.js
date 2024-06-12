import React from 'react'
import Sidebar from 'pages/sidebar'
import Header from 'pages/header'
import useStyles from './style'

const HomeLayout = (props) => {
  const { children } = props
  const classes = useStyles()
  return (
    <>
      <Sidebar />
      <Header />
      <section className={classes.children}>{children}</section>
    </>
  )
}

export default HomeLayout
