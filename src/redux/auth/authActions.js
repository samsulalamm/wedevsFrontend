import {
  CLEAR_ERR_MESSAGE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from "./actionTypes";
import axiox from "axios";
import {API_BASE_URL} from "../../helper/env";

export const userLogin = (data, callback = () => null) => {
  return dispatch => {
    dispatch(loginRequest())
    axiox.post(`${API_BASE_URL}login`, data)
      .then(res => {
        if(res.data.status === 200) {
          dispatch(loginSuccess(res.data.response))
          callback(true)
        } else {
          callback(false)
          dispatch(loginFailure(res.data.response.message))
        }
      })
      .catch(err => {
        console.log('error: ', err)
        dispatch(loginFailure(err.message))
        callback(false)
      })
  }
}

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const loginSuccess = (authenticatedData) => {
  localStorage.setItem('authData', JSON.stringify(authenticatedData))
  return {
    type: LOGIN_SUCCESS,
    payload: authenticatedData
  }
}

export const loginFailure = (errMsg) => {
  return {
    type: LOGIN_FAILURE,
    payload: errMsg
  }
}

export const clearErrMessage = () => {
  return {
    type: CLEAR_ERR_MESSAGE
  }
}

