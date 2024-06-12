import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ScrollToTop from 'sharedComponents/scrollToTop'
import HomeLayout from 'layouts/homeLayout'
import PageForbidden from 'sharedComponents/403'
import PageNotFound from 'sharedComponents/404'

// Login
import Login from 'pages/login'
import ForgotPassword from 'pages/login/forgotPassword'
import EmailVerification from 'pages/login/emailVerification'
import ChangePassword from 'pages/login/changePassword'

// Dashboard
import Dashboard from 'pages/dashboard'

// Orders
import AllOrders from 'pages/orders/allOrders'
import PendingOrders from 'pages/orders/pendingOrders'
import RejectedOrders from 'pages/orders/rejectedOrders'
import CancelledOrders from 'pages/orders/cancelledOrders'
import ProcessingOrders from 'pages/orders/processingOrders'
import ReadyOrders from 'pages/orders/readyToPickupOrders'
import DeliveredOrders from 'pages/orders/deliveredOrders'
import OrderDetails from 'pages/orders/orderDetails'

// Shop
import AddShop from 'pages/shop/addShop'
import ShopsApprovalList from 'pages/shop/shopsApprovalList'
import ShopsList from 'pages/shop/shopsList'
import VerifyShop from 'pages/shop/verifyShop'
import ShopDetails from 'pages/shop/shopDetails'
import EditShopDetails from 'pages/shop/editShop'

// Product
import ProductCategory from 'pages/products/productCategory'
import ProductSubCategory from 'pages/products/productSubCategory'
import ProductCategoryApprovalList from 'pages/products/productCategoryApprovalList'
import AddProducts from 'pages/products/addProducts'
import AddMasterProducts from 'pages/products/addProducts/components/addMasterListProducts/masterProducts'
import AddShopProducts from 'pages/products/addProducts/components/addShopProducts/shopProducts'
import ProductsApprovalList from 'pages/products/productsApprovalList'
import VerifyProduct from 'pages/products/verifyProduct'
import ProductsList from 'pages/products/productsList'
import ProductDetails from 'pages/products/productDetails'

// Ads and Banners
import AdsAndBanners from 'pages/adsAndBannersList'

// Coupons
import Coupons from 'pages/coupons'

// Customers
import CustomersList from 'pages/customers'
import CustomerDetails from 'pages/customers/customerDetails'

// Grievance
import CustomerGrievance from 'pages/grievance/customerGrievance'
import GrievanceDetails from 'pages/grievance/grievanceDetails'
import ShopGrievance from 'pages/grievance/shopGrievance'

// Earnings
import Earnings from 'pages/earnings'

// Payouts
import CustomerPayouts from 'pages/payouts/customerPayouts'
import ShopPayouts from 'pages/payouts/shopPayouts'

// Settings
import PushNotification from 'pages/settings/pushNotification'
import ContactDetails from 'pages/settings/contactDetails'
import VendorsCharge from 'pages/settings/vendorsCharge'
import Manager from 'pages/settings/manager'
import ManagerDetails from 'pages/settings/manager/managerDetails'

// Profile
import ProfileSettings from 'pages/profileSettings'

