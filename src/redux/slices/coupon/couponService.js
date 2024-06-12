import axios from '../../../utils/axios';


const createCoupon = async (data) => {
    const response = await axios.post(`/admin/coupon`, data);
    return response.data;
};

const getAllCoupons = async (data) => {
    const response = await axios.get(`/admin/coupon`);
    return response.data;
};

const getCouponById = async (id) => {
    const response = await axios.get(`/admin/coupon/${id}`);
    return response.data;
};

const updateCouponById = async (data) => {
    const response = await axios.put(`/admin/coupon/${data.id}`, data);
    console.log('response', response.data);
    return response.data;
};

const deleteCouponById = async (data) => {
    const response = await axios.delete(`/admin/coupon/${data}`);
    return response.data;
};

const orderService = {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCouponById,
    deleteCouponById
};

export default orderService;