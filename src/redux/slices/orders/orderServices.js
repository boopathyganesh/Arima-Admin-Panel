import axios from '../../../utils/axios';

const getAllOrders = async (data) => {
    const response = await axios.get(`/admin/orders`);
    return response.data;
};

const getOrderByShopId = async (shopId) => {
    const response = await axios.get(`/admin/orders/shop/${shopId}`);
    return response.data;
};

const getProductByShopId = async (data) => {
    console.log('data');
    const response = await axios.get(`/products/${data.shopId}?orderStatus=${data?.status}`,);
    return response.data;
};

const updateProductById = async (data) => {
    const response = await axios.put(`/products/${data.id}`, data);
    return response.data;
};

const orderService = {
    getAllOrders,
    getOrderByShopId,
    // getProductById,
    getProductByShopId,
    updateProductById
};

export default orderService;