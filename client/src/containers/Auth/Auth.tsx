import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router'

import './auth.scss';

import { login, register } from '../../store/user/actions';
import { LoginForm } from '../../components/forms/LoginForm';
import { RegForm } from '../../components/forms/RegForm';
import { RootState } from '../../store/main';

interface AuthType extends RouteComponentProps {
  isLoading: boolean
  error: string
  isAuth: boolean

  login: typeof login
  register: Function
}

const Auth: React.FC<AuthType> = (props) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (props.isAuth) props.history.push('/');
  }, [props.isAuth])

  const loginHandle = (email: string, password: string) => {
    props.login(email, password);
  }

  const registerHandle = (email: string, nickname: string, password: string, rpassword: string) => {
    props.register(email, nickname, password, rpassword).then((result: any) => {
      if (result) setIsRegistered(true);
    });
  }

  return (
    <div className="authPage">
      <h4 className="authPage__title">{isLoginForm ? "вход" : "регистрация"}</h4>

      <p className="authPage__error">{props.error}</p>
      {isLoginForm ?
        <LoginForm submitHandle={loginHandle} isLoading={props.isLoading} /> :
        (
        isRegistered? <p className="authPage__succes-register">вы успешно зарегистрированы.</p> :
        <RegForm isLoading={props.isLoading} registerHandle={registerHandle} />
        )
      }

      <button onClick={e => setIsLoginForm(!isLoginForm)} className="btn waves-effect waves-light" type="button">
        {isLoginForm ? "регистрация" : "авторизация"} &gt;
      </button>
    </div>
  );
}


const mapStateToProps = (state: RootState) => ({
  error: state.user.error,
  isLoading: state.user.loading,
  isAuth: Boolean(state.user.userInfo)
})
const mapDispatchToProps = {
  login,
  register
}

const connectedAuth = connect(mapStateToProps, mapDispatchToProps)(Auth as any);
export { connectedAuth as Auth };
export default connectedAuth;