import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shopService from "./shopService";

const initialState = {
    shops: [],
    image: '',
    currentShop: [],
    shopLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};

export const createShop = createAsyncThunk("create/shop", async (data, thunkAPI) => {
    try {
        return await shopService.createShop(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllActiveShops = createAsyncThunk("shop/get/all", async (data, thunkAPI) => {
    try {
        return await shopService.getAllActiveShops(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getShopById = createAsyncThunk("shop/get/id", async (id, thunkAPI) => {
    try {
        return await shopService.getShopById(id);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateShopApproval = createAsyncThunk("shopApproval/update", async (data, thunkAPI) => {
    try {
        return await shopService.updateShopApproval(data);
    } catch (error) {
        const message = (error && error.response.data) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateShopByid = createAsyncThunk("shop/update", async (data, thunkAPI) => {
    try {
        return await shopService.updateShopById(data);
    } catch (error) {
        const message = (error && error.response.data) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const uploadOwnerImage = createAsyncThunk("ownerImage/upload", async (data, thunkAPI) => {
    try {
        return await shopService.uploadOwnerImage(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const uploadShopImage = createAsyncThunk("shopImage/upload", async (data, thunkAPI) => {
    try {
        return await shopService.uploadShopImage(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const uploadDocumentImage = createAsyncThunk("shopDocument/upload", async (data, thunkAPI) => {
    try {
        return await shopService.uploadDocumentsImage(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

const shopSlice = createSlice({
    name: "shops",
    initialState,
    reducers: {
        resetShop: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllActiveShops.pending, (state) => {
                state.shopLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllActiveShops.fulfilled, (state, action) => {
                state.shopLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.shops = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getAllActiveShops.rejected, (state, action) => {
                state.shopLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getShopById.pending, (state) => {
                state.shopLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getShopById.fulfilled, (state, action) => {
                state.shopLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentShop = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getShopById.rejected, (state, action) => {
                state.shopLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateShopApproval.pending, (state) => {
                state.shopLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateShopApproval.fulfilled, (state, action) => {
                state.shopLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateShopApproval.rejected, (state, action) => {
                state.shopLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateShopByid.pending, (state) => {
                state.shopLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateShopByid.fulfilled, (state, action) => {
                state.shopLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateShopByid.rejected, (state, action) => {
                state.shopLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(uploadOwnerImage.pending, (state) => {
                state.shopLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(uploadOwnerImage.fulfilled, (state, action) => {
                state.shopLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.image = action?.payload?.data?.filepath;
                state.successMessage = action.payload.message;
            })
            .addCase(uploadOwnerImage.rejected, (state, action) => {
                state.shopLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(uploadShopImage.pending, (state) => {
                state.shopLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(uploadShopImage.fulfilled, (state, action) => {
                state.shopLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.image = action?.payload?.data?.filepath;
                state.successMessage = action.payload.message;
            })
            .addCase(uploadShopImage.rejected, (state, action) => {
                state.shopLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(uploadDocumentImage.pending, (state) => {
                state.shopLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(uploadDocumentImage.fulfilled, (state, action) => {
                state.shopLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.image = action?.payload?.data?.filepath;
                state.successMessage = action.payload.message;
            })
            .addCase(uploadDocumentImage.rejected, (state, action) => {
                state.shopLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(createShop.pending, (state) => {
                state.shopLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(createShop.fulfilled, (state, action) => {
                console.log('action.payload.data', action.payload);
                state.shopLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.data;
            })
            .addCase(createShop.rejected, (state, action) => {
                state.shopLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
    },
});

export const { resetShop } = shopSlice.actions;
export default shopSlice.reducer;