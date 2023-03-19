import { combineReducers } from 'redux';
import plantsReducer from './plantsReducer';
import categoriesReducer from './categoriesReducer';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  plants: plantsReducer,
  categories: categoriesReducer,
});

export default rootReducer;
