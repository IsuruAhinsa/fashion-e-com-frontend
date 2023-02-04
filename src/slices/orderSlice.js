import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  orderAmount: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    SAVE_ORDERS: (state, action) => {
      state.orderHistory = action.payload;
    },
    TOTAL_ORDER_AMOUNT: (state) => {
      const arr = [];
      state.orderHistory.map((item) => {
        const { orderAmount } = item;
        return arr.push(orderAmount);
      });

      state.orderAmount = arr.reduce((a, b) => {
        return a + b;
      }, 0);
    },
  },
});

export const { SAVE_ORDERS, TOTAL_ORDER_AMOUNT } = orderSlice.actions;
export default orderSlice.reducer;
