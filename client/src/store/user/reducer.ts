import {
  USER_SET_DATA,
  USER_SET_ERROR,
  USER_SET_LOADING
} from '../consts';
import {
  User,
  userAction
} from '../types';

type UserStore = {
  error: string
  loading: boolean
  userInfo: User | null
}

const initialState = {
  error: '',
  loading: false,
  userInfo: null
}

export default function (state: UserStore = initialState, action: userAction): UserStore {
  switch (action.type) {

    case USER_SET_DATA:
      return { ...state, userInfo: action.userData };

    case USER_SET_ERROR:
      return { ...state, error: action.error };

    case USER_SET_LOADING:
      return { ...state, loading: action.loading };

    default:
      return state;
  }
}