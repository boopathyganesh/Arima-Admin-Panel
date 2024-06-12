import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mainBannerService from "./mainBannerService";

const initialState = {
    mainBanners: [],
    currentMainBanner: [],
    mainBannerLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};

export const uploadMainBannerImage = createAsyncThunk("mainBanner/Imgcreate", async (data, thunkAPI) => {
    console.log('dataslice', data);
    try {
        return await mainBannerService.uploadMainBannerImage(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const createMainBanner = createAsyncThunk("mainBanner/create", async (data, thunkAPI) => {
    console.log('dataslice', data);
    try {
        return await mainBannerService.createMainBanner(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllMainBanner = createAsyncThunk("mainBanner/get/all", async (data, thunkAPI) => {
    try {
        return await mainBannerService.getAllMainBanner(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getMainBannerById = createAsyncThunk("mainBanner/get/id", async (data, thunkAPI) => {
    try {
        return await mainBannerService.getMainBannerById(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateMainBannerById = createAsyncThunk("mainBanner/update", async (data, thunkAPI) => {
    console.log('datadata', data);
    try {
        const newData = await mainBannerService.updateMainBannerById(data);

        if (newData) {
            thunkAPI.dispatch(getAllMainBanner());
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

export const updateMainBannerByStatus = createAsyncThunk("mainBanner/updateStatus", async (data, thunkAPI) => {
    console.log('datadata', data);
    try {
        const newData = await mainBannerService.updateMainBannerByStatus(data);

        if (newData) {
            thunkAPI.dispatch(getAllMainBanner());
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

export const deleteMainBannerById = createAsyncThunk("mainBanner/delte", async (data, thunkAPI) => {
    console.log('datadata', data);
    try {
        const newData = await mainBannerService.deleteMainBannerById(data);

        if (newData) {
            thunkAPI.dispatch(getAllMainBanner());
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

const mainBannerSlice = createSlice({
    name: "mainBanner",
    initialState,
    reducers: {
        resetMainBanner: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMainBanner.pending, (state) => {
                state.mainBannerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(createMainBanner.fulfilled, (state, action) => {
                state.mainBannerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.data;
            })
            .addCase(createMainBanner.rejected, (state, action) => {
                state.mainBannerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getAllMainBanner.pending, (state) => {
                state.mainBannerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllMainBanner.fulfilled, (state, action) => {
                state.mainBannerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.mainBanners = action.payload.data;
                state.successMessage = "";
                state.currentMainBanner = ""
            })
            .addCase(getAllMainBanner.rejected, (state, action) => {
                state.mainBannerLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getMainBannerById.pending, (state) => {
                state.mainBannerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getMainBannerById.fulfilled, (state, action) => {
                state.mainBannerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentMainBanner = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getMainBannerById.rejected, (state, action) => {
                state.mainBannerLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateMainBannerById.pending, (state) => {
                state.mainBannerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateMainBannerById.fulfilled, (state, action) => {
                state.mainBannerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateMainBannerById.rejected, (state, action) => {
                state.mainBannerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(deleteMainBannerById.pending, (state) => {
                state.mainBannerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(deleteMainBannerById.fulfilled, (state, action) => {
                state.mainBannerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(deleteMainBannerById.rejected, (state, action) => {
                state.mainBannerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            });
    },
});

export const { resetMainBanner } = mainBannerSlice.actions;
export default mainBannerSlice.reducer;