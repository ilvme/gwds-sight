// 封装 axios
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASEURL ?? 'http://localhost:8080/'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => Promise.reject(error),
)
export default axios
