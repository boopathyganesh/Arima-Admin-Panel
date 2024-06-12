import React from 'react'
import { Dialog, DialogContent, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux'
import Lottie from 'react-lottie'
import LoaderLottieFile from 'sharedComponents/loaderLottieFile/index.json'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-scrollPaper': {
      background: 'none',
    },
    '& .MuiDialog-paper': {
      background: 'none',
      boxShadow: 'none',
    },
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgb(255 255 255 / 50%)',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: 16,
    '& .MuiCircularProgress-svg': {
      color: 'red',
    },
  },
  loaderTxt: {
    paddingBlock: 8,
  },
}))

const Loader = () => {
  const classes = useStyles()
  const loader = useSelector((state) => state?.loader)
  const { showLoader, loaderTxt } = loader

  // Lottie file options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoaderLottieFile,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={showLoader}
      className={classes.root}
      aria-labelledby="Loader Popup"
    >
      <DialogContent>
        <div className={classes.container}>
          <Lottie options={defaultOptions} height={80} width={80} />
          <Typography
            className={classes.loaderTxt}
            variant="subtitlte2"
            sx={{ fontWeight: 600 }}
          >
            {loaderTxt}
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Loader
