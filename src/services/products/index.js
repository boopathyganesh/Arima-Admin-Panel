/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import { API_ENDPOINTS } from 'constants'

// PRODUCTS
export default {
  saveProductImage: (data) => {
    return axios.post(API_ENDPOINTS.SAVE_PRODUCT_IMAGE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  getAllProdcutsList: (status) => {
    return axios.get(API_ENDPOINTS.GET_ALL_PRODUCTS_LIST, {
      headers: { isAuthRequired: true, 'Content-Type': 'application/json' },
      params: { product_status: status },
    })
  },

  getProductById: (id) => {
    return axios.get(`${API_ENDPOINTS.GET_PRODUCT_BY_ID}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
  },
  getProductByCategoryId: (id) => {
    return axios.get(`${API_ENDPOINTS.GET_PRODUCT_BY_CATEGORY_ID}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
  },
  getProductByShopId: (id, status) => {
    return axios.get(`${API_ENDPOINTS.GET_PRODUCT_BY_SHOP_ID}/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      params: { product_status: status },
    })
  },
  ProdcuctApproveReject: (id, data) => {
    return axios.put(`${API_ENDPOINTS.APPROVE_REJECT_PRODUCT}/${id}?status=${data}`, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json'
      },
    })
  },
  updateProduct: (id, data) => {
    return axios.put(`${API_ENDPOINTS.UPDATE_DELETE_PRODUCT}/${id}`, data, {
        headers: {
            isAuthRequired: true,
            'Content-Type': 'application/json'
        },
    })
},
}
