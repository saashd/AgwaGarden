import axios from 'axios';
import { Dispatch } from 'redux';
import { getCategoriesFailure, getCategoriesStart, getCategoriesSuccess } from '../reducers/categoriesReducer';
import { getPlantsFailure, getPlantsStart, getPlantsSuccess } from '../reducers/plantsReducer';
import { loginFailure, loginStart, loginSuccess } from '../reducers/userReducer';
import { User } from '../types';


export const fetchPlants = async (dispatch:Dispatch) => {
  dispatch(getPlantsStart());
  try {
    const response = await axios.get('https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/data/catalogs/plants.json');

      dispatch(getPlantsSuccess(response.data.plants));
  } catch (err) {
      dispatch(getPlantsFailure());
  }
};


export const fetchCategories = async (dispatch:Dispatch) => {
  dispatch(getCategoriesStart());
  try {
    const response = await axios.get('https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/data/catalogs/agwafarm.json');
      dispatch(getCategoriesSuccess(response.data.categories));
  } catch (err) {
      dispatch(getCategoriesFailure());
  }
};
export const register = async (dispatch:Dispatch, user:User) => {
  dispatch(loginStart());
  try {
      const res = await axios.post("/auth/register", user);
      const newUser = {username: res.data.username, password: res.data.username};
      dispatch(loginSuccess({...newUser}));
      return false
  } catch (err) {
      dispatch(loginFailure());
      return true
  }
}
export const login = async (dispatch:Dispatch, user: { email: string; password: string; } ) => {
  dispatch(loginStart());
  try {
      const res = await axios.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
      return false
  } catch (err) {
      dispatch(loginFailure());
      return true
  }
};

