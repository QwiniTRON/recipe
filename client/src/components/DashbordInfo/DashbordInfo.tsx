import React, { useEffect, useRef } from 'react'

export const DashbordInfo: React.FC = () => {
  useEffect(() => {
    var instance = (window as any).M.AutoInit();
  }, []);

  return (
    <div className="dashboard-info container">
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s6"><a href="#test1">Информация о приложении</a></li>
            <li className="tab col s6"><a className="active" href="#test2">Автор</a></li>
          </ul>
        </div>
        <div id="test1" className="col s12">
          <p className="dashboard-info__text">Приложение для рецептов</p>
        </div>
        <div id="test2" className="col s12">
          <p className="dashboard-info__text">Барабанщиков Иван</p>
        </div>
      </div>
    </div>
  );
}