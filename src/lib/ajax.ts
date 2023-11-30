import { message } from 'antd'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

export const ajax = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 3000,
})

ajax.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('access_token')

  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`
  }
  return config
})

// interface PendingTask {
//   config: AxiosRequestConfig
//   resolve: Function
// }
// const refreshing = false
// const queue: PendingTask[] = []

ajax.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error)
    }

    const { data } = error.response

    // if (refreshing) {
    //   return new Promise((resolve) => {
    //     queue.push({ config, resolve })
    //   })
    // }

    // if (data.code === 401 && !config.url.includes('/user/refresh')) {
    //   refreshing = true
    //   try {
    //     await refreshToken()
    //     refreshing = false
    //     queue.forEach(({ config, resolve }) => {
    //       resolve(ajax(config))
    //     })
    //     return ajax(config)
    //   }
    //   catch (error: any) {
    //     window.location.href = '/login'
    //     message.error(error.response.data)
    //   }
    // }
    // else {
    message.error(Array.isArray(data.data) ? data.data[0] : data.data)
    return Promise.reject(error)
    // }
  },
)

// async function refreshToken() {
//   const res = await ajax.get('/user/refresh', {
//     params: {
//       refresh_token: localStorage.getItem('refresh_token'),
//     },
//   })
//   localStorage.setItem('access_token', res.data.access_token || '')
//   localStorage.setItem('refresh_token', res.data.refresh_token || '')
//   return res
// }
