import {combineReducers} from 'redux'
import userStore from './user/reducer';
import recipeStore from './recipe/reducer';

const rootReducer = combineReducers({
  user: userStore,
  recipe: recipeStore
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>