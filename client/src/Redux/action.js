import {
  FREE_LOADING,
  SIGNIN_LOADING,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  SIGNUP_LOADING,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  RESETPASSWORD_LOADING,
  RESETPASSWORD_ERROR,
  RESETPASSWORD_SUCCESS,
  RESETUSERNAME_LOADING,
  RESETUSERNAME_ERROR,
  RESETUSERNAME_SUCCESS,
} from "./actionType";

export const freeLoading = (payload) => ({
  type: FREE_LOADING,
  payload,
});
export const signupLoading = (payload) => ({
  type: SIGNUP_LOADING,
  payload,
});
export const signupError = (payload) => ({
  type: SIGNUP_ERROR,
  payload,
});
export const signupSuccess = (payload) => ({
  type: SIGNUP_SUCCESS,
  payload,
});
export const signinLoading = (payload) => ({
  type: SIGNIN_LOADING,
  payload,
});
export const signinError = (payload) => ({
  type: SIGNIN_ERROR,
  payload,
});
export const signinSuccess = (payload) => ({
  type: SIGNIN_SUCCESS,
  payload,
});
export const resetPasswordLoading = (payload) => ({
  type: RESETPASSWORD_LOADING,
  payload,
});
export const resetPasswordError = (payload) => ({
  type: RESETPASSWORD_ERROR,
  payload,
});
export const resetPasswordSuccess = (payload) => ({
  type: RESETPASSWORD_SUCCESS,
  payload,
});
export const resetUsernameLoading = (payload) => ({
  type: RESETUSERNAME_LOADING,
  payload,
});
export const resetUsernameError = (payload) => ({
  type: RESETUSERNAME_ERROR,
  payload,
});
export const resetUsernameSuccess = (payload) => ({
  type: RESETUSERNAME_SUCCESS,
  payload,
});

export const userSignUpFun = (data) => (dispatch) => {
  dispatch(signupLoading());
  fetch(`${process.env.REACT_APP_API_LINK}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => dispatch(signupSuccess(res)))
    .catch(() => dispatch(signupError()));
};

export const userSignInFun = (data) => (dispatch) => {
  dispatch(signinLoading());
  fetch(`${process.env.REACT_APP_API_LINK}/auth/signin`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      return (
        dispatch(signinSuccess(res)),
        sessionStorage.setItem("signinauthvailed", JSON.stringify(res))
      );
    })
    .catch(() => dispatch(signinError()));
};

export const resetUsernameFun = (data) => (dispatch) => {
  console.log("I am Calling");
  dispatch(resetUsernameLoading());
  fetch(`${process.env.REACT_APP_API_LINK}/auth/resetusername`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => dispatch(resetUsernameSuccess(res)))
    .catch(() => dispatch(resetUsernameError()));
};

export const resetPasswordFun = (data) => (dispatch) => {
  dispatch(resetPasswordLoading());
  fetch(`${process.env.REACT_APP_API_LINK}/auth/resetpassword`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => dispatch(resetPasswordSuccess(res)))
    .catch(() => dispatch(resetPasswordError()));
};

export const resetAndUpdatePasswordFun = (data) => (dispatch) => {
  dispatch(resetPasswordLoading());
  fetch(`${process.env.REACT_APP_API_LINK}/auth/resetpassword/newpassword`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => dispatch(resetPasswordSuccess(res)))
    .catch(() => dispatch(resetPasswordError()));
};

export const getallstudentuserlistFun = () => (dispatch) => {
  console.log("I am calling");
  fetch(`${process.env.REACT_APP_API_LINK}/student/getalluserlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "AAAAAAAAAAAAAAAAAAAAAMvjiAEAAAAA",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
