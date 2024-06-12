import axios from 'axios'
import { API_ENDPOINTS } from 'constants';

export default {
    getAllCustomers: (status) => {
        return axios.get(API_ENDPOINTS.GET_ALL_CUSTOMERS, {
            headers: { 'Content-Type': 'application/json' }
        })
    },
}