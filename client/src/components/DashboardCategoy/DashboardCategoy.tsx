import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { RootState } from '../../store/main';
import { Loader } from '../UI/Loader/Loader';
import { Req } from '../../req/Req';
import { BreadCramps } from '../BreadCramps/BreadCramps';

type DashboardCategoyParams = {
  id: string
}

interface DashboardCategoyProps extends RouteComponentProps<DashboardCategoyParams> {

}

export const DashboardCategoy: React.FC<DashboardCategoyProps> = (props) => {
  const id = props.match.params.id;
  const category = useSelector((state: RootState) => state.recipe.categories.find(c => c.id == id));
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');


  useEffect(() => {
    if (category) {
      setName(category.name);
      setDesc(category.description);
    }
  }, [category])

  if (!category) return (
    <div className="container">
      <div className="col s6">
        <Loader />
      </div>
    </div>
  );

  const editClick = async () => {
    const editReq = await Req.post('/api/recipe/category/edit', {
      name: name.trim(),
      description: desc.trim(),
      categoryId: id
    });
    if (editReq.ok) {
      (window as any).M.toast({ html: 'Категория изменена', classes: 'green' });
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
            редактировать
          </button>
        </div>
      </div>
    </div>
  );
}