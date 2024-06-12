import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";

const initialState = {
    productCategories: [],
    currentProductCategory: [],
    shopProductCategory: [],
    allShopProductCategories: [],
    productCategoryLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};

export const getAllProductCategory = createAsyncThunk("productCategory/get/all", async (data, thunkAPI) => {
    try {
        return await productCategoryService.getAllProductCategory(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getProductCategoryById = createAsyncThunk("productCategory/get/id", async (_, thunkAPI) => {
    try {
        return await productCategoryService.getProductCategoryById();
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getProductCategoryByShopId = createAsyncThunk("productCategory/get/shopid", async (data, thunkAPI) => {
    try {
        return await productCategoryService.getProductCategoryByShopId(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllProductCategoriesByShop = createAsyncThunk("allProductCategory/get/shop", async (shopId, thunkAPI) => {
    try {
        return await productCategoryService.getAllProductCategoriesByShop(shopId);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateProductCategoryById = createAsyncThunk("productCategory/update", async (data, thunkAPI) => {
    console.log('data?.categoryStatus', data);
    try {
        const newData = await productCategoryService.updateProductCategoryById(data);
        if (newData) {
            if (data?.updateStatus) {
                thunkAPI.dispatch(getAllProductCategoriesByShop(data?.shopId));
                return newData;
            } else {
                thunkAPI.dispatch(getAllProductCategory(data?.categoryStatus));
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

export const deleteProductCategoryByid = createAsyncThunk("productCategory/delete", async (data, thunkAPI) => {
    try {
        const newData = await productCategoryService.deleteProductCategoryById(data);

        if (newData) {
            thunkAPI.dispatch(getAllProductCategory());
            return newData;
        } else {
            const message = "Something Went Wrong In product";
            return thunkAPI.rejectWithValue(message);
        }
    } catch (error) {
        const message = (error && error.response.data) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});



const productCategorySlice = createSlice({
    name: "productCategory",
    initialState,
    reducers: {
        resetProductCategory: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductCategory.pending, (state) => {
                state.productCategoryLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllProductCategory.fulfilled, (state, action) => {
                state.productCategoryLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.productCategories = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getAllProductCategory.rejected, (state, action) => {
                state.productCategoryLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getProductCategoryById.pending, (state) => {
                state.productCategoryLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getProductCategoryById.fulfilled, (state, action) => {
                state.productCategoryLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentProductCategory = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getProductCategoryById.rejected, (state, action) => {
                state.productCategoryLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateProductCategoryById.pending, (state) => {
                state.productCategoryLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateProductCategoryById.fulfilled, (state, action) => {
                state.productCategoryLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateProductCategoryById.rejected, (state, action) => {
                state.productCategoryLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getProductCategoryByShopId.pending, (state) => {
                state.productCategoryLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getProductCategoryByShopId.fulfilled, (state, action) => {
                state.productCategoryLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = '';
                state.shopProductCategory = action.payload.data;
            })
            .addCase(getProductCategoryByShopId.rejected, (state, action) => {
                state.productCategoryLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getAllProductCategoriesByShop.pending, (state) => {
                state.productCategoryLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllProductCategoriesByShop.fulfilled, (state, action) => {
                state.productCategoryLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = '';
                state.allShopProductCategories = action.payload.data;
            })
            .addCase(getAllProductCategoriesByShop.rejected, (state, action) => {
                state.productCategoryLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(deleteProductCategoryByid.pending, (state) => {
                state.productCategoryLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(deleteProductCategoryByid.fulfilled, (state, action) => {
                state.productCategoryLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(deleteProductCategoryByid.rejected, (state, action) => {
                state.productCategoryLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
    },
});

export const { resetProductCategory } = productCategorySlice.actions;
export default productCategorySlice.reducer;