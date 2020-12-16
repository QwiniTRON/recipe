import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';

import './catalog.scss';

import { RootState } from '../../store/main';
import { recipeSetFilter, getRecipes, recipesOnPage, getRecipesNext, getRecipesBack } from '../../store/recipe/actions';
import { Category, RecipeCard } from '../../store/types';
import { RecipeCart } from '../../components/RecipeCard/RecipeCard';
import { Loader } from '../../components/UI/Loader/Loader';
import { BreadCramps } from '../../components/BreadCramps/BreadCramps';



type CatalogRouteProps = {
  categoryid?: string
}


interface CatalogProps extends RouteComponentProps<CatalogRouteProps> {
  filter: string
  categories: Category[]
  recipes: RecipeCard[]
  step: number
  countRecipes: number
  loading: boolean

  recipeSetFilter: typeof recipeSetFilter
  getRecipes: Function
  getRecipesNext: Function
  getRecipesBack: Function
}


const Catalog: React.FC<CatalogProps> = ({
  filter,
  recipeSetFilter,
  categories,
  ...props
}) => {
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const sideNavRef = useRef<any>(null);


  // функция добавления в url информации для поиска, также перезагружает компонент.
  // и он ищет рецепты с новыми параметрами.
  const pushPageState = (filter: string, search: string, category: number) => {
    const queryes = new URLSearchParams();
    if (search) queryes.set('search', search);
    if (filter && filter != 'dated') queryes.set('filter', filter);
    let str = '/catalog';
    if (category) str += `/${category}`;
    str += '?' + queryes.toString();

    props.history.push(str);
  }


  const category: string | undefined = props.match.params.categoryid;
  useLayoutEffect(() => {
    // selects
    var elems = document.querySelectorAll('select');
    var instances = (window as any).M.FormSelect.init(elems);
    var elem = document.querySelector('.modal');
    sideNavRef.current = (window as any).M.Modal.init(elem);

    // логика полученика восстановления запроса
    const searchQuery = props.location.search;
    const queriesCouples = new URLSearchParams(searchQuery);
    const search = queriesCouples.get('search');
    const filter = queriesCouples.get('filter');

    if (filter) recipeSetFilter(filter)
    if (search) setSearch(search)
  }, []);


  // запрашиваем рецепты. 
  useEffect(() => {
    pushPageState(filter, search, Number(category));
    props.getRecipes(search, category);
  }, [filter, category, search]);
  
  const closeSideMenu = () => {
    sideNavRef.current.close();
  }


  return (
    <div className="catalog-page">
      <BreadCramps />
      <div className="row config">
        <div className="col s12 m6">
          <select value={filter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            recipeSetFilter(e.target.value);
          }}>
            <option value="dateu">сначала новые</option>
            <option value="dated">сначала старые</option>
            <option value="named">по алфавиту</option>
            <option value="nameu">по алфавиту в обратную</option>
          </select>
          <label>фильтр</label>
        </div>
        <form onSubmit={e => {
          e.preventDefault();
          setSearch(String(searchRef.current?.value));
        }} className="row col s12 m6">
          <div className="col s10 xl11" >
            <input ref={searchRef} type="text" placeholder="поиск" />
          </div>
          <button
            onClick={e => setSearch(String(searchRef.current?.value))}
            className="btn waves-effect waves-light red lighten-1 col s2 xl1">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div className="p5">
        <a className="waves-effect waves-light btn modal-trigger categories__toggler" href="#modal1">категории</a>
      </div>
      <div className="row catalog-page__content">
        <div className="col s0 m2 catalog-page__categories teal lighten-5">
          <div className="catalog-page__categories-item" key="popusss123">
            <NavLink exact to={`/catalog`}>все</NavLink>
          </div>
          {categories.map(cat => (
            <div className="catalog-page__categories-item" key={cat.id}>
              <NavLink to={`/catalog/${cat.id}`}>{cat.name}</NavLink>
            </div>
          ))}
        </div>
        <div className="col s10 catalog-page__catalog">
          <div className="cards">
            {props.loading && <Loader />}

            {!props.loading &&
              props.recipes.map((r, idx) => (
                <RecipeCart card={r} key={`${r.id}`} className="card" />
              ))
            }

            {props.recipes.length == 0 && <p>ничего не нашлось...</p>}
          </div>

          <hr />
          <div className="pagination">
            <button
              className="btn waves-effect waves-light"
              disabled={props.step == 0}
              onClick={e => props.getRecipesBack(search, category)}>
              назад
            </button>
            <button
              className="btn waves-effect waves-light"
              disabled={
                (Math.ceil(props.countRecipes / recipesOnPage) == props.step + 1) ||
                props.loading ||
                props.countRecipes == 0
              }
              onClick={e => props.getRecipesNext(search, category)}>
              вперед
            </button>
          </div>
        </div>
      </div>

      <div id="modal1" className="modal bottom-sheet">
        <div>
          <div className="catalog-page__categories-item" key="popusss123">
            <NavLink onClick={closeSideMenu} exact to={`/catalog`}>все</NavLink>
          </div>
          {categories.map(cat => (
            <div className="catalog-page__categories-item" key={cat.id}>
              <NavLink onClick={closeSideMenu} to={`/catalog/${cat.id}`}>{cat.name}</NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state: RootState) => ({
  filter: state.recipe.filter,
  categories: state.recipe.categories,
  recipes: state.recipe.recipes as any,
  step: state.recipe.step,
  countRecipes: state.recipe.recipesCount,
  loading: state.recipe.loading
})
const mapDispatchToProps = {
  recipeSetFilter,
  getRecipes,
  getRecipesNext,
  getRecipesBack
}


const connectedCatalog = connect(mapStateToProps, mapDispatchToProps)(Catalog);
export { connectedCatalog as Catalog };
export default connectedCatalog;