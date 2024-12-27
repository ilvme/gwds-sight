// 封装 axios
import axios from 'axios'
import { Layer } from '@/utils/Layer.js'

const fetcher = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

fetcher.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)
fetcher.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response.data
    } else {
      Layer.error(response.data.msg)
    }
  },
  (error) => Promise.reject(error),
)
export default fetcher
