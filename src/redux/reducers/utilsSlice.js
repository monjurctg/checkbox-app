import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'counter',
  initialState: {
    detailsBottomSheet:false
  },
  reducers: {
    setDetailsBottomSheet: (state,{payload}) => {
      state.detailsBottomSheet = payload
    },
   
  }
});

export const { setDetailsBottomSheet } = authSlice.actions;
export default authSlice.reducer;

