import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP,
  USER_LOGIN_FAIL,
  CHECK_USER_LOGGEDIN
} from '../actions/types'

const initialState = {
  username: '',
  userId: null,
  isLoggedIn: false,
  token: '',
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.user.username,
        userId: action.payload.user.id,
        isLoggedIn: true,
        message: action.payload.message,
        token: action.payload.token
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        message: action.payload
      }
    case USER_LOGOUT:
      return {
        ...state,
        username: 'not logged in',
        isLoggedIn: false,
        userId: null,
        message: '',
        token: ''
      }
    case USER_SIGNUP:
      return {
        ...state,
        message: action.payload
      }
    case CHECK_USER_LOGGEDIN:
      return {
        ...state,
        username: action.payload.username,
        isLoggedIn: true,
        userId: action.payload.id,
        message: 'user still logged in'
      }
    default: {
      return state
    }
  }
}
