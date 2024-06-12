import React from 'react'
import useStyles from './style'
import {
  Dialog,
  DialogContent,
  Typography,
  Slide,
  Button,
  Divider,
} from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const CustomPermissionDialog = (props) => {
  const { open, handleClose, maxWidth, onClickYes } = props
  const classes = useStyles()

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={maxWidth ? maxWidth : 'xl'}
        aria-describedby="dialog-box"
        className={classes.containerStyle}
        fullWidth={false}
      >
        <DialogContent>
          <div className={classes.text}>
            <Typography variant="body1">
              Are you sure want to delete?
            </Typography>
          </div>
          <section className={classes.btnWrapper}>
            <div className={classes.yesBtnWrapper}>
              <Button
                variant="contained"
                disableElevation
                onClick={onClickYes ? onClickYes : () => {}}
              >
                Yes
              </Button>
            </div>
            <div className={classes.noBtnWrapper}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleClose}
              >
                No
              </Button>
            </div>
          </section>
        </DialogContent>
        <Divider />
      </Dialog>
    </>
  )
}

export default CustomPermissionDialog
