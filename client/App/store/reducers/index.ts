import { combineReducers } from 'redux';
import plantsReducer from './plantsReducer';
import categoriesReducer from './categoriesReducer';
import userReducer from './userReducer';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  plants: plantsReducer,
  categories: categoriesReducer,
  user:userReducer
});

export default rootReducer;
