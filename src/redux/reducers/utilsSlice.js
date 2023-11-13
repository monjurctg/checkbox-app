import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "counter",
  initialState: {
    detailsBottomSheet: false,
    customerSelectedDistricts: {},

    customerSelectedThana: {},
    customerRoad: "",
    tabShow:true
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
    setTabShow:(state,{payload})=>{
      state.tabShow=payload
    }
  },
});

export const { setDetailsBottomSheet, setSelectDistricts, setThana,setTabShow } =
  authSlice.actions;
export default authSlice.reducer;
