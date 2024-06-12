import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
    coupons: [],
    currentCoupon: [],
    couponLoading: false,
    successMessage: '',
    errorMessage: '',
    isError: false,
    isSuccess: false,
};

export const createCoupon = createAsyncThunk("coupon/create", async (data, thunkAPI) => {
    console.log('dataslice', data);
    try {
        return await couponService.createCoupon(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllCoupons = createAsyncThunk("coupon/get/all", async (data, thunkAPI) => {
    try {
        return await couponService.getAllCoupons(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});

export const getCouponById = createAsyncThunk("coupon/get/id", async (data, thunkAPI) => {
    try {
        return await couponService.getCouponById(data);
    } catch (error) {
        const message = (error && error.response);
        return thunkAPI.rejectWithValue(message);
    }
});



export const updateCouponById = createAsyncThunk("coupon/update", async (data, thunkAPI) => {
    try {
        const newData = await couponService.updateCouponById(data);

        if (newData) {
            thunkAPI.dispatch(getAllCoupons());
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

export const deleteCouponById = createAsyncThunk("coupon/delte", async (data, thunkAPI) => {
    console.log('datadata', data);
    try {
        const newData = await couponService.deleteCouponById(data);

        if (newData) {
            thunkAPI.dispatch(getAllCoupons());
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




const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        resetCoupon: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCoupon.pending, (state) => {
                state.couponLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.couponLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.data;
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.couponLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getAllCoupons.pending, (state) => {
                state.couponLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllCoupons.fulfilled, (state, action) => {
                state.couponLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.coupons = action.payload.data;
                state.successMessage = "";
                state.currentCoupon = ""
            })
            .addCase(getAllCoupons.rejected, (state, action) => {
                state.couponLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getCouponById.pending, (state) => {
                state.couponLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getCouponById.fulfilled, (state, action) => {
                state.couponLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentCoupon = action.payload.data;
                state.successMessage = ""
            })
            .addCase(getCouponById.rejected, (state, action) => {
                state.couponLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(updateCouponById.pending, (state) => {
                state.couponLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateCouponById.fulfilled, (state, action) => {
                state.couponLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(updateCouponById.rejected, (state, action) => {
                state.couponLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(deleteCouponById.pending, (state) => {
                state.couponLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(deleteCouponById.fulfilled, (state, action) => {
                state.couponLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.successMessage = action.payload.message;
            })
            .addCase(deleteCouponById.rejected, (state, action) => {
                state.couponLoading = false;
                state.errorMessage = "An Error Occured While Updating an Admin";
                state.isError = true;
                state.isSuccess = false;
            });
    },
});

export const { resetCoupon } = couponSlice.actions;
export default couponSlice.reducer;