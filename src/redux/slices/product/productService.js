import axios from '../../../utils/axios';

const uploadProductImage = async (formData) => {
    const response = await axios.post(`/products/products_image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response?.data?.data.filepath;
};

const uploadProductImages = async (formData) => {
    const response = await axios.post(`/products/products_images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response?.data;
};

const addProduct = async (data) => {
    const response = await axios.post(`/products`, data);
    return response.data;
};


const getAllProducts = async (data) => {
    const response = await axios.get(`/products?product_status=${data}`);
    return response.data;
};

const getProductById = async (productId) => {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
};

const getProductByShopId = async (data) => {
    const response = await axios.get(`/products/${data.shopId}?product_status=${data?.status}`,);
    return response.data;
};

const getAllProductsByShop = async (data) => {
    const response = await axios.get(`/admin/product/shop/${data}`,);
    return response.data;

};

const updateProductById = async (data) => {
    const response = await axios.put(`/products/${data.id}`, data);
    return response.data;
};

const productService = {
    uploadProductImages,
    uploadProductImage,
    getAllProducts,
    getProductById,
    getProductByShopId,
    updateProductById,
    getAllProductsByShop,
    addProduct
};

export default productService;