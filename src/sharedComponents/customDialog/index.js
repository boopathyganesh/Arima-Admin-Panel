import React from 'react'
import useStyles from './style'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Slide,
  DialogActions,
  Button,
  Divider,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const CustomDialog = (props) => {
  const {
    open,
    handleClose,
    title,
    children,
    btnLabel,
    onSubmit,
    maxWidth,
    containerStyle,
    removeSubmitBtn,
    mode,
    isEdit,
    productCategoryApproveReject
  } = props
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={maxWidth ? maxWidth : 'xl'}
        aria-describedby="dialog-box"
        className={
          containerStyle
            ? `${containerStyle} ${classes.root}`
            : `${classes.root} ${classes.container} `
        }
        fullWidth={false}
      >
        <DialogTitle>
          <section className={classes.dialogTitleContainer}>
            <Typography variant="body1" className={classes.title}>
              {title}
            </Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </section>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <Divider />
        <DialogActions>
          <section className={classes.btnWrapper}>
            <section className={classes.closeBtn}>
              <Button onClick={handleClose}>Close</Button>
            </section>
            {removeSubmitBtn ? (
              <></>
            ) : (
              <section className={classes.submitBtn}>

                {mode === 'verify' ?
                  <>
                    <Button
                      sx={{ mr: 2 }}
                      color="secondary"
                      variant="contained"
                      onClick={() => productCategoryApproveReject("APPROVED")}
                    >
                      {btnLabel ? btnLabel[0] : 'Accept'}
                    </Button>
                    <Button
                      style={{ backgroundColor: "#dd0000", color: "#fff" }}
                      color="secondary"
                      variant="contained"
                      onClick={() => productCategoryApproveReject("REJECTED")}
                    >
                      {btnLabel ? btnLabel[1] : 'Reject'}
                    </Button>
                  </>
                  : <Button
                    color="secondary"
                    variant="contained"
                    onClick={onSubmit}
                  >
                    {btnLabel ? btnLabel : 'Submit'}
                  </Button>}
              </section>
            )}
          </section>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CustomDialog
