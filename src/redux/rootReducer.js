import { combineReducers } from 'redux'
import prompt from './snackbar/reducer'
import loader from './loader/reducer'
import authReducer from './authentication/reducer';
import productReducer from "./slices/product/productSlice";
import shopReducer from "./slices/shop/shopSlice";
import productCategoryReducer from './slices/productCategory/productCategorySlice';
import orderReducer from './slices/orders/orderSlice';
import couponReducer from './slices/coupon/couponSlice';
import managerReducer from './slices/manager/managerSlice';
import customerContactReducer from './slices/customerContact/customerContactSlice';
import vendorContactReducer from './slices/vendorContact/vendorContactSlice';
import customerReducer from './slices/customer/customerSlice';
import mainBannerReducer from './slices/mainBanner/mainBannerSlice';
import shopBannerReducer from './slices/shopBanner/shopBannerSlice';

const rootReducer = combineReducers({
  snackbar: prompt,
  loader: loader,
  authReducer: authReducer,
  products: productReducer,
  shops: shopReducer,
  productCategory: productCategoryReducer,
  order: orderReducer,
  coupon: couponReducer,
  manager: managerReducer,
  customerContact: customerContactReducer,
  vendorContact: vendorContactReducer,
  customer: customerReducer,
  mainBanner: mainBannerReducer,
  shopBanner: shopBannerReducer
})

export default rootReducer
