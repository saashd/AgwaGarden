import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: {email:null,
        password:null,
        onboarding:null,
        default_plants_selection:[]
    },
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
            state.data = {email:null,
            password:null,
            onboarding:null,
            default_plants_selection:[]
        };
            state.error = false;
            state.isFetching = false;
        },
        updateDefaultSelection:(state,action)=>{
            state.data={...state.data, default_plants_selection:action.payload}
        }
    
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateDefaultSelection
} = userSlice.actions;
export default userSlice.reducer;
