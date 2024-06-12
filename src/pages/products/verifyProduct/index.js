import React, { useCallback, useEffect, useState } from 'react'
import AddShopProducts from 'pages/products/addProducts/components/addShopProducts'
import useStyles from './style'
import { Grid, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import productApi from 'services/products';
import { showLoader, hideLoader } from 'redux/loader/actions';
import { useDispatch } from 'react-redux';
import AddLightBulbs from '../addProducts/components/addShopProducts/shopProducts/addLightBulbs';

const VerifyProduct = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);

  // GET PRODUCT BY ID
  const getProductById = useCallback(() => {
    dispatch(showLoader('Loading please wait...'))
    const onSuccess = (res) => {
      dispatch(hideLoader());
      if (res?.data?.status === true) {
        setProductData(res?.data?.data);
      }
    }
    const onFailure = (err) => {
      dispatch(hideLoader());
      console.log('get all product category list Api', err)
    }
    productApi.getProductById(id).then(onSuccess, onFailure)
  }, [])
  useEffect(() => {
    getProductById();
  }, [getProductById]);


  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5">Verify Product</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <AddLightBulbs data={productData} isVerify={true} />
          {/* <AddShopProducts data={productData} isEdit={true} /> */}
        </Grid>
      </Grid>
    </>
  )
}

export default VerifyProduct