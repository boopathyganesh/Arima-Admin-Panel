import axios from 'axios'
import { API_ENDPOINTS } from 'constants'

export default {
  saveShopBannerImage: (data) => {
    return axios.post(API_ENDPOINTS.UPLOAD_SHOP_BANNER_IMAGE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  saveShopBanner: (data) => {
    return axios.post(API_ENDPOINTS.CREATE_SHOP_BANNER, data, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json',
      },
    })
  },

  getAllShopBanner: () => {
    return axios.get(API_ENDPOINTS.GET_ALL_SHOP_BANNER, {
      headers: { isAuthRequired: true, 'Content-Type': 'application/json' },
    })
  },

  getShopBanner: (id) => {
    return axios.get(`${API_ENDPOINTS.GET_SHOP_BANNER_BY_ID}/${id}`, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json',
        path: { id },
      },
    })
  },

  updateShopBanner: (id, data) => {
    return axios.put(`${API_ENDPOINTS.UPDATE_SHOP_BANNER}/${id}`, data, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json'
      },
    })
  },

  removeShopBanner: (id) => {
    return axios.delete(`${API_ENDPOINTS.UPDATE_SHOP_BANNER}/${id}`, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json'
      },
    })
  },

}
