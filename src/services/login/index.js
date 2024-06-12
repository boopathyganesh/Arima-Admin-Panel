/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import { API_ENDPOINTS } from 'constants'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login: (data) => {
    return axios.post(API_ENDPOINTS.LOGIN, data, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
}
