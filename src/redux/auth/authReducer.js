import {
  CLEAR_ERR_MESSAGE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS
} from "./actionTypes";

export const initialState = {
  isSubmitting: false,
  errMsg: null,
  user: {},
  authenticatedData: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errMsg: null
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSubmitting: true,
        user: action.payload,
        errMsg: null
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        isSubmitting: true,
        errMsg: action.payload
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errMsg: null
      }
    case LOGIN_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        isSubmitting: false,
        errMsg: null,
        authenticatedData: action.payload
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        errMsg: action.payload
      }
    case CLEAR_ERR_MESSAGE:
      return {
        ...state,
        errMsg: null
      }
    default:
      return {state}
  }
};

export default reducer;
