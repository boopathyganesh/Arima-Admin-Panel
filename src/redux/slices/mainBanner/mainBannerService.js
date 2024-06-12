import axios from '../../../utils/axios';

const uploadMainBannerImage = async (formData) => {
    const response = await axios.post(`/main_banner/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response?.data?.data.filepath;
};

const createMainBanner = async (data) => {
    const response = await axios.post(`/main_banner`, data);
    return response.data;
};

const getAllMainBanner = async (data) => {
    const response = await axios.get(`/main_banner`);
    return response.data;
};

const getMainBannerById = async (id) => {
    const response = await axios.get(`/main_banner/${id}`);
    return response.data;
};

const updateMainBannerById = async (data) => {
    console.log('data', data);
    const response = await axios.put(`/main_banner/${data.id}`, data);
    return response.data;
};

const updateMainBannerByStatus = async (data) => {
    console.log('data', data);
    const response = await axios.put(`/main_banner/status/${data.id}`, data);
    return response.data;
};

const deleteMainBannerById = async (data) => {
    const response = await axios.delete(`/main_banner/${data}`);
    return response.data;
};

const mainBannerService = {
    uploadMainBannerImage,
    createMainBanner,
    getAllMainBanner,
    getMainBannerById,
    updateMainBannerById,
    deleteMainBannerById,
    updateMainBannerByStatus
};

export default mainBannerService;