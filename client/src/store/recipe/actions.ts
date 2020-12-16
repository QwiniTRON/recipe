import {
  RECIPE_SET_CATEGOIES,
  RECIPE_SET_LOADING,
  RECIPE_SET_FILTER,
  RECIPE_ADD_RECIPES,
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
  Comment,
  recipeAction
} from '../types';
import { Req } from '../../req/Req';
import { RootState } from '../main';
import {
  categoryUrl,
  commentUrl,
  recipeUrl
} from '../endpoints';


export const recipesOnPage = 4;


export function recipeSetLoading(loading: boolean): recipeAction {
  return {
    type: RECIPE_SET_LOADING,
    loading
  }
}


export function recipeDeleteComment(commentId: string): recipeAction {
  return {
    type: RECIPE_DELETE_COMMENT,
    commentId
  }
}


export function recipeDeleteRecipe(recipeId: string): recipeAction {
  return {
    type: RECIPE_DELETE_RECIPE,
    recipeId
  }
}


export function recipeSetOneRecipe(recipe: any): recipeAction {
  return {
    type: RECIPE_SET_ONE_RECIPE,
    recipe
  }
}


export function recipeAddCommentToRecipe(comment: Comment): recipeAction {
  return {
    type: RECIPE_ADD_COMMENT_TO_RECEPT,
    comment
  }
}


export function recipeStepBack(): recipeAction {
  return {
    type: RECIPE_STEP_BACK,
  }
}


export function recipeClearForFetch(): recipeAction {
  return {
    type: RECIPE_CLEAR_FOR_FETCH,
  }
}


export function recipeStepNext(): recipeAction {
  return {
    type: RECIPE_STEP_NEXT,
  }
}


export function recipeSetFilter(filter: string): recipeAction {
  return {
    type: RECIPE_SET_FILTER,
    filter
  }
}


export function recipeSetCategories(categories: Category[]): recipeAction {
  return {
    type: RECIPE_SET_CATEGOIES,
    categories
  }
}


export function recipeSetRecipes(recipes: any[], count: number): recipeAction {
  return {
    type: RECIPE_SET_RECIPES,
    recipes,
    count
  }
}



// utils
type SearchCreaterValues = {
  [prop: string]: any
}
function createQuery(searchValues: SearchCreaterValues) {
  const searcher = new URLSearchParams();

  for (const [key, value] of Object.entries(searchValues)) {
    searcher.append(key, value);
  }

  return searcher.toString();
}



// async
export function getCategories() {
  return async function (dispatch: Function, getStete: Function) {
    try {
      const categoriesReq = await Req.get(categoryUrl);
      if (categoriesReq.ok) {
        dispatch(recipeSetCategories(categoriesReq.categories));
      } else {
        console.log('Some wrong with categories');
      }
    } catch (err) {
      console.log(err);
    }
  }
}


export function getRecipes(
  search?: string,
  category_id?: number
) {
  return async function (dispatch: Function, getState: Function) {
    const state: RootState = getState();

    try {
      // формируем строку запроса
      const queryParams = {
        filter: JSON.stringify({ filter: state.recipe.filter, category_id: category_id }),
        offset: state.recipe.step * recipesOnPage,
        limit: recipesOnPage,
        search: search
      }
      const query = createQuery(queryParams);

      // загружаем
      dispatch(recipeSetLoading(true));
      dispatch(recipeClearForFetch());
      const recipesReq = await Req.get(recipeUrl + `?${query}`);

      if (recipesReq.ok) {
        dispatch(recipeSetRecipes(recipesReq.recipes, recipesReq.count));
      }


    } catch (err) {
      console.log(err);
    } finally {
      dispatch(recipeSetLoading(false));
    }
  }
}


export function getRecipesNext(
  search?: string,
  category_id?: number
) {
  return async function (dispatch: Function, getState: Function) {
    const state: RootState = getState();

    try {
      // формируем строку запроса
      const queryParams = {
        filter: JSON.stringify({ filter: state.recipe.filter, category_id: category_id }),
        offset: (state.recipe.step + 1) * recipesOnPage,
        limit: recipesOnPage,
        search: search
      }
      const query = createQuery(queryParams);

      // загружаем
      dispatch(recipeSetLoading(true));
      const recipesReq = await Req.get(recipeUrl + `?${query}`);

      if (recipesReq.ok) {
        dispatch(recipeSetRecipes(recipesReq.recipes, recipesReq.count));
        dispatch(recipeStepNext());
      }


    } catch (err) {
      console.log(err);
    } finally {
      dispatch(recipeSetLoading(false));
    }
  }
}


export function getRecipesBack(
  search?: string,
  category_id?: number
) {
  return async function (dispatch: Function, getState: Function) {
    const state: RootState = getState();

    try {
      // формируем строку запроса
      const queryParams = {
        filter: JSON.stringify({ filter: state.recipe.filter, category_id: category_id }),
        offset: (state.recipe.step - 1) * recipesOnPage,
        limit: recipesOnPage,
        search: search
      }
      const query = createQuery(queryParams);

      // загружаем
      dispatch(recipeSetLoading(true));
      const recipesReq = await Req.get(recipeUrl + `?${query}`);

      if (recipesReq.ok) {
        dispatch(recipeSetRecipes(recipesReq.recipes, recipesReq.count));
        dispatch(recipeStepBack());
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(recipeSetLoading(false));
    }
  }
}


export function getOneRecipe(
  recipeId: string
) {
  return async function (dispatch: Function, getState: Function) {
    try {
      dispatch(recipeSetLoading(true));
      const recipeReq = await Req.get(recipeUrl + `/${recipeId}`);

      if (recipeReq.ok) {
        dispatch(recipeSetOneRecipe(recipeReq.data));
      }

    } catch (err) {
      console.log(err);
    } finally {
      dispatch(recipeSetLoading(false));
    }
  }
}


export function createComment(
  recipeId: string,
  text: string
) {
  return async function (dispatch: Function, getState: Function) {
    try {
      const commentReq = await Req.post(commentUrl, {
        text,
        recipeId
      });

      if (commentReq.ok) {
        dispatch(recipeAddCommentToRecipe(commentReq.comment));
      }
      return commentReq.ok;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}


export function deleteComment(commentId: string) {
  return async function (dispatch: Function, getStete: Function) {
    try {
      const deleteCommentReq = await Req.delete(commentUrl + `/${commentId}`, {});
      if (deleteCommentReq.ok) {
        dispatch(recipeDeleteComment(commentId));
        return true;
      }

    } catch (err) {
      console.log(err);
    }
  }
}


export function deleteRecipe(recipeId: string) {
  return async function (dispatch: Function, getStete: Function) {
    try {
      const deleteCommentReq = await Req.delete(recipeUrl + `/${recipeId}`, {});
      if (deleteCommentReq.ok) {
        dispatch(recipeDeleteRecipe(recipeId));
        return true;
      }

    } catch (err) {
      console.log(err);
    }
  }
}