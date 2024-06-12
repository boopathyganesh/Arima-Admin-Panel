import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shopBannerService from "./shopBannerService";

const initialState = {
    shopBanners: [],
    currentShopBanner: [],
    shopBannerLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};

export const uploadShopBannerImage = createAsyncThunk("shopBanner/Imgcreate", async (data, thunkAPI) => {
    try {
        return await shopBannerService.uploadShopBannerImage(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const createShopBanner = createAsyncThunk("shopBanner/create", async (data, thunkAPI) => {
    console.log('dataslice', data);
    try {
        return await shopBannerService.createShopBanner(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllShopBanner = createAsyncThunk("shopBanner/get/all", async (data, thunkAPI) => {
    try {
        return await shopBannerService.getAllShopBanner(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getShopBannerById = createAsyncThunk("shopBanner/get/id", async (data, thunkAPI) => {
    try {
        return await shopBannerService.getShopBannerById(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateShopBannerById = createAsyncThunk("shopBanner/update", async (data, thunkAPI) => {
    console.log('datadata', data);
    try {
        const newData = await shopBannerService.updateShopBannerById(data);

        if (newData) {
            thunkAPI.dispatch(getAllShopBanner());
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

export const updateShopBannerByStatus = createAsyncThunk("shopBanner/updateStatus", async (data, thunkAPI) => {
    console.log('datadata', data);
    try {
        const newData = await shopBannerService.updateShopBannerByStatus(data);

        if (newData) {
            thunkAPI.dispatch(getAllShopBanner());
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

export const deleteShopBannerById = createAsyncThunk("shopBanner/delte", async (data, thunkAPI) => {
    console.log('datadata', data);
    try {
        const newData = await shopBannerService.deleteShopBannerById(data);

        if (newData) {
            thunkAPI.dispatch(getAllShopBanner());
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

const shopBannerSlice = createSlice({
    name: "shopBanner",
    initialState,
    reducers: {
        resetShopBanner: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createShopBanner.pending, (state) => {
                state.shopBannerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(createShopBanner.fulfilled, (state, action) => {
                state.shopBannerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.data;
            })
            .addCase(createShopBanner.rejected, (state, action) => {
                state.shopBannerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getAllShopBanner.pending, (state) => {
                state.shopBannerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllShopBanner.fulfilled, (state, action) => {
                state.shopBannerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.shopBanners = action.payload.data;
                state.successMessage = "";
                state.currentShopBanner = ""
            })
            .addCase(getAllShopBanner.rejected, (state, action) => {
                state.shopBannerLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getShopBannerById.pending, (state) => {
                state.shopBannerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getShopBannerById.fulfilled, (state, action) => {
                state.shopBannerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentShopBanner = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getShopBannerById.rejected, (state, action) => {
                state.shopBannerLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateShopBannerById.pending, (state) => {
                state.shopBannerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateShopBannerById.fulfilled, (state, action) => {
                state.shopBannerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateShopBannerById.rejected, (state, action) => {
                state.shopBannerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(deleteShopBannerById.pending, (state) => {
                state.shopBannerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(deleteShopBannerById.fulfilled, (state, action) => {
                state.shopBannerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(deleteShopBannerById.rejected, (state, action) => {
                state.shopBannerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            });
    },
});

export const { resetShopBanner } = shopBannerSlice.actions;
export default shopBannerSlice.reducer;