import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerContactService from "./customerContactService";

const initialState = {
    customerContacts: [],
    currentCustomerContact: [],
    currentCustomerLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};

export const createCustomerContact = createAsyncThunk("customerContact/create", async (data, thunkAPI) => {
    console.log('dataslice', data);
    try {
        return await customerContactService.createCustomerContact(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllCustomerContact = createAsyncThunk("customerContact/get/all", async (data, thunkAPI) => {
    try {
        return await customerContactService.getAllCustomerContact(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getCustomerContactId = createAsyncThunk("customerContact/get/id", async (data, thunkAPI) => {
    try {
        return await customerContactService.getCustomerContactById(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});



export const updateCustomerContactById = createAsyncThunk("customerContact/update", async (data, thunkAPI) => {
    try {
        const newData = await customerContactService.updateCustomerContactById(data);

        if (newData) {
            thunkAPI.dispatch(getAllCustomerContact());
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

export const deleteCustomerContactById = createAsyncThunk("customerContact/delte", async (data, thunkAPI) => {
    console.log('datadata', data);
    try {
        const newData = await customerContactService.deleteCustomerContactById(data);

        if (newData) {
            thunkAPI.dispatch(getAllCustomerContact());
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




const customerContactSlice = createSlice({
    name: "customerContact",
    initialState,
    reducers: {
        resetCustomerContact: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCustomerContact.pending, (state) => {
                state.currentCustomerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(createCustomerContact.fulfilled, (state, action) => {
                state.currentCustomerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.data;
            })
            .addCase(createCustomerContact.rejected, (state, action) => {
                state.currentCustomerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getAllCustomerContact.pending, (state) => {
                state.currentCustomerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllCustomerContact.fulfilled, (state, action) => {
                state.currentCustomerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.customerContacts = action.payload.data;
                state.successMessage = "";
                state.currentCustomerContact = ""
            })
            .addCase(getAllCustomerContact.rejected, (state, action) => {
                state.currentCustomerLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getCustomerContactId.pending, (state) => {
                state.currentCustomerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getCustomerContactId.fulfilled, (state, action) => {
                state.currentCustomerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentCustomerContact = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getCustomerContactId.rejected, (state, action) => {
                state.currentCustomerLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateCustomerContactById.pending, (state) => {
                state.currentCustomerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateCustomerContactById.fulfilled, (state, action) => {
                state.currentCustomerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateCustomerContactById.rejected, (state, action) => {
                state.currentCustomerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(deleteCustomerContactById.pending, (state) => {
                state.currentCustomerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(deleteCustomerContactById.fulfilled, (state, action) => {
                state.currentCustomerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(deleteCustomerContactById.rejected, (state, action) => {
                state.currentCustomerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            });
    },
});

export const { resetCustomerContact } = customerContactSlice.actions;
export default customerContactSlice.reducer;