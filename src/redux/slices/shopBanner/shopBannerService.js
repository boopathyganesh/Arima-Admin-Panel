import axios from '../../../utils/axios';

const uploadShopBannerImage = async (formData) => {
    const response = await axios.post(`/shop_banner/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response?.data?.data.filepath;
};

const createShopBanner = async (data) => {
    const response = await axios.post(`/shop_banner`, data);
    return response.data;
};

const getAllShopBanner = async (data) => {
    const response = await axios.get(`/shop_banner`);
    return response.data;
};

const getShopBannerById = async (id) => {
    const response = await axios.get(`/shop_banner/${id}`);
    return response.data;
};

const updateShopBannerById = async (data) => {
    console.log('data', data);
    const response = await axios.put(`/shop_banner/${data.id}`, data);
    return response.data;
};

const updateShopBannerByStatus = async (data) => {
    console.log('data', data);
    const response = await axios.put(`/shop_banner/status/${data.id}`, data);
    return response.data;
};

const deleteShopBannerById = async (data) => {
    const response = await axios.delete(`/shop_banner/${data}`);
    return response.data;
};

const mainBannerService = {
    uploadShopBannerImage,
    createShopBanner,
    getAllShopBanner,
    getShopBannerById,
    updateShopBannerById,
    deleteShopBannerById,
    updateShopBannerByStatus
};

export default mainBannerService;