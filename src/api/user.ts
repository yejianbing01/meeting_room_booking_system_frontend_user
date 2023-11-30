import { ajax } from '../lib/ajax'

export async function login(loginUser: LoginUserDto) {
  return ajax.post<LoginUserVo>('/user/login', loginUser)
    .then(res => res.data)
}

export async function captcha(address: string) {
  return ajax.get<string>(`/captcha?address=${address}`)
    .then(res => res.data)
}

export async function register(registerUser: RegisterUserDto) {
  return ajax.post<string>('/user/register', registerUser)
    .then(res => res.data)
}

export async function updatePassword(updatePasswordDto: UpdatePasswordDto) {
  return ajax.post<string>('/user/update_password', updatePasswordDto)
    .then(res => res.data)
}

export async function getCurrentUserInfo() {
  return ajax.get<UserDetailVo>('/user/info')
    .then(res => res.data)
}

export async function updateCurrentUserInfo(updateUserDto: UpdateUserDto) {
  return ajax.post<string>('/user/update', updateUserDto)
    .then(res => res.data)
}

export async function uploadImg(file: any) {
  return ajax.post<string>('/user/upload', { file }, { headers: { 'Content-Type': 'application/form-data' } })
    .then(res => res.data)
}

export async function findUserList(userListSearchParam: UserListSearchParam) {
  return ajax.get<UserListResponse>('/user/list', { params: userListSearchParam })
    .then(res => res.data)
}

export async function disableUser(userId: number) {
  return ajax.get<string>('/user/freeze', { params: { userId } })
    .then(res => res.data)
}
