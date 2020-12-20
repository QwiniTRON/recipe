import db from '../db/connect';


export class Comment {
  public id?: string
  public content: string
  public nickname: string
  public create_time: string

  constructor(content: string, nickname: string, create_time: string, id: string) {
    this.id = id;
    this.content = content;
    this.nickname = nickname;
    this.create_time = create_time;
  }


  public static create$C(comment: Comment, authorId: string, recipeId: string) {
    const queryString = `
    insert into comments(author_id, recipe_id, content) values 
    ($1, $2, $3) returning id
  `;

    try {
      return db.query(queryString, [authorId, recipeId, comment.content]).then((commentId: { id: string }[]) => {
        return Comment.getById(String(commentId[0].id));
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static create(authorId: string, recipeId: string, text: string) {
    const queryString = `
      insert into comments(author_id, recipe_id, content) values 
      ($1, $2, $3) returning id
    `;

    try {
      return db.query(queryString, [authorId, recipeId, text]).then((commentId: { id: string }[]) => {
        return Comment.getById(String(commentId[0].id));
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static getByRecipe(recipeId: string) {
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

  public static getById(commentId: string) {
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

  public static update() {

  }



  public static deleteComment(commentId: string) {
    const queryString = `
      delete from comments where id = $1
  `;

    try {
      return db.query(queryString, [commentId]);
    } catch (err) {
      return null
    }
  }


  public save(authorId?: string, recipeId?: string) {
    if (this.id) {
      Comment.update();
    } else {
      if (!authorId || !recipeId) return;
      Comment.create$C(this, authorId, recipeId);
    }
  }
}