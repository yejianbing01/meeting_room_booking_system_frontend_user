import { message } from "antd";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 3000
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    config.headers.authorization = 'Bearer ' + accessToken;
  }
  return config
});

interface PendingTask {
  config: AxiosRequestConfig
  resolve: Function
}
let refreshing = false;
const queue: PendingTask[] = [];

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    let { data, config } = error.response;

    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({ config, resolve });
      });
    }

    if (data.code === 401 && !config.url.includes('/user/refresh')) {
      refreshing = true;
      try {
        await refreshToken();
        refreshing = false;
        queue.forEach(({ config, resolve }) => {
          resolve(axiosInstance(config))
        })
        return axiosInstance(config);
      } catch (error: any) {
        window.location.href = '/login';
        message.error(error.response.data)
      }
    } else {
      console.log(error);
      message.error(Array.isArray(data.data) ? data.data[0] : data.data);
      return Promise.reject(error);
    }
  }
);

async function refreshToken() {
  const res = await axiosInstance.get('/user/refresh', {
    params: {
      refresh_token: localStorage.getItem('refresh_token')
    }
  });
  localStorage.setItem('access_token', res.data.access_token || '');
  localStorage.setItem('refresh_token', res.data.refresh_token || '');
  return res;
}

export async function login(loginUser: LoginUserDto) {
  return axiosInstance.post<LoginUserVo>('/user/login', loginUser)
    .then(res => res.data)
}

export async function captcha(address: string) {
  return axiosInstance.get<string>(`/captcha?address=${address}`)
    .then(res => res.data)
}

export async function register(registerUser: RegisterUserDto) {
  return axiosInstance.post<string>('/user/register', registerUser)
    .then(res => res.data)
}

export async function updatePassword(updatePasswordDto: UpdatePasswordDto) {
  return axiosInstance.post<string>('/user/update_password', updatePasswordDto)
    .then(res => res.data)
}

export async function getCurrentUserInfo() {
  return axiosInstance.get<UserDetailVo>('/user/info')
    .then(res => res.data)
}

export async function updateCurrentUserInfo(updateUserDto: UpdateUserDto) {
  return axiosInstance.post<string>('/user/update', updateUserDto)
    .then(res => res.data)
}

export async function uploadImg(file: any) {
  return axiosInstance.post<string>('/user/upload', { file }, {headers: { "Content-Type": "application/form-data"}})
    .then(res => res.data)
}

export async function findUserList(userListSearchParam: UserListSearchParam) {
  return axiosInstance.get<UserListResponse>('/user/list', { params: userListSearchParam })
    .then(res => res.data)
}

export async function disableUser(userId: number) {
  return axiosInstance.get<string>('/user/freeze', { params: { userId } })
    .then(res => res.data)
}
