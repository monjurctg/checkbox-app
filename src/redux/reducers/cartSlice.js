import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartSize:0
  },
  reducers: {
    setCartSize: (state,{payload}) => {
      state.cartSize = payload
    },
   
  }
});

export const { setCartSize } = cartSlice.actions;
export default cartSlice.reducer;

