import { FREE_LOADING, SIGNIN_LOADING, SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNUP_LOADING, SIGNUP_ERROR, SIGNUP_SUCCESS } from "./actionType";

export const freeLoading = (payload) => ({
    type: FREE_LOADING,
    payload
});
export const signupLoading = (payload) => ({
    type: SIGNUP_LOADING,
    payload
});
export const signupError = (payload) => ({
    type: SIGNUP_ERROR,
    payload
});
export const signupSuccess = (payload) => ({
    type: SIGNUP_SUCCESS,
    payload
});
export const signinLoading = (payload) => ({
    type: SIGNIN_LOADING,
    payload
});
export const signinError = (payload) => ({
    type: SIGNIN_ERROR,
    payload
});
export const signinSuccess = (payload) => ({
    type: SIGNIN_SUCCESS,
    payload
});


export const userSignUpFun = (data) => (dispatch) => {
    console.log(data)
    // dispatch(signupLoading());
    // fetch(`${process.env.REACT_APP_API_LINK}/auth/signup`)
    //     .then((res) => res.json())
    //     .then((res) => { dispatch(signupSuccess(res)) })
    //     .catch(() => dispatch(signupError()));
};


export const userSignInFun = (data) => (dispatch) => {
    console.log(data)
    let obj = { ...data };
    if (data.username === "123") {
        obj.role = "admin"
    } else if (data.username === "231") {
        obj.role = "teacher"
    } else if (data.username === "321") {
        obj.role = "student"
    }
    sessionStorage.setItem("signinauthvailed", JSON.stringify(obj))
    dispatch(signinSuccess(obj))
    // dispatch(signinLoading());
    // fetch(`${process.env.REACT_APP_API_LINK}/auth/signin`)
    //     .then((res) => res.json())
    //     .then((res) => { dispatch(signinSuccess(res)) })
    //     .catch(() => dispatch(signinError()));
};