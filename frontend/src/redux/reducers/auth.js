import {
  TRY_LOGIN_REQUEST,
  TRY_LOGIN_SUCCESS,
  TRY_SIGNUP_SUCCESS,
  TRY_SIGNUP_FAILED,
  TRY_LOGIN_FAILURE,
  TRY_LOG_OUT
} from "../actionTypes";
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "../constants";
const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
const user = window.localStorage.getItem(LOCAL_STORAGE_USER);
const initialState = {
  loginInProgress: false,
  loginCompleted: false,
  loginFailed: false,
  setupCompleted: false,
  signUpCompleted: false,
  signUpFailed: false,
  user: null,
  token: token,
  payload: null,
  username: user
};

export default function(state = initialState, action) {
  let { payload } = action;

  if (action.type === TRY_LOGIN_REQUEST) {
    return {
      ...state,
      loginInProgress: true,
      loginCompleted: false
    };
  }
  if (action.type === TRY_LOGIN_SUCCESS) {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN, payload.token);
    window.localStorage.setItem(LOCAL_STORAGE_USER, payload.user.username);
    return {
      ...state,
      loginInProgress: false,
      loginCompleted: true,
      loginFailed: false,
      user: payload.user,
      username: payload.user.username,
      token: payload.token
    };
  }
  if (action.type === TRY_LOGIN_FAILURE) {
    return {
      ...state,
      loginInProgress: false,
      loginFailed: true,
      payload: payload
    };
  }
  if (action.type === TRY_SIGNUP_SUCCESS) {
    return {
      ...state,
      signUpCompleted: true,
      signUpFailed: false,
      payload: payload
    };
  }
  if (action.type === TRY_SIGNUP_FAILED) {
    return {
      ...state,
      signUpFailed: true,
      payload: payload
    };
  }
  if (action.type === TRY_LOG_OUT) {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN, null);
    window.localStorage.setItem(LOCAL_STORAGE_USER, null);
    return {
      ...state,
      username: null,
      user: null,
      token: null,
      payload: null
    };
  }

  return state;
}
