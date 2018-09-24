import axios from 'axios'
import { URLS } from '../config/constants'

const configuredAxios = () => {
  let headers = {}

  headers['Authorization'] = localStorage.getItem('accessToken')

  return axios.create({
    baseURL: URLS.api,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  })
}

export default configuredAxios
