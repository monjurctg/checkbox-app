import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import utilsSlice from './reducers/utilsSlice';
import cartSlice from './reducers/cartSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    utils:utilsSlice,
    cart:cartSlice
  }
});

export default store;
