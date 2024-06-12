import axios from '../../../utils/axios';

const getAllProductCategory = async (data) => {
    const response = await axios.get(`/admin/productCategory?categoryStatus=${data}`);
    return response.data;
};

const getProductCategoryById = async (data) => {
    const response = await axios.get(`/product_category/${data.id}`);
    return response.data;
};

const getProductCategoryByShopId = async (data) => {
    const response = await axios.get(`/product_category/${data.shopId}?categoryStatus=${data?.status}`,);
    return response.data;
};

const getAllProductCategoriesByShop = async (shopId) => {
    const response = await axios.get(`/admin/productCategory/shop/${shopId}`,);
    return response.data;
};

const updateProductCategoryById = async (data) => {
    const response = await axios.put(`/admin/productCategory/${data.id}`, data);
    return response.data;
};

const deleteProductCategoryById = async (data) => {
    const response = await axios.delete(`/product_category/${data.id}`);
    return response.data;
};

const productService = {
    getAllProductCategory,
    getProductCategoryById,
    getProductCategoryByShopId,
    updateProductCategoryById,
    deleteProductCategoryById,
    getAllProductCategoriesByShop
};

export default productService;