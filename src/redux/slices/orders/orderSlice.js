import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderServices";

const initialState = {
    orders: [],
    currentOrder: [],
    currentOrderByshop: [],
    ordersByshop: [],
    orderLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};

export const getAllOrders = createAsyncThunk("orders/get/all", async (data, thunkAPI) => {
    try {
        return await orderService.getAllOrders(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getOrderByShopId = createAsyncThunk("orders/get/Shopid", async (data, thunkAPI) => {
    try {
        return await orderService.getOrderByShopId(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getProductByShopId = createAsyncThunk("orders/get/shopid", async (shopId, thunkAPI) => {
    try {
        return await orderService.getProductByShopId(shopId);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateProductByid = createAsyncThunk("orders/update", async (data, thunkAPI) => {
    try {
        const newData = await orderService.updateProductById(data);

        if (newData) {
            thunkAPI.dispatch(getAllOrders());
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



const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrder: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.orderLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.orders = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.orderLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getOrderByShopId.pending, (state) => {
                state.orderLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getOrderByShopId.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.ordersByshop = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getOrderByShopId.rejected, (state, action) => {
                state.orderLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateProductByid.pending, (state) => {
                state.orderLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateProductByid.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateProductByid.rejected, (state, action) => {
                state.orderLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getProductByShopId.pending, (state) => {
                state.orderLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getProductByShopId.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = '';
                state.shopProducts = action.payload.data;
            })
            .addCase(getProductByShopId.rejected, (state, action) => {
                state.orderLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
    },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;