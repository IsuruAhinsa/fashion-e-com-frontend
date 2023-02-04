import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filteredProducts: [],
};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		// sort products
		SORT_PRODUCTS: (state, action) => {
			const { sort, products } = action.payload;
			let tempProducts = [];
			switch (sort) {
				case "newset":
					tempProducts = products;
					break;

				case "lowset-price":
					tempProducts = products.slice().sort((a, b) => {
						return a.price - b.price;
					});
					break;

				case "highest-price":
					tempProducts = products.slice().sort((a, b) => {
						return b.price - a.price;
					});
					break;

				case "a-z":
					tempProducts = products.slice().sort((a, b) => {
						return a.name.localeCompare(b.name);
					});
					break;

				case "z-a":
					tempProducts = products.slice().sort((a, b) => {
						return b.name.localeCompare(a.name);
					});
					break;

				default:
					break;
			}

			state.filteredProducts = tempProducts;
		},
		// search products
		SEARCH_PRODUCTS: (state, action) => {
			const { search, products } = action.payload;
			state.filteredProducts = products.filter((product) =>
				product.name.toLowerCase().includes(search.toLowerCase()) ||
				product.category.toLowerCase().includes(search.toLowerCase())
			);
		},
		FILTER_BY_CATEGORY: (state, action) => {
			const { category, products } = action.payload;
			if (category === "ALL") {
				state.filteredProducts = products;
			} else {
				state.filteredProducts = products.filter((product) =>
					product.category === category
				)
			}
		},
		FILTER_BY_BRAND: (state, action) => {
			const {brand, products} = action.payload;
			if (brand === "ALL") {
				state.filteredProducts = products;
			} else {
				state.filteredProducts = products.filter((product) => 
					product.brand === brand
				)
			}
		},
		FILTER_BY_PRICE: (state, action) => {
			const {price, products} = action.payload;
			state.filteredProducts = products.filter((product) => product.price <= price);
		}
	},
});

export const { SORT_PRODUCTS, SEARCH_PRODUCTS, FILTER_BY_CATEGORY, FILTER_BY_BRAND, FILTER_BY_PRICE } = filterSlice.actions;
export default filterSlice.reducer;
