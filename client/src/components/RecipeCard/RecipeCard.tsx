import React from 'react'

import './RecipeCard.scss';

import {RecipeCard} from '../../store/types';
import { Link } from 'react-router-dom';
import { s } from '../../utils/S';

type RecipeCardProps = {
  card: RecipeCard
  className?: string
}

const RecipeCart: React.FC<RecipeCardProps> = ({card, className = ''}) => {
  return (
    <Link to={"/recipe/" + card.id} className={s('recipe-card hoverable', className)}>
      <p>{card.name}</p>
      <img loading="lazy" height="150" src={`/imgs/${card.photo_path}`} alt={card.name}/>
      <p className="recipe-card__text">
        {card.description.slice(0, 100) + '...'}
      </p>
      <button className="btn waves-effect waves-light">перейти</button>
    </Link>
  );
}

export { RecipeCart };