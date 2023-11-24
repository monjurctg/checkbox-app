import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartSize:0,
    bilFromCustomer:0,
  advanceAmount:0


  },
  reducers: {
    setCartSize: (state,{payload}) => {
      state.cartSize = payload
    },
    setBillFromCustomerAction: (state,{payload}) => {
      state.bilFromCustomer = payload
    },
    setAdvanceAmountAction: (state,{payload}) => {
      state.advanceAmount = payload
    },

  }
});

export const { setCartSize,setAdvanceAmountAction,setBillFromCustomerAction } = cartSlice.actions;
export default cartSlice.reducer;

