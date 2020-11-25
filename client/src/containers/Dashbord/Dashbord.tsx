import React from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import './Dashbord.scss';

import { CategoriesManager } from '../../components/CategoriesManager/CategoriesManager';
import { DashboardCategoy } from '../../components/DashboardCategoy/DashboardCategoy';
import { DashbordInfo } from '../../components/DashbordInfo/DashbordInfo';
import {DashboardCategoryCreate} from '../../components/DashboardCategoryCreate/DashboardCategoryCreate';


export const Dashbord: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="menu">
        <NavLink to="/admin/info">
          информация
        </NavLink>
        <NavLink to="/admin/categories">
          категории
        </NavLink>
      </div>
      <Switch>
        <Route path="/admin" exact >
          <div className="container">
            <p className="tac">админ панель</p>
          </div>
        </Route>
        <Route path="/admin/info" exact component={DashbordInfo} />
        <Route path="/admin/categories" component={CategoriesManager} exact />
        <Route path="/admin/categories/create" component={DashboardCategoryCreate} exact />
        <Route path="/admin/categories/:id" component={DashboardCategoy} exact />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Dashbord;