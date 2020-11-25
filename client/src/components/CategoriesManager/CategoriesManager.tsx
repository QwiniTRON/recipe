import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './CatalogManger.scss';

import { RootState } from '../../store/main';
import {getCategories} from '../../store/recipe/actions';


export const CategoriesManager = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.recipe.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="categories-manager container">
      <h3>Категории</h3>
      <div className="row">
        {categories.map((c) => (
          <Link to={"/admin/categories/" + c.id} key={c.id}>
            <div className="col s6">
              <div className="card-panel teal">
                <p className="white-text tac">{c.name}</p>
                <p className="white-text">{c.description}</p>
              </div>
            </div>
          </Link>
        ))}

        <Link to="/admin/categories/create">
          <div className="col s6">
            <div className="card-panel teal add-panel hoverable">
              <div className="rounded-plus">+</div>
            </div>
          </div>
        </Link>
      </div>
      <hr />
    </div>
  );
}

