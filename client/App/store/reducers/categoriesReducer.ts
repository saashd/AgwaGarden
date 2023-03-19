import {createSlice} from "@reduxjs/toolkit";


const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
      data: [],
      isFetching: false,
      error: false,
  },
  reducers: {
      //GET ALL
      getCategoriesStart: (state) => {
          state.isFetching = true;
          state.error = false;
      },
      getCategoriesSuccess: (state, action) => {
          state.isFetching = false;
          state.data = action.payload;
      },
      getCategoriesFailure: (state) => {
          state.isFetching = false;
          state.error = true;
      },
  },
});

export const {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure
} = categoriesSlice.actions;
export default categoriesSlice.reducer;