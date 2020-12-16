import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { check } from './store/user/actions';
import { RootState } from './store/main';
import { getCategories } from './store/recipe/actions';
import { Loader } from './components/UI/Loader/Loader';
import { Bounder } from './components/Bounder/Bounder';

const Header = lazy(() => import('./components/Navigation/Header'));
const ScreenLoader = lazy(() => import('./components/UI/ScreenLoader/ScreenLoader'));
const AboutePage = lazy(() => import('./containers/AboutPage/AboutePage'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const MainPage = lazy(() => import('./containers/MainPage/MainPage'));
const Logout = lazy(() => import('./components/logout/Logout'));
const CreateRecipe = lazy(() => import('./containers/CreateRecipe/CreateRecipe'));
const Catalog = lazy(() => import('./containers/Catalog/Catalog'));
const Recipe = lazy(() => import('./containers/Recipe/Recipe'));
const EditRecipe = lazy(() => import('./containers/EditRecipe/EditRecipe'));


const Dashbord = lazy(() => import('./containers/Dashbord/Dashbord'));

type AppProps = {
  userStatus: any
  isAuth: boolean

  check: Function
  getCategories: Function
}

const App: React.FC<AppProps> = ({ isAuth, check, getCategories, userStatus }) => {
  const [isINIT, setIsINIT] = useState(false);

  useEffect(() => {
    void async function () {
      const checkReq = check();
      const getCategoriesReq = getCategories();
      const checkRes = await checkReq;
      const getCategoriesRes = await checkReq;

      setIsINIT(true);
    }();
  }, [])

  return (
    <Suspense fallback={" "}>
      <Bounder>
        <div className="app_layout">
          <Header isAuth={isAuth} />
          {!isINIT && <ScreenLoader />}
          <main>

            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/about" exact component={AboutePage} />
              {!isAuth && <Route path="/auth" exact component={Auth} />}
              {isAuth && <Route path="/logout" exact component={Logout} />}
              {isAuth && <Route path="/create" exact component={CreateRecipe} />}
              {isAuth && userStatus == 1 && <Route path="/admin" component={Dashbord} />}
              <Route path={["/catalog", "/catalog/:categoryid"]} exact component={Catalog} />
              <Route path="/recipe/:id" exact component={Recipe} />
              {isAuth && <Route path="/edit/:id" exact component={EditRecipe} />}
              {isINIT && <Redirect to='/' />}
            </Switch>
          </main>
        </div>
      </Bounder>
    </Suspense>
  );
}

const mapStateToProps = (state: RootState) => ({
  isAuth: Boolean(state.user.userInfo),
  userStatus: state.user.userInfo?.status
})
const mapDispatchToProps = {
  check,
  getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
