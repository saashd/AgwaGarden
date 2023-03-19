import {createSlice} from "@reduxjs/toolkit";


const plantsSlice = createSlice({
  name: "plants",
  initialState: {
      data: [],
      isFetching: false,
      error: false,
  },
  reducers: {
      //GET ALL
      getPlantsStart: (state) => {
          state.isFetching = true;
          state.error = false;
      },
      getPlantsSuccess: (state, action) => {
          state.isFetching = false;
          state.data = action.payload;
      },
      getPlantsFailure: (state) => {
          state.isFetching = false;
          state.error = true;
      },
  },
});

export const {
  getPlantsStart,
  getPlantsSuccess,
  getPlantsFailure
} = plantsSlice.actions;
export default plantsSlice.reducer;
