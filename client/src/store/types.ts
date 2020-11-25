import {
  USER_SET_DATA,
  USER_SET_LOADING,
  USER_SET_ERROR,
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
} from './consts';

// USER
type userSetData = {
  type: typeof USER_SET_DATA,
  userData: any
}

type userSetLoading = {
  type: typeof USER_SET_LOADING,
  loading: boolean
}

type userSetError = {
  type: typeof USER_SET_ERROR,
  error: string
}

export type userAction = userSetData |
  userSetLoading |
  userSetError


// RECIPE
type recipeSetCategories = {
  type: typeof RECIPE_SET_CATEGOIES,
  categories: Category[]
}

type recipeAddRecipes = {
  type: typeof RECIPE_ADD_RECIPES,
  recipes: any[]
}

type recipeSetFilter = {
  type: typeof RECIPE_SET_FILTER,
  filter: string
}

type recipeSetLoading = {
  type: typeof RECIPE_SET_LOADING,
  loading: boolean
}

type recipeStepBack = {
  type: typeof RECIPE_STEP_BACK
}

type recipeStepNext = {
  type: typeof RECIPE_STEP_NEXT
}

type recipeClearForFetch = {
  type: typeof RECIPE_CLEAR_FOR_FETCH
}

type recipeSetOneRecipe = {
  type: typeof RECIPE_SET_ONE_RECIPE,
  recipe: any
}

type recipeAddCommentToRecipe = {
  type: typeof RECIPE_ADD_COMMENT_TO_RECEPT,
  comment: Comment
}

type recipeDeleteComment = {
  type: typeof RECIPE_DELETE_COMMENT,
  commentId: string
}

type recipeDeleteRecipe = {
  type: typeof RECIPE_DELETE_RECIPE,
  recipeId: string
}

type recipeSetRecipes = {
  type: typeof RECIPE_SET_RECIPES,
  recipes: RecipeCard[],
  count: number
}

export type recipeAction = recipeSetCategories |
  recipeAddRecipes |
  recipeSetFilter |
  recipeSetLoading |
  recipeSetRecipes |
  recipeStepBack |
  recipeStepNext |
  recipeClearForFetch |
  recipeSetOneRecipe |
  recipeAddCommentToRecipe |
  recipeDeleteComment |
  recipeDeleteRecipe



// Classes
export type User = {
  nickname: string,
  status: number,
  id: string
}

export type Category = {
  id: string
  name: string
  description: string
}

export type RecipeCard = {
  id: number
  name: string
  photo_path: string
  description: string
  category_id: number
  author_id: number
  creat_date: string
}

export type Recipe = {
  id: number,
  name: string,
  description: string,
  creat_date: string,
  photo_path: string,
  nickname: string,
  category_name: string
}

export type Ingridients = {
  id: number,
  recipe_id: number,
  title: string
}

export type Comment = {
  id: number
  content: string
  nickname: string
  create_time: string
}

export type RecipeInfo = {
  recipe: {
    id: number,
    name: string,
    description: string,
    creat_date: string,
    photo_path: string,
    nickname: string,
    category_name: string
  },
  ingridients: Ingridients[],
  comments: Comment[]
}
