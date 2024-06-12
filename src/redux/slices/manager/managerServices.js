import axios from '../../../utils/axios';

const uploadManagerImage = async (formData) => {
    const response = await axios.post(`/admin/manager/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response?.data?.data.filepath;
};

const addManager = async (data) => {
    const response = await axios.post(`/admin/manager`, data);
    return response.data;
};

const getAllManagers = async (data) => {
    const response = await axios.get(`/admin/manager`);
    return response.data;
};

const getManagerById = async (id) => {
    const response = await axios.get(`/admin/manager/${id}`);
    return response.data;
};

const updateManagerById = async (data) => {
    const response = await axios.put(`/admin/manager/${data._id}`, data);
    return response.data;
};

const deleteManagerById = async (data) => {
    const response = await axios.get(`/admin/manager/${data.shopId}?orderStatus=${data?.status}`,);
    return response.data;
};


const managerService = {
    uploadManagerImage,
    addManager,
    getAllManagers,
    getManagerById,
    updateManagerById,
    deleteManagerById
};

export default managerService;