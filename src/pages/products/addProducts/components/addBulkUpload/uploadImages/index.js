import React, { useState } from 'react'
import useStyles from 'pages/products/addProducts/style'
import { Grid, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import imageCompression from 'browser-image-compression'
import _ from 'lodash'

const UploadImages = () => {
  const classes = useStyles()
  const [uploadErrors, setUploadErrors] = useState([])

  const handleUploadProductImages = (formValues) => {}

  const formik = useFormik({
    initialValues: {
      images: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      images: yup.string().required('Please select images').nullable(),
    }),
    onSubmit: handleUploadProductImages,
  })

  const handleProductImages = async (acceptedFiles) => {
    // console.log('hhhhhh', acceptedFiles)
    const imageFile = acceptedFiles?.[0]
    console.log('originalFile instanceof Blob', imageFile instanceof Blob) // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)

    const options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    try {
      const compressedFile = await imageCompression(imageFile, options)
      console.log(
        'compressedFile instanceof Blob',
        compressedFile instanceof Blob
      ) // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB

      // await uploadToServer(compressedFile) // write your own logic
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={5.9} className={classes.wrapper}>
          <section className={classes.uploadWrapper}>
            <ImageUploader
              upload={handleProductImages}
              title="Upload product images"
              multiple={true}
              maxFiles={25}
              getErrors={true}
              setUploadErrors={setUploadErrors}
            />
          </section>
          {!_.isEmpty(uploadErrors) && (
            <Grid item xs={12} style={{ paddingBlock: 8 }}>
              {uploadErrors.map(({ file, errors }) => (
                <div key={file.path}>
                  {errors?.map((e) => (
                    <Typography
                      style={{ color: 'red' }}
                      variant="subtitle1"
                      key={e.code}
                    >
                      {e.message}
                    </Typography>
                  ))}
                </div>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default UploadImages
