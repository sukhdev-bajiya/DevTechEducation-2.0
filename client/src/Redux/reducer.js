import { FREE_LOADING, SIGNIN_LOADING, SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNUP_LOADING, SIGNUP_ERROR, SIGNUP_SUCCESS } from "./actionType";

const initState = {
    freeLoad: false,
    signupLoadingFlag: false,
    signupSuccessFlag: false,
    signupErrorFlag: false,
    signinLoadingFlag: false,
    signinSuccessData: localStorage.getItem("signinauthvailed") || null,
    signinErrorFlag: false,
};

export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case FREE_LOADING:
            return {
                freeLoad: payload
            };
        case SIGNUP_LOADING:
            return {
                signupLoadingFlag: true
            };
        case SIGNUP_ERROR:
            return {
                signupLoadingFlag: false,
                signupErrorFlag: true
            };
        case SIGNUP_SUCCESS:
            return {
                signupLoadingFlag: false,
                signupSuccessFlag: true
            };
        case SIGNIN_LOADING:
            return {
                signinLoadingFlag: true
            };
        case SIGNIN_ERROR:
            return {
                signinLoadingFlag: false,
                signinErrorFlag: true
            };
        case SIGNIN_SUCCESS:
            return {
                signinLoadingFlag: false,
                signinSuccessData: payload
            };

        default:
            return state;
    }
};
