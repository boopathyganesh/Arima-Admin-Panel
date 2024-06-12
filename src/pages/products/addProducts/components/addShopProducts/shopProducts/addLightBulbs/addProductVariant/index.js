import React, { useState, useEffect } from 'react'
import CustomDialog from 'sharedComponents/customDialog'
import useStyles from '../../../../../style'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Grid, TextField, Typography, InputAdornment } from '@mui/material'
import ImageUploader from 'pages/shop/addShop/components/imageUploader'
import imageCompression from 'browser-image-compression'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import _ from 'lodash'

const AddProductVariant = (props) => {
  const { open, handleClose, title, btnLabel } = props
  const classes = useStyles()
  const [mrp, setMrp] = useState(0)

  // save product vatiant
  const handleProductVariant = (formValues) => {}

  const formik = useFormik({
    initialValues: {
      color: '',
      mrp: '',
      sellingPrice: '',
      stock: '',
      variantImg: '/assets/images/notification1.png',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      color: yup.string().required('Please choose a variant color'),
      mrp: yup
        .string()
        .required('Product MRP is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .nullable(),
      sellingPrice: yup
        .string()
        .required('Product selling price is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .test(
          'max-count',
          'Selling price should not exceed mrp',
          (val) => parseInt(val) <= mrp
        )
        .nullable(),
      stock: yup
        .string()
        .required('Stock quantity is required')
        .matches(/^[0-9]+$/, 'Only Numbers are allowed')
        .nullable(),
      variantImg: yup.string().required('Please choose a variant image'),
    }),
    onSubmit: handleProductVariant,
  })

  const handleProductVariantImgUpload = async (acceptedFiles) => {
    // console.log('hhhhhh', acceptedFiles)
    const imageFile = acceptedFiles;
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
      <CustomDialog
        open={open}
        handleClose={() => {
          handleClose()
          formik.resetForm()
        }}
        title={'Add Product Variant'}
        btnLabel={'Add'}
        onSubmit={formik?.handleSubmit}
        maxWidth={'sm'}
      >
        <Grid container>
          <Grid item xs={12} className={classes.input}>
            <section style={{ width: 80 }}>
              <TextField
                name="color"
                id="color"
                value={formik?.values?.color}
                onChange={formik?.handleChange}
                type={'color'}
                fullWidth
                variant="outlined"
                label="Color*"
                size="small"
                // error={formik?.errors?.color && formik?.touched?.color}
                // helperText={
                //   formik?.errors?.color &&
                //   formik?.touched?.color &&
                //   formik?.errors?.color
                // }
              />
            </section>
            <Grid item xs={12} className={classes.error}>
              <Typography variant="subtitle1">
                {formik?.errors?.color &&
                  formik?.touched?.color &&
                  formik?.errors?.color}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.input}>
            <TextField
              name="stock"
              id="stock"
              value={formik?.values?.stock}
              onChange={formik?.handleChange}
              type={'text'}
              fullWidth
              variant="outlined"
              label="Stock*"
              size="small"
              error={formik?.errors?.stock && formik?.touched?.stock}
              helperText={
                formik?.errors?.stock &&
                formik?.touched?.stock &&
                formik?.errors?.stock
              }
            />
          </Grid>
          <Grid item xs={12} className={classes.infoLabel}>
            <Typography variant="body1">Price details</Typography>
          </Grid>
          <Grid item xs={12}>
            <section className={classes.fieldWrapper}>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="mrp"
                  id="mrp"
                  value={formik?.values?.mrp}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="MRP*"
                  size="small"
                  error={formik?.errors?.mrp && formik?.touched?.mrp}
                  helperText={
                    formik?.errors?.mrp &&
                    formik?.touched?.mrp &&
                    formik?.errors?.mrp
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.input}>
                <TextField
                  name="sellingPrice"
                  id="sellingPrice"
                  value={formik?.values?.sellingPrice}
                  onChange={formik?.handleChange}
                  type={'text'}
                  fullWidth
                  variant="outlined"
                  label="Selling price*"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.password}
                      >
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#129A43',
                            backgroundColor: '#E2E2E2',
                            paddingInline: 12,
                            paddingBlock: 2,
                            borderRadius: 4,
                            fontWeight: 600,
                          }}
                        >
                          Dis: 25%
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  error={
                    formik?.errors?.sellingPrice &&
                    formik?.touched?.sellingPrice
                  }
                  helperText={
                    formik?.errors?.sellingPrice &&
                    formik?.touched?.sellingPrice &&
                    formik?.errors?.sellingPrice
                  }
                />
              </Grid>
            </section>
          </Grid>
          <Grid item xs={12}>
            <section
              className={
                !_.isEmpty(formik?.values?.variantImg)
                  ? classes.disableWrapper
                  : classes.uploadWrapper
              }
            >
              <ImageUploader
                upload={handleProductVariantImgUpload}
                title="Upload your product variant image"
              />
            </section>
            <Grid item xs={12} className={classes.error}>
              <Typography variant="subtitle1">
                {formik?.errors?.variantImg &&
                  formik?.touched?.variantImg &&
                  formik?.errors?.variantImg}
              </Typography>
            </Grid>
            <section className={classes.imgWrapper}>
              <img
                src={formik?.values?.variantImg}
                alt="img"
                className={classes.img}
              />
              <div className={classes.deleteBtnWrapper}>
                <CloseOutlinedIcon />
              </div>
            </section>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  )
}

export default AddProductVariant
