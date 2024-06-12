import React, { useEffect, useState } from 'react';
import useStyles from './style'
import { Grid, Typography } from '@mui/material'
import ShopAvatarDetails from './shopAvatarDetails'
import ShopDetailsComp from './shopDetails'
import Earnings from './earnings'
import ShopDetailTabs from './shopDetailTabs'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate, useParams } from 'react-router-dom';
import { getShopById } from 'redux/slices/shop/shopSlice';
import { useDispatch, useSelector } from 'react-redux'

const ShopDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [shopData, setShopData] = useState();

  const { currentShop } = useSelector((state) => state.shops);


  useEffect(() => {
    dispatch(getShopById(id));
  }, [dispatch]);


  useEffect(() => {

    if (currentShop) {
      setShopData(currentShop);
    };
  }, [currentShop]);
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5" onClick={() => navigate(-1)}>
              <ArrowBackIosIcon /> Shop Details
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <section className={classes.detailsWrapper}>
            <Grid item xs={12} lg={7}>
              <section>
                <ShopAvatarDetails data={shopData} />
                <ShopDetailsComp data={shopData} />
              </section>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Earnings />
            </Grid>
          </section>
        </Grid>
        <Grid item xs={12}>
          <ShopDetailTabs shopId={id} />
        </Grid>
      </Grid>
    </>
  )
}

export default ShopDetails
