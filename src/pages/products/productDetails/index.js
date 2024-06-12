import React, { useEffect } from 'react'
import AddLightBulbs from 'pages/products/addProducts/components/addShopProducts/shopProducts/addLightBulbs';
import AddShopProducts from 'pages/products/addProducts/components/addShopProducts'
import useStyles from './style'
import { Grid, Typography } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getProductById } from 'redux/slices/product/productSlice';
import { useDispatch, useSelector } from 'react-redux'

const ProductDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams()
  const navigate = useNavigate();

  const { currentProduct } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);

  console.log('currentProduct', currentProduct);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5" onClick={() => navigate(-1)}>
              <ArrowBackIosIcon />
              Product Details
            </Typography>
          </div>
        </Grid>
        <Grid container className={classes.container}>
          <AddLightBulbs isEdit={true} data={currentProduct} />
          {/* <AddShopProducts isEdit={true} productData={currentProduct} /> */}
        </Grid>
      </Grid>
    </>
  )
}

export default ProductDetails
