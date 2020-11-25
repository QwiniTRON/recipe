import React, { useEffect, useRef } from 'react'

import './aboutePage.scss';

import poster1 from '../../assets/imgs/eat1.png';
import poster2 from '../../assets/imgs/eat2.jpg';
import poster3 from '../../assets/imgs/eat3.jpg';
import poster4 from '../../assets/imgs/eat4.jpg';
import poster5 from '../../assets/imgs/eat5.jpg';
import { BreadCramps } from '../../components/BreadCramps/BreadCramps';

const AboutePage: React.FC = () => {
  const corusealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ((window as any).M).Carousel.init(corusealRef.current, {
      indicators: true,
      fullWidth: true
    });
  }, [corusealRef.current]);

  return (
    <div className="aboute-page">
      <BreadCramps />
      <h2>Сайт каталог рецептов</h2>
      <p>
        На этом сайте можно бесплатно выкладывать свои рецепты блюд. Находить
        рецепты на любой вкус и общаться в коментариях.
      </p>

      <div ref={corusealRef} className="carousel carousel-slider aboute-slider">
        <span className="carousel-item"><img src={poster1} /></span>
        <span className="carousel-item"><img src={poster2} /></span>
        <span className="carousel-item"><img src={poster3} /></span>
        <span className="carousel-item"><img src={poster4} /></span>
        <span className="carousel-item"><img src={poster5} /></span>
      </div>

      <p>
        Приятного аппетита
      </p>
    </div>
  );
}

export { AboutePage };
export default AboutePage;