const Router = () => {
  // const isAuthenticated = true

  const isAuthenticated = useSelector(
    (state) => state?.authReducer?.isAuthenticated || false
  )

  const PrivateRoute = ({ children }) => {
    if (isAuthenticated) {
      return (
        <>
          <HomeLayout children={children} />
        </>
      )
    } else return <Navigate to="/" />
  }

  const HomeRoute = () => {
    if (isAuthenticated) {
      return <Navigate replace to="/dashboard" />
    } else return <Login />
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/emailverify/:email" element={<EmailVerification />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Orders */}
          <Route
            path="/allorders"
            element={
              <PrivateRoute>
                <AllOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/pendingorders"
            element={
              <PrivateRoute>
                <PendingOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/rejectedorders"
            element={
              <PrivateRoute>
                <RejectedOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/cancelledorders"
            element={
              <PrivateRoute>
                <CancelledOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/processingorders"
            element={
              <PrivateRoute>
                <ProcessingOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/readyorders"
            element={
              <PrivateRoute>
                <ReadyOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/deliveredorders"
            element={
              <PrivateRoute>
                <DeliveredOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/orderdetails/:id"
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />

          {/* Shop */}
          <Route
            path="/addshop"
            element={
              <PrivateRoute>
                <AddShop />
              </PrivateRoute>
            }
          />
          <Route
            path="/shopsapprovallist"
            element={
              <PrivateRoute>
                <ShopsApprovalList />
              </PrivateRoute>
            }
          />
          <Route
            path="/shopslist"
            element={
              <PrivateRoute>
                <ShopsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/verifyshop/:id"
            element={
              <PrivateRoute>
                <VerifyShop />
              </PrivateRoute>
            }
          />
          <Route
            path="/shopdetails/:id"
            element={
              <PrivateRoute>
                <ShopDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/shopEdit/:id"
            element={
              <PrivateRoute>
                <EditShopDetails />
              </PrivateRoute>
            }
          />

          {/* Products */}
          <Route
            path="/productcategory"
            element={
              <PrivateRoute>
                <ProductCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/productCategoryApprovalList"
            element={
              <PrivateRoute>
                <ProductCategoryApprovalList />
              </PrivateRoute>
            }
          />
          <Route
            path="/addproducts"
            element={
              <PrivateRoute>
                <AddProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/addmasterproduct/:productCategory"
            element={
              <PrivateRoute>
                <AddMasterProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/addshopproduct/:productCategory"
            element={
              <PrivateRoute>
                <AddShopProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/productsapprovallist"
            element={
              <PrivateRoute>
                <ProductsApprovalList />
              </PrivateRoute>
            }
          />
          <Route
            path="/verifyproduct/:id"
            element={
              <PrivateRoute>
                <VerifyProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/productslist"
            element={
              <PrivateRoute>
                <ProductsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />

          {/* Ads and Banners */}
          <Route
            path="/adsandbanners"
            element={
              <PrivateRoute>
                <AdsAndBanners />
              </PrivateRoute>
            }
          />

          {/* Coupons */}
          <Route
            path="/coupons"
            element={
              <PrivateRoute>
                <Coupons />
              </PrivateRoute>
            }
          />

          {/* Customers */}
          <Route
            path="/customerslist"
            element={
              <PrivateRoute>
                <CustomersList />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/:id"
            element={
              <PrivateRoute>
                <CustomerDetails />
              </PrivateRoute>
            }
          />

          {/* Grievance */}
          <Route
            path="/customergrievance"
            element={
              <PrivateRoute>
                <CustomerGrievance />
              </PrivateRoute>
            }
          />
          <Route
            path="/shopgrievance"
            element={
              <PrivateRoute>
                <ShopGrievance />
              </PrivateRoute>
            }
          />
          <Route
            path="/grievance/:id"
            element={
              <PrivateRoute>
                <GrievanceDetails />
              </PrivateRoute>
            }
          />

          {/* Earnings */}
          <Route
            path="/earnings"
            element={
              <PrivateRoute>
                <Earnings />
              </PrivateRoute>
            }
          />

          {/* Payouts */}
          <Route
            path="/customerpayouts"
            element={
              <PrivateRoute>
                <CustomerPayouts />
              </PrivateRoute>
            }
          />
          <Route
            path="/shoppayouts"
            element={
              <PrivateRoute>
                <ShopPayouts />
              </PrivateRoute>
            }
          />

          {/* Settings */}
          <Route
            path="/pushnotification"
            element={
              <PrivateRoute>
                <PushNotification />
              </PrivateRoute>
            }
          />
          <Route
            path="/contactdetails"
            element={
              <PrivateRoute>
                <ContactDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/vendorscharge"
            element={
              <PrivateRoute>
                <VendorsCharge />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <PrivateRoute>
                <Manager />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/:id"
            element={
              <PrivateRoute>
                <ManagerDetails />
              </PrivateRoute>
            }
          />

          {/* Profile settings */}
          <Route
            path="/profilesettings"
            element={
              <PrivateRoute>
                <ProfileSettings />
              </PrivateRoute>
            }
          />

          <Route path="/403" element={<PageForbidden />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  )
}

export default Router
