
import { configureStore } from '@reduxjs/toolkit';
import { fastfood } from './reducers';

const store = configureStore({
	reducer: {
		fastfood: fastfood.reducer,
	},
});


export default store;

