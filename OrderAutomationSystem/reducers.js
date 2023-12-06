import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: [],
	total: 0,
};

export const fastfood = createSlice({
	name: 'fastfood',
	initialState,
	reducers: {
		pay(state, action) {
			state.cart = [];
			state.total = 0;
		},
		addToCart(state, action) {
			const itemID = action.payload.id;
			const productPrice = action.payload.price;
			state.cart.push(itemID);
			state.total += productPrice;
		},
		removeFromCart(state, action) {
			const itemID = action.payload.id;
			const productPrice = action.payload.price;

			const indexToRemove = state.cart.indexOf(itemID);

			if (indexToRemove !== -1) {
				state.cart.splice(indexToRemove, 1);
				state.total -= productPrice;
			}
		},
	},
});

export const { addToCart, removeFromCart, pay } = fastfood.actions;

export default fastfood.reducer;
