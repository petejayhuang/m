import configuredAxios from '../config/axios'
import { URLS } from '../config/constants'

import {
  FETCH_ALL_APPS_REQUEST,
  FETCH_ALL_APPS_SUCCESS,
  FETCH_ALL_APPS_FAILURE,
  UPDATE_APP_REQUEST,
  UPDATE_APP_SUCCESS,
  UPDATE_APP_FAILURE
} from './types'

// Fetch all apps of an user
export const fetchAllApps = () => async dispatch => {
  dispatch(fetchAllAppsRequest)
  try {
    const { data } = await configuredAxios().get(`${URLS.api}/apps`)
    dispatch(fetchAllAppsSuccess(data.apps))
  } catch (error) {
    dispatch(fetchAllAppsFailure(error))
  }
}
const fetchAllAppsRequest = {
  type: FETCH_ALL_APPS_REQUEST,
  loading: true
}
const fetchAllAppsSuccess = apps => ({
  type: FETCH_ALL_APPS_SUCCESS,
  loading: false,
  payload: apps
})
const fetchAllAppsFailure = error => ({
  type: FETCH_ALL_APPS_FAILURE,
  loading: false,
  error
})

// Update a particular app
export const updateApp = ({ id, name, logo }) => async dispatch => {
  dispatch(updateAppRequest)
  try {
    const body = { name, logo }
    await configuredAxios().put(`${URLS.api}/apps/${id}`, body)
    dispatch(updateAppSuccess)
    dispatch(fetchAllApps())
  } catch (error) {
    dispatch(updateAppFailure(error))
  }
}
const updateAppRequest = {
  type: UPDATE_APP_REQUEST,
  loading: true
}
const updateAppSuccess = {
  type: UPDATE_APP_SUCCESS,
  loading: false
}
const updateAppFailure = error => ({
  type: UPDATE_APP_FAILURE,
  loading: false,
  error
})
