import {
  RECIPE_SET_CATEGOIES,
  RECIPE_ADD_RECIPES,
  RECIPE_SET_FILTER,
  RECIPE_SET_LOADING,
  RECIPE_SET_RECIPES,
  RECIPE_STEP_BACK,
  RECIPE_STEP_NEXT,
  RECIPE_CLEAR_FOR_FETCH,
  RECIPE_SET_ONE_RECIPE,
  RECIPE_ADD_COMMENT_TO_RECEPT,
  RECIPE_DELETE_COMMENT,
  RECIPE_DELETE_RECIPE
} from '../consts';
import {
  Category,
  recipeAction,
  RecipeInfo
} from '../types';

type RecipeStore = {
  categories: Category[]
  recipes: any[]
  filter: string
  loading: boolean
  step: number
  recipesCount: number
  oneRecipe: RecipeInfo | null
}

const recipeFilters = {
  'dated': 'dated',
  'dateu': 'dateu',
  'named': 'named',
  'nameu': 'nameu'
}


const initialState = {
  categories: [],
  recipes: [],
  loading: false,
  filter: 'dateu',
  step: 0,
  recipesCount: 0,
  oneRecipe: null
}

export default function (state: RecipeStore = initialState, action: recipeAction): RecipeStore {
  switch (action.type) {

    case RECIPE_SET_CATEGOIES:
      return { ...state, categories: action.categories };

    case RECIPE_SET_FILTER:
      return { ...state, filter: action.filter };

    case RECIPE_SET_LOADING:
      return { ...state, loading: action.loading };

    case RECIPE_ADD_RECIPES:
      return { ...state };

    case RECIPE_SET_RECIPES:
      return { ...state, recipes: action.recipes, recipesCount: action.count };

    case RECIPE_STEP_NEXT:
      return { ...state, step: state.step + 1 };

    case RECIPE_STEP_BACK:
      return { ...state, step: state.step - 1 };

    case RECIPE_CLEAR_FOR_FETCH:
      return { ...state, step: 0 };

    case RECIPE_SET_ONE_RECIPE:
      return { ...state, oneRecipe: action.recipe };

    case RECIPE_DELETE_COMMENT:
      const oldOneRecipe = state.oneRecipe;
      if(oldOneRecipe) {
        oldOneRecipe.comments = oldOneRecipe?.comments.filter((c) => c.id != +action.commentId);
        return {...state, oneRecipe: {...oldOneRecipe}};
      }
      return { ...state};

    case RECIPE_DELETE_RECIPE:
      const oneRecipe = state.oneRecipe;
      if(oneRecipe) {
        return {...state, oneRecipe: null};
      }
      return { ...state};

    case RECIPE_ADD_COMMENT_TO_RECEPT:
      if (!state.oneRecipe) {
        return state;
      } else {
        const oldOneRecipe = state.oneRecipe;
        oldOneRecipe.comments.push(action.comment);
        return { ...state, oneRecipe: Object.assign({}, oldOneRecipe) };
      }

    default:
      return state;
  }
}