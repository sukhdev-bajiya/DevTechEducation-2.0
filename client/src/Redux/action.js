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
    dispatch(signupLoading());
    fetch(`${process.env.REACT_APP_API_LINK}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json())
        .then((res) => { return userSignUpFunAlert(res), dispatch(signupSuccess(res)) })
        .catch(() => dispatch(signupError()));
};

function userSignUpFunAlert(res) {
    {
        res.success ? alert(`User Registered Successfully! \n Your Username ${res.user.username}`)
            : alert(`Opps some issue! \n ${res.message}`)
    }
}

export const userSignInFun = (data) => (dispatch) => {
    dispatch(signinLoading());
    fetch(`${process.env.REACT_APP_API_LINK}/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json())
        .then((res) => { return dispatch(signinSuccess(res)), sessionStorage.setItem("signinauthvailed", JSON.stringify(res)) })
        .catch(() => dispatch(signinError()));
};


