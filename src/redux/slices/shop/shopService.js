import axios from '../../../utils/axios';

const getAllActiveShops = async (data) => {
    const response = await axios.get(`vendor/activeShops?shop_status=${data}`);
    return response.data;
};

const uploadOwnerImage = async (formData) => {
    const response = await axios.post(`vendor/shop_profile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response?.data?.data.filepath;
};

const uploadShopImage = async (formData) => {
    const response = await axios.post(`vendor/shop_image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response?.data?.data.filepath;
};

const uploadDocumentsImage = async (formData) => {
    const response = await axios.post(`vendor/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response?.data?.data.filepath;
};

const createShop = async (data) => {
    const response = await axios.post(`vendor/add`, data);
    return response.data;
};

const getShopById = async (id) => {
    const response = await axios.get(`vendor/${id}`);
    return response.data;
};

const updateShopApproval = async (data) => {
    const response = await axios.put(`vendor/approval/${data?.id}?status=${data?.status}`);
    return response.data;
};

const updateShopById = async (data) => {
    const response = await axios.put(`vendor/${data?.id}`, data);
    return response.data;
};


const shopService = {
    getAllActiveShops,
    getShopById,
    updateShopApproval,
    uploadOwnerImage,
    uploadShopImage,
    uploadDocumentsImage,
    createShop,
    updateShopById
};

export default shopService;