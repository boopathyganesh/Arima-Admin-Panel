import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import managerService from "./managerServices";

const initialState = {
    managers: [],
    image: '',
    currentManager: [],
    managerLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};

export const uploadManagerFile = createAsyncThunk("managers/uploadFile", async (data, thunkAPI) => {
    try {
        return await managerService.uploadManagerImage(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const addManager = createAsyncThunk("managers/add", async (data, thunkAPI) => {
    try {
        return await managerService.addManager(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});


export const getAllManagers = createAsyncThunk("managers/get/all", async (data, thunkAPI) => {
    try {
        return await managerService.getAllManagers(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getManagerById = createAsyncThunk("manager/get/id", async (id, thunkAPI) => {
    console.log('vvvvvvv', id);
    try {
        return await managerService.getManagerById(id);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateManagerById = createAsyncThunk("managers/updateById", async (data, thunkAPI) => {
    try {
        const newData = await managerService.updateManagerById(data);

        if (newData) {
            thunkAPI.dispatch(getAllManagers());
            return newData;
        } else {
            const message = "Something Went Wrong In Manger";
            return thunkAPI.rejectWithValue(message);
        }
    } catch (error) {
        const message = (error && error.response.data) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const deleteManagerById = createAsyncThunk("managers/delteById", async (data, thunkAPI) => {
    try {
        const newData = await managerService.deleteManagerById(data);

        if (newData) {
            thunkAPI.dispatch(getAllManagers());
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


const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
        resetManager: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllManagers.pending, (state) => {
                state.managerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllManagers.fulfilled, (state, action) => {
                state.managerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.managers = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getAllManagers.rejected, (state, action) => {
                state.managerLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getManagerById.pending, (state) => {
                state.managerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getManagerById.fulfilled, (state, action) => {
                state.managerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentManager = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getManagerById.rejected, (state, action) => {
                state.managerLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateManagerById.pending, (state) => {
                state.managerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateManagerById.fulfilled, (state, action) => {
                state.managerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateManagerById.rejected, (state, action) => {
                state.managerLoading = false;
                state.errorMessage = "An Error Occurred While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(deleteManagerById.pending, (state) => {
                state.managerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(deleteManagerById.fulfilled, (state, action) => {
                state.managerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(deleteManagerById.rejected, (state, action) => {
                state.managerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })


            .addCase(uploadManagerFile.pending, (state) => {
                state.managerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(uploadManagerFile.fulfilled, (state, action) => {
                state.managerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.image = action?.payload?.data?.filepath;
                state.successMessage = action.payload.message;
            })
            .addCase(uploadManagerFile.rejected, (state, action) => {
                state.managerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })

    },
});

export const { resetManager } = managerSlice.actions;
export default managerSlice.reducer;