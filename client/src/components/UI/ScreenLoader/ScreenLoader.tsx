import React from 'react'

import './screenLoader.scss';

const ScreenLoader: React.FC = () => {
 return (
  <div className="screen-loader">
    <div className="circle"></div>
  </div>
 );
}

export {ScreenLoader};
export default ScreenLoader;