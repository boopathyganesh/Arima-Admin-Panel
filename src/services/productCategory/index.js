import axios from 'axios'
import { API_ENDPOINTS } from 'constants';

export default {
    UploadCategoryImage: (data) => {
        return axios.post(API_ENDPOINTS.UPLOAD_CATEGORY_IMAGE, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
    saveProductCategory: (data) => {
        return axios.post(API_ENDPOINTS.PRODUCT_CATEGORY, data, {
            headers: {
                isAuthRequired: true,
                'Content-Type': 'application/json',
            },
        })
    },
    updateProductCategory: (id, data) => {
        return axios.put(`${API_ENDPOINTS.UPDATE_DELETE_PRODUCT_CATEGORY}/${id}`, data, {
            headers: {
                isAuthRequired: true,
                'Content-Type': 'application/json'
            },
        })
    },
    getAllProductCategory: (status) => {
        return axios.get(API_ENDPOINTS.PRODUCT_CATEGORY, {
            headers: { 'Content-Type': 'application/json' },
            params: { categoryStatus: status },
        })
    },
    getProductCategory: (id) => {
        return axios.get(`${API_ENDPOINTS.UPDATE_DELETE_PRODUCT_CATEGORY}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
    },
    getProductCategoryByShopId: (id) => {
        return axios.get(`${API_ENDPOINTS.UPDATE_DELETE_PRODUCT_CATEGORY}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
    },
    ProdcuctCtegoryApproveReject: (id, data) => {
        return axios.put(`${API_ENDPOINTS.APPROVE_REJECT_PRODUCT_CATEGORY}/${id}?categoryStatus=${data}`, {
          headers: {
            isAuthRequired: true,
            'Content-Type': 'application/json'
          },
        })
      },
    removeProductCategory: (id) => {
        return axios.delete(`${API_ENDPOINTS.UPDATE_DELETE_PRODUCT_CATEGORY}/${id}`, {
            headers: {
                isAuthRequired: true,
                'Content-Type': 'application/json',
            },
        })
    },
}