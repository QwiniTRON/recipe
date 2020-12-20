import db from '../db/connect';


export class Category {
  public id: string;
  public name: string;
  public description: string;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

export class CategoryModel {

  static createCategory$C(category: Category) {
    const queryString = `
      insert into category(name, description)
      values 
      ($1, $2)
    `;

    return db.query(queryString, [
      category.name, category.description
    ]);
  };

  static createCategory(name: string, description: string) {
    const queryString = `
      insert into category(name, description)
      values 
      ($1, $2)
    `;

    return db.query(queryString, [
      name, description
    ]);
  }


  static editCategory$C(name: Category) {
    const queryString = `
    update category set 
      name = $1,
      description = $2
    where id = $3
  `;

    return db.query(queryString, [
      name.name, name.description, name.id
    ]);
  }

  static editCategory(name?: any, description?: string, categoryId?: string) {
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


  static hasCategoyById(id: number) {
    const queryString = `
      select id from category where id = $1
    `;

    return db.oneOrNone(queryString, [
      id
    ]).then((exists) => Boolean(exists));
  }


  static getCategoryes(): Promise<Category[]> {
    const queryString = `
      select * from category
    `;

    return db.many(queryString);
  }
}

// Model логика взаимодействия с данными такого типа
// class неопсредственная реализация объекта данного типа
// для перегрузок можно использовать name$signature