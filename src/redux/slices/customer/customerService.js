import axios from '../../../utils/axios';

const getAllCustomers = async () => {
    const response = await axios.get(`/customer/all`);
    return response.data;
};

const updateCustomerById = async (data) => {
    const response = await axios.put(`/customer/status/${data?.id}`, data);
    return response.data;
};
const customerService = {
    getAllCustomers,
    updateCustomerById,
};

export default customerService;