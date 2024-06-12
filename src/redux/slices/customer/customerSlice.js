import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerContactService from "./customerService";

const initialState = {
    allcustomers: [],
    currentCustomer: [],
    customerLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};


export const getAllCustomers = createAsyncThunk("customer/get/all", async (_, thunkAPI) => {
    try {
        return await customerContactService.getAllCustomers();
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateCustomerById = createAsyncThunk("customer/updateStatus", async (data, thunkAPI) => {
    try {
        const newData = await customerContactService.updateCustomerById(data);
        if (newData) {
            thunkAPI.dispatch(getAllCustomers());
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

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        resetCustomer: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCustomers.pending, (state) => {
                state.customerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.customerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.allcustomers = action.payload.data;
                state.successMessage = "";
                state.currentCustomer = ""
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.customerLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateCustomerById.pending, (state) => {
                state.customerLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateCustomerById.fulfilled, (state, action) => {
                state.customerLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateCustomerById.rejected, (state, action) => {
                state.customerLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
    },
});

export const { resetCustomer } = customerSlice.actions;
export default customerSlice.reducer;