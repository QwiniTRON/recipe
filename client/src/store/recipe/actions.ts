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

export const recipesOnPage = 4;
const defaultHost = 'http://localhost';

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
function getReicpesUrl(filter: string, offset: number, limit: number, category_id?: number, search?: string) {
  const url = new URL('/api/recipe/all', defaultHost);
  url.searchParams.append('filter', filter);
  url.searchParams.append('limit', String(limit));
  url.searchParams.append('offset', String(offset));
  if (category_id) url.searchParams.append('category_id', String(category_id));
  if (search) url.searchParams.append('search', search);

  return url;
}

// async
export function getCategories() {
  return async function (dispatch: Function, getStete: Function) {
    try {
      const categoriesReq = await Req.get('/api/recipe/categories');
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
      const url = getReicpesUrl(state.recipe.filter, state.recipe.step * recipesOnPage, recipesOnPage, category_id, search);

      // загружаем
      dispatch(recipeSetLoading(true));
      dispatch(recipeClearForFetch());
      const recipesReq = await Req.get(url.pathname + url.search);
      
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
      const url = getReicpesUrl(state.recipe.filter, (state.recipe.step + 1) * recipesOnPage, recipesOnPage, category_id, search);

      // загружаем
      dispatch(recipeSetLoading(true));
      const recipesReq = await Req.get(url.pathname + url.search);

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
      const url = getReicpesUrl(state.recipe.filter, (state.recipe.step - 1) * recipesOnPage, recipesOnPage, category_id, search);

      // загружаем
      dispatch(recipeSetLoading(true));
      const recipesReq = await Req.get(url.pathname + url.search);

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
      const url = new URL('/api/recipe/one/' + recipeId, defaultHost);

      dispatch(recipeSetLoading(true));
      const recipeReq = await Req.get(url.pathname + url.search);


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
      const url = new URL('/api/recipe/comment', defaultHost);

      const commentReq = await Req.post(url.pathname + url.search, {
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
      const deleteCommentReq = await Req.post('/api/recipe/delete/comment', {
        commentId
      });
      if(deleteCommentReq.ok) {
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
      const deleteCommentReq = await Req.post('/api/recipe/delete/recipe', {
        recipeId
      });
      if(deleteCommentReq.ok) {
        dispatch(recipeDeleteRecipe(recipeId));
        return true;
      }

    } catch (err) {
      console.log(err);
    }
  }
}