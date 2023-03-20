import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: {},
        defaultPlantsSelection :[],
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
            state.data = {};
            state.error = false;
            state.isFetching = false;
        },
    
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
} = userSlice.actions;
export default userSlice.reducer;
