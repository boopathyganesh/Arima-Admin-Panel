import axios from '../../../utils/axios';


const createCustomerContact = async (data) => {
    const response = await axios.post(`/admin/customerContact`, data);
    return response.data;
};

const getAllCustomerContact = async (data) => {
    const response = await axios.get(`/admin/customerContact`);
    return response.data;
};

const getCustomerContactById = async (id) => {
    const response = await axios.get(`/admin/customerContact/${id}`);
    return response.data;
};

const updateCustomerContactById = async (data) => {
    const response = await axios.put(`/admin/customerContact/${data._id}`, data);
    console.log('response', response.data);
    return response.data;
};

const deleteCustomerContactById = async (data) => {
    const response = await axios.delete(`/admin/customerContact/${data}`);
    return response.data;
};

const customerContactService = {
    createCustomerContact,
    getAllCustomerContact,
    getCustomerContactById,
    updateCustomerContactById,
    deleteCustomerContactById
};

export default customerContactService;