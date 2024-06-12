export const envUrl = 'http://localhost:8014/api/'
//export const envUrl = process.env.REACT_APP_API_KEY;
// export const envUrl = process.env.REACT_APP_LOCALAPI_KEY;
export const imageUrl = process.env.REACT_APP_IMAGE_BASE_URL;

console.log('envUrl', envUrl);

export const API_ENDPOINTS = {
  LOGIN: `${envUrl}admin/user/login`,

  // Shop
  GET_ALL_SHOPS_LIST: `${envUrl}admin/shop/aprovalReject`,
  GET_SHO_BY_ID: `${envUrl}/vendor/:id`,
  SAVE_SHOP_IMAGE: `${envUrl}/vendor/shop_image`,
  UPDATE_SHOP: `${envUrl}/vendor`,
  APPROVE_REJECT_SHOP: `${envUrl}/vendor/approval`,
  SAVE_SHOP_DOC_IMAGE: `${envUrl}/uploads/vendor/documents`,
  GET_ACTIVE_SHOPS: `${envUrl}vendor/activeShops`,
  UPDATE_SHOP_ACTIVE_INACTIVE: `${envUrl}/vendor/status`,

  // Products
  GET_ALL_PRODUCTS_LIST: `${envUrl}products`,
  GET_PRODUCT_BY_ID: `${envUrl}products`,

  APPROVE_REJECT_PRODUCT: `${envUrl}products/approval`,
  GET_PRODUCT_BY_CATEGORY_ID: `${envUrl}products/category`,
  GET_PRODUCT_BY_SHOP_ID: `${envUrl}products/shop`,
  UPDATE_DELETE_PRODUCT: `${envUrl}products`,

  // Product category
  UPLOAD_CATEGORY_IMAGE: `${envUrl}product_category/upload`,
  PRODUCT_CATEGORY: `${envUrl}product_category`,
  UPDATE_DELETE_PRODUCT_CATEGORY: `${envUrl}product_category`,
  SAVE_PRODUCT_IMAGE: `${envUrl}uploads/master/products`,
  APPROVE_REJECT_PRODUCT_CATEGORY: `${envUrl}product_category/approval`,

  //  Product sub category
  PRODUCT_SUB_CATEGORY: `${envUrl}/product_subcategory`,
  UPDATE_PRODUCT_SUB_CATEGORY: `${envUrl}/product_subcategory/:id`,


  // MANAGERIMAGE UPLOAD
  UPLOAD_ADMIN_MANAGER_IMAGE: `${envUrl}/admin/manager/upload`,

  /*
   * Module : Coupon
   * Created By : Soundhar S
   * Created At : 22-11-2023
   */
  COUPON: `${envUrl}/coupon`,
  UPDATE_COUPON: `${envUrl}/coupon/:id`,


  // CUSTOMERS API'S
  GET_ALL_CUSTOMERS: `${envUrl}customer/all`,

  // ORDERS API'S
  GET_ALL_ORDERS_BY_STATUS: `${envUrl}/admin/orders`

}

export const ACTION_TYPES = {
  SHOW_SNACKBAR: 'SHOW_SNACKBAR',
  HIDE_SNACKBAR: 'HIDE_SNACKBAR',
  SHOW_LOADER: 'SHOW_LOADER',
  HIDE_LOADER: 'HIDE_LOADER',
  AUTH: 'AUTH',
  MENU_TOGGLE: 'MENU_TOGGLE',
  PROFILE_SETTINGS: 'PROFILE_SETTINGS',
};

export const CONS = {}
