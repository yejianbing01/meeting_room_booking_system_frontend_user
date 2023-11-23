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
  id: number;

  username: string;

  nickName: string;

  email: string;

  headPic: string;

  phoneNumber: string;

  isFrozen: boolean;

  isAdmin: boolean;

  createTime: number;

  roles: string[];

  permissions: Permission[];
}

interface LoginUserVo {
  userInfo: UserInfo;

  accessToken: string;

  refreshToken: string;
}

