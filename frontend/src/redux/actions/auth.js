import {
  TRY_LOGIN_REQUEST,
  TRY_LOGIN_SUCCESS,
  TRY_SIGNUP_SUCCESS,
  TRY_SIGNUP_FAILED,
  TRY_LOGIN_FAILURE,
  TRY_LOG_OUT
} from "../actionTypes";

export const tryLogin = (email, password) => ({
  type: TRY_LOGIN_REQUEST,
  payload: {
    email,
    password
  }
});

export const loginSuccessful = responseData => ({
  type: TRY_LOGIN_SUCCESS,
  payload: responseData
});
export const loginFailed = responseData => ({
  type: TRY_LOGIN_FAILURE,
  payload: responseData
});
export const SignUpSuccessful = responseData => ({
  type: TRY_SIGNUP_SUCCESS,
  payload: responseData
});
export const SignUpFailed = responseData => ({
  type: TRY_SIGNUP_FAILED,
  payload: responseData
});
export const logOutSuccesfful = () => ({
  type: TRY_LOG_OUT
});
export const login = userConfig => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "auth/login/",
      method: "POST",
      body: userConfig
    })
    .then(res => dispatch(loginSuccessful(res)))
    .catch(err => dispatch(loginFailed(err)));
};
export const signup = userConfig => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "auth/register/",
      method: "POST",
      body: userConfig
    })
    .then(res => dispatch(SignUpSuccessful(res)))
    .catch(err => dispatch(SignUpFailed(err)));
};
export const logOut = () => dispatch => {
  dispatch(logOutSuccesfful());
};
