import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import utilsSlice from './reducers/utilsSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    utils:utilsSlice
  }
});

export default store;
