import axios from 'axios';
import { Dispatch } from 'redux';
import { getCategoriesFailure, getCategoriesStart, getCategoriesSuccess } from '../reducers/categoriesReducer';
import { getPlantsFailure, getPlantsStart, getPlantsSuccess } from '../reducers/plantsReducer';


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

