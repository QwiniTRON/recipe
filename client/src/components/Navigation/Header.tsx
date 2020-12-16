import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import './header.scss';

import { s } from '../../utils/S';
import { Link, NavLink } from 'react-router-dom';
import Modal from '../UI/Modal/Modal';
import { Category } from '../../store/types';
import { RootState } from '../../store/main';


type HeaderProps = {
  isAuth: boolean
  categories: Category[]
  nickname: any
  userStatus: any
}

const Header: React.FC<HeaderProps> = ({ isAuth, categories, nickname, userStatus }) => {
  const [isExitModal, setIsExitModal] = useState(false);
  const history = useHistory();
  const sideNavRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
      var elem: HTMLUListElement = document.querySelector('.sidenav') as HTMLUListElement;
      (sideNavRef as any).current = (window as any)?.M?.Sidenav?.init(elem);
  }, []);

  const closeSideMenu = () => {
    (sideNavRef as any).current.close();
  }

  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo">
          <i className="fas fa-utensils"></i>
        </Link>
        <div className='nav'>
          <NavLink to="/about" className="nav__item">о сайте</NavLink>
          {isAuth && <NavLink to="/create" className="nav__item">добавить рецепт</NavLink>}
          {isAuth && userStatus == 1 && <NavLink to="/admin" className="nav__item">админ</NavLink>}

          <span className="nav__item sub-menu">
            <NavLink to="/catalog">рецепты</NavLink> <i className="sub-menu__arrow">&gt;</i>
            <div className="sub-conten">
              {categories.map(cat => (
                <NavLink
                  className="sub-conten__item"
                  key={cat.id}
                  to={`/catalog/${cat.id}`}>{cat.name}</NavLink>
              ))}
            </div>
          </span>

          {isAuth ?
            <span onClick={() => setIsExitModal(true)} className="nav__item">выйти</span> :
            <NavLink to="/auth" className="nav__item">войти</NavLink>}
        </div>
        <a data-target="slide-out" className="sidenav-trigger nav__toggler"><i className="fas fa-bars" /></a>
      </header>

      <ul id="slide-out" className="sidenav">
        <li><NavLink onClick={closeSideMenu} to="/about" className="waves-effect haeader__side-item">о сайте</NavLink></li>

        {isAuth &&
          <li>
            <NavLink onClick={closeSideMenu} to="/create" className="waves-effect haeader__side-item">добавить рецепт</NavLink>
          </li>}

        {isAuth && userStatus == 1 && <li>
          <NavLink onClick={closeSideMenu} to="/admin" className="waves-effect haeader__side-item">админ</NavLink>
        </li>}

        <li><NavLink onClick={closeSideMenu} to="/catalog" className="waves-effect haeader__side-item">рецепты</NavLink></li>

        {isAuth && <li>
          <a onClick={() => { setIsExitModal(true); closeSideMenu(); }} className="waves-effect haeader__side-item">выйти</a>
        </li>}

        {!isAuth && <li>
          <NavLink onClick={closeSideMenu} to="/auth" className="waves-effect haeader__side-item">войти</NavLink>
        </li>}

        <li onClick={closeSideMenu}><a className="waves-effect nav__closer">&times;</a></li>
      </ul>

      {isExitModal && <Modal clickHandle={() => setIsExitModal(false)}>
        <div className="header-modal">
          <p className="header-modal__title">точно выйти из аккаунта {nickname}?</p>
          <div className="header-modal__btns col s12">
            <button className="btn waves-effect waves-light" onClick={() => setIsExitModal(false)}>
              нет
              </button>
            <button className="btn waves-effect waves-light red darken-1" onClick={() => {
              history.push('/logout');
              setIsExitModal(false);
            }}>
              да
             </button>
          </div>
        </div>
      </Modal>}
    </>
  );
}


// если не указать роутеру точный путь /auth, а auth
// то он просто провалится в нынешний роут плюс /auth
const mapStateToProps = (state: RootState) => ({
  categories: state.recipe.categories,
  nickname: state.user.userInfo?.nickname,
  userStatus: state.user.userInfo?.status
})
const mapDispatchToProps = {
}
const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);
export { connectedHeader as Header };
export default connectedHeader;