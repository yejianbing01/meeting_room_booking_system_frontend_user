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
    await message.error(error.response?.data.data)
    // return Promise.reject(error);
  }
);


export async function login(loginUser: LoginUserDto) {
  return axiosInstance.post<LoginUserVo>('/user/login', loginUser)
    .then(res=>res.data)
}
