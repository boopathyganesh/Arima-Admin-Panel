/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import { API_ENDPOINTS } from 'constants'

/* eslint-disable-next-line import/no-anonymous-default-export */
export default {


  /** Coupon API  **/

  /* 
   * Get all Coupon lists  
   */
    getAllCoupon: () => {
        return axios.get(API_ENDPOINTS.COUPON, {
            headers: { isAuthRequired: true, 'Content-Type': 'application/json' },
        })
    },

  /* 
   * Create the Coupon 
   */
  saveCoupon: (data) => {
    return axios.post(API_ENDPOINTS.COUPON, data, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json',
      },
    })
  },


  /* 
   * Update the Coupon  
   */
    updateCoupon: (id, data) => {
        return axios.put(API_ENDPOINTS.UPDATE_COUPON, data, {
          headers: {
            isAuthRequired: true,
            'Content-Type': 'application/json',
            path: { id },
          },
        })
      },

  /* 
   * Get Coupon by requested ID  
   */
  getCoupon: (id) => {
    return axios.get(API_ENDPOINTS.UPDATE_COUPON, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json',
        path: { id },
      },
    })
  },

  /* 
   * remove coupon by requested ID 
   */

  removeCoupon: (id) => {
    return axios.delete(API_ENDPOINTS.UPDATE_COUPON, {
      headers: {
        isAuthRequired: true,
        'Content-Type': 'application/json',
        path: { id },
      },
    })
  },


}
