interface ApiResponse {
  code: number
  data: any
  message: string
}

interface LoginUserDto {
  username: string
  password: string
}

interface Permission {
  id: number
  code: string
  description: string
}

interface UserInfo {
  id: number

  username: string

  nickName: string

  email: string

  headPic: string

  phoneNumber: string

  isFrozen: boolean

  isAdmin: boolean

  createTime: number

  roles: string[]

  permissions: Permission[]
}

interface LoginUserVo {
  userInfo: UserInfo

  accessToken: string

  refreshToken: string
}

interface RegisterUserDto {
  username: string
  nickName: string
  password: string
  password2: string
  email: string
  captcha: string
}

interface UpdatePasswordDto {
  username: string
  password: string
  password2: string
  email: string
  captcha: string
}

interface UserDetailVo {
  id: number

  username: string

  nickName: string

  email: string

  headPic: string

  phoneNumber: string

  isFrozen: boolean

  createTime: Date
}

interface UpdateUserDto {
  nickName: string
  email: string
  headPic: string
  captcha: string
}

interface Pagination {
  pageNo: number
  pageSize: number
}

interface UserListSearchParam extends Pagination {
  username?: string
  nickName?: string
  email?: string
}

interface ListResponse {
  totalCount: number
}

interface UserListResponse extends ListResponse {
  users: UserDetailVo[]
}

interface RoomVO {
  id: number

  name: string

  capacity: number

  location: string

  equipment: string

  description: string

  isBooked: boolean

  createTime: Date

  updateTime: Date
}

interface RoomsListResponse extends ListResponse {
  meetingRooms: RoomVO[]
}

interface CreateMeetingRoomDto {
  name: string
  capacity: number
  location: string
  equipment: string
  description: string
}

interface UpdateMeetingRoomDto extends Partial<CreateMeetingRoomDto> {
  id: number
}

interface RoomsSearchParam extends Pagination {
  name?: string
  capacity?: number
  equipment?: string
}
