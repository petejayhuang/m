import axios from 'axios'
import configuredAxios from '../config/axios'
import { fetchAllApps } from './apps'
import { ACCESS_TOKEN_EXPIRY, URLS } from '../config/constants'

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CHECK_ACCESS_TOKEN_VALID_REQUEST,
  CHECK_ACCESS_TOKEN_VALID_SUCCESS,
  CHECK_ACCESS_TOKEN_VALID_FAILURE
} from './types'

export const loginUser = body => async dispatch => {
  dispatch(loginUserRequest)

  // optional
  body.expiry = ACCESS_TOKEN_EXPIRY

  try {
    const {
      data: { accessToken }
    } = await axios.post(`${URLS.api}/login`, body)

    localStorage.setItem('accessToken', accessToken)

    dispatch(loginUserSuccess)
    dispatch(checkAccessTokenValidSuccess)
    dispatch(fetchAllApps())
  } catch (error) {
    dispatch(loginUserFailure(error))
  }
}

// no usage of loading yet!
const loginUserRequest = {
  type: LOGIN_USER_REQUEST,
  loading: true
}
const loginUserSuccess = {
  type: LOGIN_USER_SUCCESS,
  payload: true,
  loading: false
}
const loginUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  loading: false,
  error
})

// this is called with setInterval to check token validity 
export const checkAccessTokenValid = () => async dispatch => {
  dispatch(checkAccessTokenValidRequest)
  try {
    await configuredAxios().get(URLS.api)
    dispatch(checkAccessTokenValidSuccess)
  } catch (e) {
    dispatch(checkAccessTokenValidFailure)
  }
}

const checkAccessTokenValidRequest = {
  type: CHECK_ACCESS_TOKEN_VALID_REQUEST
}
const checkAccessTokenValidSuccess = {
  type: CHECK_ACCESS_TOKEN_VALID_SUCCESS
}
const checkAccessTokenValidFailure = {
  type: CHECK_ACCESS_TOKEN_VALID_FAILURE
}
