import express from 'express';
import pgp from 'pg-promise';
import db from '../db/connect';


export function createCategory(name: string, description: string) {
  const queryString = `
    insert into category(name, description)
    values 
    ($1, $2)
  `;

  return db.query(queryString, [
    name, description
  ]);
}

export function editCategory(name: string, description: string, categoryId: string) {
  const queryString = `
    update category set 
      name = $1,
      description = $2
    where id = $3
  `;

  return db.query(queryString, [
    name, description, categoryId
  ]);
}

const recipeFilters: { [p: string]: any } = {
  'dated': 'creat_date asc',
  'dateu': 'creat_date desc',
  'named': 'name asc',
  'nameu': 'name desc'
}
export async function getAllRecipes(
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

export function hasCategoyById(id: number) {
  const queryString = `
    select id from category where id = $1
  `;

  return db.oneOrNone(queryString, [
    id
  ]).then((exists) => Boolean(exists));
}

export function getCategoryes(): Promise<Category[]> {
  const queryString = `
    select * from category
  `;

  return db.many(queryString);
}

export async function getShortRecipeById(recipeId: string) {
  const queryString = `
    select * from recipe where id = $1
  `;
  try {
    return db.one(queryString, [recipeId]);
  } catch (err) {
    return false;
  }
}

export async function getOneRecipe(recipeId: string) {
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
    const commentsReq = getCommentsForRecipe(recipeId);
    return {
      recipe: await recipeReq,
      ingridients: await ingridientsReq,
      comments: await commentsReq
    };
  } catch (err) {
    return false;
  }
}

export async function createRecipe(
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
  const queryIngridientsString = `
    insert into ingridients(recipe_id, title) values 
    ${ingridients.map((ing, idx) => `($1, $${idx + 2})`).join(', ')}
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

export async function editRecipe(
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
    const editReq =  db.query(queryRecipeString, [
      name, description, category_id, photo_path, recipeId
    ]);
    const deleteReq =  db.query(queryIngridientsDeleteString, [recipeId]);

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

export function createCommentToRecipe(authorId: string, recipeId: string, text: string) {
  const queryString = `
    insert into comments(author_id, recipe_id, content) values 
    ($1, $2, $3) returning id
  `;

  try {
    return db.query(queryString, [authorId, recipeId, text]).then((commentId: {id: string}[]) => {
      return getCommentById(String(commentId[0].id));
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export function getCommentsForRecipe(recipeId: string) {
  const queryString = `
    select mq.id, content, nickname, create_time from comments as mq
      join users as uj on uj.id = mq.author_id 
    where recipe_id = $1
    order by create_time asc
  `;

  try {
    return db.manyOrNone(queryString, [recipeId]);
  } catch (err) {
    return []
  }
}

export function getCommentById(commentId: string) {
  const queryString = `
    select mq.id, content, nickname, create_time from comments as mq
      join users as uj on uj.id = mq.author_id 
    where mq.id = $1
  `;

  try {
    return db.oneOrNone(queryString, [commentId]);
  } catch (err) {
    return null
  }
}

export function deleteRecipe(recipeId: string) {
  const queryString = `
    delete from recipe where id = $1
  `;

  try {
    return db.query(queryString, [recipeId]);
  } catch (err) {
    return null
  }
}

export function deleteComment(commentId: string) {
  const queryString = `
    delete from comments where id = $1
  `;

  try {
    return db.query(queryString, [commentId]);
  } catch (err) {
    return null
  }
}

export type Category = {
  id: string
  name: string
  description: string
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

export const recipeFiltersDictionary = {
  'dated': 'dated',
  'dateu': 'dateu',
  'named': 'named',
  'nameu': 'nameu'
}