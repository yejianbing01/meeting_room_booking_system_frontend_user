import { message } from "antd";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 3000
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError<ApiResponse>) => {
    message.error(error.response?.data.data)
    return Promise.reject(error);
  }
);

export async function login(loginUser: LoginUserDto) {
  return axiosInstance.post<LoginUserVo>('/user/login', loginUser)
    .then(res=>res.data)
}

export async function captcha(address: string ) {
  return axiosInstance.get<string>(`/captcha?address=${address}`)
    .then(res=>res.data)
}

export async function register(registerUser: RegisterUserDto) {
  return axiosInstance.post<string>('/user/register', registerUser)
    .then(res=>res.data)
}

export async function updatePassword(updatePasswordDto: UpdatePasswordDto) {
  return axiosInstance.post<string>('/user/update_password', updatePasswordDto)
    .then(res=>res.data)
}
