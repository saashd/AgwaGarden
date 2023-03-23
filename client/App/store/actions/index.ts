import axios from "axios";
import { SetStateAction } from "react";
import { AnyAction, Dispatch } from "redux";
import {
  getCategoriesFailure,
  getCategoriesStart,
  getCategoriesSuccess,
} from "../reducers/categoriesReducer";
import {
  getPlantsFailure,
  getPlantsStart,
  getPlantsSuccess,
} from "../reducers/plantsReducer";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../reducers/userReducer";
import { User } from "../types";

export const fetchPlants = async (dispatch: Dispatch) => {
  dispatch(getPlantsStart());
  try {
    const response = await axios.get(
      "https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/data/catalogs/plants.json"
    );
    dispatch(getPlantsSuccess(response.data.plants));
  } catch (err: any) {
    dispatch(getPlantsFailure());
    return err.message;
  }
};

export const fetchCategories = async (dispatch: Dispatch) => {
  dispatch(getCategoriesStart());
  try {
    const response = await axios.get(
      "https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/data/catalogs/agwafarm.json"
    );
    dispatch(getCategoriesSuccess(response.data.categories));
  } catch (err: any) {
    dispatch(getCategoriesFailure());
    return err.message;
  }
};
export const register = async (dispatch: Dispatch, user: User) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/register", user);
    dispatch(loginSuccess({ ...res.data }));
  } catch (err: any) {
    dispatch(loginFailure());
    return err.message;
  }
};
export const login = async (
  dispatch: Dispatch,
  user: { email: string; password: string }
) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err: any) {
    dispatch(loginFailure());
    return err.message;
  }
};

// Periodically check for updates.
export const startPollingData = () => (dispatch: Dispatch) => {
  console.log("startPollingData");
  setInterval(() => {
    fetchPlants(dispatch);
    fetchCategories(dispatch);
  }, 300000); // fetch data every 5 minutes (300000 ms)
};
