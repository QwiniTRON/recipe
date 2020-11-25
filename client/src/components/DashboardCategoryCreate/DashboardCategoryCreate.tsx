import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { RootState } from '../../store/main';
import { Loader } from '../UI/Loader/Loader';
import { Req } from '../../req/Req';
import { BreadCramps } from '../BreadCramps/BreadCramps';
import { useHistory } from 'react-router-dom';

export const DashboardCategoryCreate: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const editClick = async () => {
    const createReq = await Req.post('/api/recipe/category/create', {
      name: name.trim(), 
      description: desc.trim()
    });
    if (createReq.ok) {
      (window as any).M.toast({ html: 'Категория создана', classes: 'green' });
      setTimeout(() => {
        history.push('/admin/categories');
      }, 3000);
    } else {
      (window as any).M.toast({ html: 'Произошла ошибка', classes: 'red' });
    }
  }

  return (
    <div className="container">
      <BreadCramps />
      <div className="col s6">
        <div className="card-panel blue-grey darken-4">
          <div className="input-field col s12">
            <input value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="название категории"
              type="text"
              id="name"
              className="validate white-text" />
            <label htmlFor="name">название категории</label>
            <span className="form-error">
              {name.trim().length < 3 && 'название не короче 3'}
            </span>
          </div>
          <div className="input-field col s12">
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="описание категории"
              type="text"
              id="desc"
              className="validate white-text" />
            <label htmlFor="desc">описание категории</label>
            <span className="form-error">
              {desc.trim().length < 6 && 'описание не короче 6'}
            </span>
          </div>

          <button
            disabled={desc.trim().length < 6 || name.trim().length < 3}
            className="btn waves-effect waves-light green darken-1"
            onClick={editClick}>
            создать
          </button>
        </div>
      </div>
    </div>
  );
}