import React, { useEffect } from 'react'
import useStyles from './style'
import { useDropzone } from 'react-dropzone'
import formatBytes from 'utils/formatBytes'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { Button, Typography } from '@mui/material'

const ImageUploader = (props) => {
  const {
    upload,
    title,
    multiple,
    maxFiles,
    getErrors,
    setUploadErrors,
    fileType,
    fileLabel,
  } = props
  const classes = useStyles()
  const maxFileSize = 5242880

  const fileLengthValidator = (file) => {
    if (file.size > maxFileSize) {
      alert(`File size is larger than ${formatBytes(maxFileSize)}`)
      return {
        code: 'file-too-large',
        message: `File size is larger than ${formatBytes(maxFileSize)}`,
      }
    }
    return null
  }

  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxSize: formatBytes(maxFileSize),
    maxFiles: maxFiles ? maxFiles : 1,
    multiple: multiple ? multiple : false,
    accept: fileType
      ? fileType
      : 'image/jpeg, image/jpg, image/webp , image/png',
    validator: fileLengthValidator,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        upload(acceptedFiles[0]); // Single file
      } else if (acceptedFiles.length > 1) {
        upload(acceptedFiles); // Multiple files
      }
    },
  })

  // Set upload errors
  useEffect(() => {
    if (getErrors) {
      setUploadErrors(fileRejections)
    }
  }, [fileRejections, setUploadErrors, getErrors])

  return (
    <>
      <section {...getRootProps()} className={classes.root}>
        <input {...getInputProps()} />
        <section className={classes.wrapper}>
          <div className={classes.infoWrapper}>
            <CloudUploadOutlinedIcon />
            <div>
              <div className={classes.header}>
                <Typography variant="body1">
                  {title ? title : 'Upload image'}
                </Typography>
              </div>
              <div className={classes.caption}>
                <Typography variant="subtitle1">
                  {fileLabel
                    ? fileLabel
                    : 'JPG,PNG,JPEG, file size no more than 5MB'}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.btn}>
            <Button variant="contained" disableElevation onClick={open}>
              Select file
            </Button>
          </div>
        </section>
      </section>
    </>
  )
}

export default ImageUploader
