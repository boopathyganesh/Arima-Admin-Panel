import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
    products: [],
    image: '',
    productImages: [],
    currentProduct: [],
    shopProducts: [],
    allShopProducts: [],
    productLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};

export const uploadProductImage = createAsyncThunk("product/uploadImage", async (data, thunkAPI) => {
    try {
        return await productService.uploadProductImage(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const uploadProductImages = createAsyncThunk("product/uploadImages", async (data, thunkAPI) => {
    try {
        return await productService.uploadProductImages(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const addProduct = createAsyncThunk("product/add", async (data, thunkAPI) => {
    try {
        return await productService.addProduct(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllProducts = createAsyncThunk("products/get/all", async (data, thunkAPI) => {
    try {
        return await productService.getAllProducts(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getProductById = createAsyncThunk("products/get/id", async (productId, thunkAPI) => {
    try {
        return await productService.getProductById(productId);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getProductByShopId = createAsyncThunk("products/get/shopid", async (data, thunkAPI) => {
    try {
        return await productService.getProductByShopId(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllProductsByShop = createAsyncThunk("allproducts/get/shop", async (data, thunkAPI) => {
    try {
        return await productService.getAllProductsByShop(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateProductByid = createAsyncThunk("product/update", async (data, thunkAPI) => {
    try {
        const newData = await productService.updateProductById(data);

        if (newData) {
            if (data?.updateStatus) {
                thunkAPI.dispatch(getAllProductsByShop(data?.shopId));
                return newData;
            } else {
                thunkAPI.dispatch(getAllProducts());
                return newData;
            }

        } else {
            const message = "Something Went Wrong In product";
            return thunkAPI.rejectWithValue(message);
        }
    } catch (error) {
        const message = (error && error.response.data) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});



const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        resetProduct: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.productLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.productLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.productLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getProductById.pending, (state) => {
                state.productLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.productLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentProduct = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.productLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(addProduct.pending, (state) => {
                state.productLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                console.log('action.payload', action.payload.data);
                state.productLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload.data;
                state.successMessage = ""
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.productLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateProductByid.pending, (state) => {
                state.productLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateProductByid.fulfilled, (state, action) => {
                state.productLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateProductByid.rejected, (state, action) => {
                state.productLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getProductByShopId.pending, (state) => {
                state.productLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getProductByShopId.fulfilled, (state, action) => {
                state.productLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = '';
                state.shopProducts = action.payload.data;
            })
            .addCase(getProductByShopId.rejected, (state, action) => {
                state.productLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getAllProductsByShop.pending, (state) => {
                state.productLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllProductsByShop.fulfilled, (state, action) => {
                state.productLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = '';
                state.allShopProducts = action.payload.data;
            })
            .addCase(getAllProductsByShop.rejected, (state, action) => {
                state.productLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(uploadProductImage.pending, (state) => {
                state.productLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(uploadProductImage.fulfilled, (state, action) => {
                state.productLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.image = action?.payload?.data?.filepath;
                state.successMessage = action.payload.message;
            })
            .addCase(uploadProductImage.rejected, (state, action) => {
                state.productLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(uploadProductImages.pending, (state) => {
                state.productLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(uploadProductImages.fulfilled, (state, action) => {
                console.log('action?.payload', action?.payload);
                state.productLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.productImages = action?.payload?.data?.filepath;
                state.successMessage = action.payload.message;
            })
            .addCase(uploadProductImages.rejected, (state, action) => {
                state.productLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
    },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;