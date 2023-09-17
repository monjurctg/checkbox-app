import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "counter",
  initialState: {
    detailsBottomSheet: false,
    customerSelectedDistricts: {},

    customerSelectedThana: {},
    customerRoad: "",
  },
  reducers: {
    setDetailsBottomSheet: (state, { payload }) => {
      state.detailsBottomSheet = payload;
    },
    setSelectDistricts: (state, { payload }) => {
      // console.log(payload, "payload");
      state.customerSelectedDistricts = payload;
    },
    setThana: (state, { payload }) => {
      state.customerSelectedThana = payload;
    },
  },
});

export const { setDetailsBottomSheet, setSelectDistricts, setThana } =
  authSlice.actions;
export default authSlice.reducer;
