import db from '../db/connect';
import { Comment } from './comment';

const recipeFilters: { [p: string]: any } = {
  'dated': 'creat_date asc',
  'dateu': 'creat_date desc',
  'named': 'name asc',
  'nameu': 'name desc'
}

export type ShortRecipe = {
  id: number,
  name: string,
  photo_path: string,
  description: string,
  category_id: number,
  author_id: number,
  creat_date: string
}

export type Ingridient = {
  id: string
  recipe_id: string
  title: string
}

export const recipeFiltersDictionary = {
  'dated': 'dated',
  'dateu': 'dateu',
  'named': 'named',
  'nameu': 'nameu'
}


export class Recipe {
  public comments: Comment[];
  public ingridients: Ingridient[];
  public recipe: ShortRecipe;

  constructor(comments: Comment[], ingridients: Ingridient[], recipe: ShortRecipe) {
    this.comments = comments;
    this.ingridients = ingridients;
    this.recipe = recipe;
  }
}

export class RecipeModel {

  public static async getAllRecipes(
    offset: number,
    limit: number,
    filter: string = 'dated',
    search?: string,
    category_id?: number
  ) {
    const queryString = `
      select * from recipe 
      where 
        id > 0
        ${search ? "and (name ILIKE '$3:value%' or name ILIKE '%$3:value%')" : ''}
        ${category_id ? "and category_id = $4" : ''}
        order by $5:raw
        offset $1 limit $2
    `;
    // для пагинации неплохо бы знать общее количество которое есть
    const queryStringCount = `
      select count(id) from recipe 
      where 
        id > 0
        ${search ? "and (name ILIKE '$3:value%' or name ILIKE '%$3:value%')" : ''}
        ${category_id ? "and category_id = $4" : ''}
    `;

    // console.log(pgp.as.format(queryString, [
    //   offset, limit, search, category_id, recipeFilters[filter]
    // ]));

    try {


      const recipeReq = db.many(queryString, [
        offset, limit, search, category_id, recipeFilters[filter]
      ]);
      const recipeCountReq = db.one(queryStringCount, [
        offset, limit, search, category_id
      ]);

      const recipeRes = await recipeReq;
      const recipeCountRes = await recipeCountReq;

      return {
        recipes: recipeRes,
        count: +recipeCountRes.count
      };
    } catch (err) {
      console.log();
      return {
        recipes: [],
        count: 0
      }
    }
  }


  public static async getShortRecipeById(recipeId: string) {
    const queryString = `
      select * from recipe where id = $1
    `;
    try {
      return db.one(queryString, [recipeId]);
    } catch (err) {
      return false;
    }
  }

  public static async getOneRecipe(recipeId: string) {
    const queryString = `
      select mq.id, mq.name, mq.description, mq.creat_date, mq.photo_path, aj.nickname, cj.name as category_name
      from recipe as mq 
        join users as aj on aj.id = author_id 
        join category as cj on cj.id = category_id 
      where mq.id = $1
    `;
    const queryIngridientsString = `
      select * from ingridients where recipe_id = $1
    `

    try {
      const recipeReq = db.oneOrNone(queryString, [recipeId]);
      const ingridientsReq = db.many(queryIngridientsString, [recipeId]);
      const commentsReq = Comment.getByRecipe(recipeId);
      return {
        recipe: await recipeReq,
        ingridients: await ingridientsReq,
        comments: await commentsReq
      };
    } catch (err) {
      return false;
    }
  }

  public static deleteRecipe(recipeId: string) {
    const queryString = `
      delete from recipe where id = $1
    `;

    try {
      return db.query(queryString, [recipeId]);
    } catch (err) {
      return null
    }
  }

  public static async createRecipe(
    name: string,
    description: string,
    category_id: string,
    author_id: string,
    photo_path: string,
    ingridients: string[]
  ) {
    const queryRecipeString = `
      insert into recipe(name, description, category_id, author_id, photo_path) values
      ($1, $2, $3, $4, $5) returning id
    `;
    const ingridientsDataString = ingridients.map((ing, idx) => `($1, $${idx + 2})`).join(', ');
    const queryIngridientsString = `
      insert into ingridients(recipe_id, title) values 
      ${ingridientsDataString}
    `;

    try {
      const createReq = await db.one(queryRecipeString, [
        name, description, category_id, author_id, photo_path
      ]);

      const recipeId = createReq.id;
      const ingridientsReq = await db.query(queryIngridientsString, [
        recipeId,
        ...ingridients
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  public static async editRecipe(
    recipeId: string,
    name: string,
    description: string,
    category_id: string,
    photo_path: string,
    ingridients: string[]
  ) {
    const queryRecipeString = `
      UPDATE recipe
      SET name = $1, 
        description = $2, 
        category_id = $3, 
        photo_path = $4
      WHERE id = $5
    `;
    const queryIngridientsString = `
      insert into ingridients(recipe_id, title) values 
      ${ingridients.map((ing, idx) => `($1, $${idx + 2})`).join(', ')}
    `;
    const queryIngridientsDeleteString = `
      delete from ingridients where recipe_id = $1
    `;

    try {
      const editReq = db.query(queryRecipeString, [
        name, description, category_id, photo_path, recipeId
      ]);
      const deleteReq = db.query(queryIngridientsDeleteString, [recipeId]);

      await editReq;
      await deleteReq;
      const ingridientsReq = await db.query(queryIngridientsString, [
        recipeId,
        ...ingridients
      ]);
    } catch (err) {
      console.log(err);
    }
  }
}