import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	quantity: 0,
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload];
			state.quantity++;
		},
		removeFromBasket: (state, action) => {
			const index = state.items.findIndex((item) => {
				return item.id === action.payload;
			});

			let newBasket = [...state.items];

			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(`Cannot remove product as its not in the basket`);
			}

			state.items = newBasket;
			state.quantity--;
		},
	},
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
	state.basket.items.reduce((total, item) => total + item.price, 0);
export const selectQuantity = (state) => state.basket.quantity;

export default basketSlice.reducer;
