import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	email: null,
	username: null,
	userId: null,
	avatar: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		SET_ACTIVE_USER: (state, action) => {
			state.isLoggedIn = true;
            state.email = action.payload.email;
            state.username = action.payload.displayName;
            state.userId = action.payload.uid;
			state.avatar = action.payload.photoURL;
		},
		REMOVE_ACTIVE_USER: (state) => {
			state.isLoggedIn = false;
			state.email = null;
			state.username = null;
			state.userId = null;
			state.avatar = null;
		}
	},
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export default authSlice.reducer;
