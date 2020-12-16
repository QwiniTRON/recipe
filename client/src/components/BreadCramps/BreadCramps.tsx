import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import './breadcramps.scss';


type PageTranslateDictionary = {
  [word: string]: string
}
const pageTranslateDictionary: PageTranslateDictionary = {
  'catalog': 'каталог',
  'about': 'о сайте'
}

export const BreadCramps: React.FC = () => {
  const match = useLocation();
  const path = match.pathname;

  const pathComponents = path.split('/').filter(c => c);
  const pathsRoutes = [{ path: '/', text: 'главная' }];
  for (let i = 1; i <= pathComponents.length; i++) {
    const linkPath = pathComponents.slice(0, i).join('/');
    pathsRoutes.push({ path: '/' + linkPath, text: pathComponents[i - 1] });
  }
  const routeJsx = pathsRoutes.map((p, idx, arr) => {
    const text: string = pageTranslateDictionary[String(p.text)] || p.text;

    return (
      arr.length - 1 == idx ?
        <a key={p.path}>{text}</a> :
        (<Link to={p.path} key={p.path}> {text} { (pathComponents.length > idx) && (<span>&gt;</span>)} </Link>)
    );
  });


  return (
    <div className="breadcramps">
      {routeJsx}
    </div>
  );
}