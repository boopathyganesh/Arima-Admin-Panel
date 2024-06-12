import axios from '../../../utils/axios';

const createVendorContact = async (data) => {
    const response = await axios.post(`/admin/vendorContact`, data);
    return response.data;
};

const getAllVendorContact = async (data) => {
    const response = await axios.get(`/admin/vendorContact`);
    return response.data;
};

const getVendorContactId = async (id) => {
    const response = await axios.get(`/admin/vendorContact/${id}`);
    return response.data;
};

const updateVendorContactById = async (data) => {
    const response = await axios.put(`/admin/vendorContact/${data._id}`, data);
    console.log('response', response.data);
    return response.data;
};

const deleteVendorContactById = async (data) => {
    const response = await axios.delete(`/admin/vendorContact/${data}`);
    return response.data;
};

const vendorContactService = {
    createVendorContact,
    getAllVendorContact,
    getVendorContactId,
    updateVendorContactById,
    deleteVendorContactById
};

export default vendorContactService;