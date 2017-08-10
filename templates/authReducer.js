import axios from 'axios';
import * as DB from 'utils/db'

export const AUTH_USER = 'auth-auth_user';
export const LOGOUT = 'auth-logout_user';
export const GET_USER_PROFILE = 'auth-get_user_profile';
export const ERROR = 'error';

export default function reducer(state={
    user: false,
    fetching: false,
    fetched: false,
    token: false,
    error: null,
  }, action) {

  switch (action.type) {
    case AUTH_USER: {
      return {
        ...state,
        token: action.payload
      }
    }
    case GET_USER_PROFILE: {
      return {
        ...state,
        user: action.payload
      }
    }
    case LOGOUT: {
      return {
        ...state,
        user: false
      }
    }
    default: {
      return state;
    }
  }
}

export const getUserProfileAction = () => {
  return function (dispatch) {
    const token = DB.get('uinfo')
    return axios.get(`/auth/me?token=${token}`).then(res => {
      return dispatch({
        type: GET_USER_PROFILE,
        payload: res.data.user
      })
    })
    .catch(err => {
      return dispatch({
        type: ERROR,
        err: err,
        payload: 'Could not get user profile'
      });
    })
  }
}

export const authenticateUserAction = (username, password) => {
  return function (dispatch) {
    return axios.post('/auth/token', { username, password }).then(res => {
      DB.set('uinfo', res.data.token);
      return dispatch({
        type: AUTH_USER,
        payload: res.data.token
      });
    })
    .catch(err => {
      return dispatch({
        type: ERROR,
        err: err,
        payload: {
          message: 'Could not authenticate user',
          reducer: 'auth'
        }
      });
    })
  }
}

export const logoutAction = () => dispatch => {
  DB.set('uinfo', '')
  axios.get('/auth/logout').then(res => {
    dispatch({
      type: LOGOUT
    })
  })
  .catch(err => {
    dispatch({
      type: ERROR,
      err: err,
      payload: {
        message: 'could not logout user',
        reducer: 'auth'
      }
    });
  })
}