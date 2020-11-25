import {
  USER_SET_DATA,
  USER_SET_LOADING,
  USER_SET_ERROR
} from '../consts';
import {
  User,
  userAction
} from '../types';
import { Req } from '../../req/Req';


export function userSetData(userData: User | null): userAction {
  return {
    type: USER_SET_DATA,
    userData
  }
}

export function userSetError(error: string): userAction {
  return {
    type: USER_SET_ERROR,
    error
  }
}

export function userSetLoading(loading: boolean): userAction {
  return {
    type: USER_SET_LOADING,
    loading
  }
}


// async
export function login(email: string, password: string) {
  return async function (dispatch: Function, getStete: Function) {
    try {
      dispatch(userSetLoading(true));

      const loginRes = await Req.post('/api/auth/login', {
        email,
        password
      });

      if (loginRes.ok) {
        dispatch(userSetData(loginRes.user));
      } else {
        dispatch(userSetError(loginRes.message));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(userSetLoading(false));
    }
  }
}

export function check() {
  return async function (dispatch: Function, getStete: Function) {
    try {
      const loginRes = await Req.post('/api/auth/check', {});
      
      if (loginRes.ok) {
        dispatch(userSetData(loginRes.user));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export function logout() {
  return async function (dispatch: Function, getStete: Function) {
    try {
      const loginRes = await Req.post('/api/auth/logout', {});
      dispatch(userSetData(null));
    } catch (err) {
      console.log(err);
    }
  }
}

export function register(email: string, nickname: string, password: string, rpassword: string) {
  return async function (dispatch: Function, getStete: Function) {
    try {
      dispatch(userSetLoading(true));

      const regRes = await Req.post('/api/auth/register', {
        email,
        password,
        rpassword,
        nickname
      });

      if (regRes.ok) {
        dispatch(userSetError(''));
        dispatch(userSetLoading(false));
        return true;
      } else {
        dispatch(userSetError(regRes.message));

      }

      dispatch(userSetLoading(false));
      return false;
    } catch (err) {
      console.log(err);
      dispatch(userSetLoading(false));
    }
  }
}