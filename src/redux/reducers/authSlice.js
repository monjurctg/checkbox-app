import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'counter',
  initialState: {
    auth: false,
    user:null
  },
  reducers: {
    setAuth: (state,{payload}) => {
      state.auth = payload
    },
    setUser: (state) => {
      state.user=payload
    }
  }
});

export const { setAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
