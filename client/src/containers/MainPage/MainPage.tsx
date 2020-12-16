import React from 'react';

import './mainpage.scss';

const MainPage: React.FC = () => {
 return (
  <div className="p5">
    <h3>Сайт с рецептами на любой вкус</h3>

    <p>
      На сайте можно найти огромное количество разнообразных интересных рецептов, на любой вкус и кошелёк.
    </p>
    <p>
      Каждый пользователь может оставить свой рецепт и множество людей смогут его увидеть и оценить.
    </p>
    <p>
      Администрация сайте просит быть вежливее и культурнее в комментариях.
    </p>
  </div>
 );
}

export {MainPage};
export default MainPage;