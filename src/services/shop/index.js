/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import { API_ENDPOINTS } from 'constants'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllShopsList: (status) => {
    return axios.get(API_ENDPOINTS.GET_ALL_SHOPS_LIST, {
      headers: { isAuthRequired: true, 'Content-Type': 'application/json' },
      params: { shop_status: status },
    })
  },
  getAllActiveShopsList: (status) => {
    return axios.get(API_ENDPOINTS.GET_ACTIVE_SHOPS, {
      headers: { isAuthRequired: true, 'Content-Type': 'application/json' },
      params: { shop_status: status },
    })
  },
  getSingleShop: (id) => {
    console.log('GET_SHO_BY_ID', id);
    return axios.get(API_ENDPOINTS.GET_SHO_BY_ID, {
      headers: { isAuthRequired: true, 'Content-Type': 'application/json', path: { id } },

    })
  },
  saveShopImage: (data) => {
    return axios.post(API_ENDPOINTS.SAVE_SHOP_IMAGE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  updateShopDetails: (id, data) => {
    return axios.put(`${API_ENDPOINTS.UPDATE_SHOP}/${id}`, data, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json',
      },
    })
  },
  ShopApproveReject: (id, data) => {
    return axios.put(`${API_ENDPOINTS.APPROVE_REJECT_SHOP}/${id}?status=${data}`, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json'
      },
    })
  },
  saveShopDocImage: (data) => {
    return axios.post(API_ENDPOINTS.SAVE_SHOP_DOC_IMAGE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  updateShopActiveInactive: (id, data) => {
    return axios.put(`${API_ENDPOINTS.UPDATE_SHOP_ACTIVE_INACTIVE}/${id}`, data, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json',
      },
    })
  },
}
