import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "counter",
  initialState: {
    detailsBottomSheet: false,
    customerSelectedDistricts: {},

    customerSelectedThana: {},
    customerRoad: "",
    tabShow:true,
    filterCategories:[],
    sortState:"Best Seller"
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
    },
    setFilterCategories:(state,{payload})=>{
      state.filterCategories =[...state.filterCategories,payload]
    },
    removeFilteCategoriens :(state,{payload})=>{
      const newData = state.filterCategories.filter(f=>f!=payload)
      state.filterCategories = newData
    },
    setSortState :(state,{payload})=>{
      state.sortState=payload
    }
  },
});

export const { setDetailsBottomSheet, setSelectDistricts,setSortState, setThana,setTabShow,setFilterCategories,removeFilteCategoriens } =
  authSlice.actions;
export default authSlice.reducer;
