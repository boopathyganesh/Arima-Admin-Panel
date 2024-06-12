import axios from 'axios'
import { API_ENDPOINTS } from 'constants';

export default {
    allOrdersByStatus: (status) => {
        return axios.get(API_ENDPOINTS.GET_ALL_ORDERS_BY_STATUS, {
            headers: { 'Content-Type': 'application/json' },
            params: { orderStatus: status },
        })
    }
}