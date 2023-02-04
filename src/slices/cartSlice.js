const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        // if item already exists in the cart, then increase the cart quantity
        state.cartItems[productIndex].cartQuantity += 1;
      } else {
        // if item dosen't exists in the cart, then add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      // save cart into local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CHANGE_QUANTITY: (state, action) => {
      const { id, quantity } = action.payload;
      const productIndex = state.cartItems.findIndex((item) => item.id === id);

      if (productIndex >= 0) {
        // if item already exists in the cart, then change the cart quantity
        state.cartItems[productIndex].cartQuantity = quantity;
      }

      // save cart into local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART: (state, action) => {
      const updatedCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = updatedCartItem;
      // save cart into local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUB_TOTAL: (state) => {
      const arr = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return arr.push(cartItemAmount);
      });
      state.cartTotalAmount = arr.reduce((a, b) => {
        return a + b;
      }, 0);
    },
    CALCULATE_TOTAL_QUANTITY: (state) => {
      const arr = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return arr.push(quantity);
      });

      state.cartTotalQuantity = arr.reduce((a, b) => {
        return a + b;
      }, 0);
    },
    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    }
  },
});

export const {
  ADD_TO_CART,
  CHANGE_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUB_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;
export default cartSlice.reducer;
