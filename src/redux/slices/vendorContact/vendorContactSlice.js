import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vendorContactService from "./vendorContactService";

const initialState = {
    vendorContacts: [],
    currentVendorContact: [],
    currentVendorContactLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};

export const createVendorContact = createAsyncThunk("vendorContact/create", async (data, thunkAPI) => {
    console.log('dataslice', data);
    try {
        return await vendorContactService.createVendorContact(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllVendorContact = createAsyncThunk("vendorContact/get/all", async (data, thunkAPI) => {
    try {
        return await vendorContactService.getAllVendorContact(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getVendorContactId = createAsyncThunk("vendorContact/get/id", async (data, thunkAPI) => {
    try {
        return await vendorContactService.getVendorContactId(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});



export const updateVendorContactById = createAsyncThunk("vendorContact/update", async (data, thunkAPI) => {
    try {
        const newData = await vendorContactService.updateVendorContactById(data);

        if (newData) {
            thunkAPI.dispatch(getAllVendorContact());
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

export const deleteVendorContactById = createAsyncThunk("vendorContact/delte", async (data, thunkAPI) => {
    console.log('datadata', data);
    try {
        const newData = await vendorContactService.deleteVendorContactById(data);

        if (newData) {
            thunkAPI.dispatch(getAllVendorContact());
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




const vendorContactSlice = createSlice({
    name: "vendorContact",
    initialState,
    reducers: {
        resetVendorContact: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createVendorContact.pending, (state) => {
                state.currentVendorContactLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(createVendorContact.fulfilled, (state, action) => {
                state.currentVendorContactLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.data;
            })
            .addCase(createVendorContact.rejected, (state, action) => {
                state.currentVendorContactLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getAllVendorContact.pending, (state) => {
                state.currentVendorContactLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllVendorContact.fulfilled, (state, action) => {
                state.currentVendorContactLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.vendorContacts = action.payload.data;
                state.successMessage = "";
                state.currentVendorContact = ""
            })
            .addCase(getAllVendorContact.rejected, (state, action) => {
                state.currentVendorContactLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getVendorContactId.pending, (state) => {
                state.currentVendorContactLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getVendorContactId.fulfilled, (state, action) => {
                state.currentVendorContactLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentVendorContact = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getVendorContactId.rejected, (state, action) => {
                state.currentVendorContactLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateVendorContactById.pending, (state) => {
                state.currentVendorContactLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateVendorContactById.fulfilled, (state, action) => {
                state.currentVendorContactLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateVendorContactById.rejected, (state, action) => {
                state.currentVendorContactLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(deleteVendorContactById.pending, (state) => {
                state.currentVendorContactLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(deleteVendorContactById.fulfilled, (state, action) => {
                state.currentVendorContactLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(deleteVendorContactById.rejected, (state, action) => {
                state.currentVendorContactLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            });
    },
});

export const { resetVendorContact } = vendorContactSlice.actions;
export default vendorContactSlice.reducer;