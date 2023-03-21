import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      _id: null,
      first_name: "",
      last_name: "",
      email: "",
      password: null,
      onboarding: null,
      default_plants_selection: [],
    },
    defaultSelectionUpdateStatus: false,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.data = {
        _id: null,
        first_name: "",
        last_name: "",
        email: "",
        password: null,
        onboarding: null,
        default_plants_selection: [],
      };
      state.error = false;
      state.isFetching = false;
    },
    updateDefaultSelection: (state, action) => {
      state.data = { ...state.data, default_plants_selection: action.payload };
      state.defaultSelectionUpdateStatus = true;
    },
    updateDefaultSelectionStatus: (state, action) => {
      state.defaultSelectionUpdateStatus = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateDefaultSelection,
  updateDefaultSelectionStatus,
} = userSlice.actions;
export default userSlice.reducer;
