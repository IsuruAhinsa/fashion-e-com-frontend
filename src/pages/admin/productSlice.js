import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	minPrice: null,
	maxPrice: null,
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		SAVE_PRODUCTS: (state, action) => {
			// console.log(action.payload);
            state.products = action.payload;
		},
		GET_PRICE_RANGE: (state, action) => {
			const arr = [];
			action.payload.map((product) => {
				const price = product.price;
				return arr.push(price);
			})
			state.minPrice = Math.min(...arr);
			state.maxPrice = Math.max(...arr);
		}
	},
});

export const { SAVE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions;

export default productSlice.reducer;
