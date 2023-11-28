import type { IAction, IActionLogout, IStore } from '.'

export const reducer: React.Reducer<IStore, IAction | IActionLogout> = (store, action) => {
  switch (action.type) {
    case 'login':
      localStorage.setItem('access_token', action.payload.loginData!.accessToken || '')
      localStorage.setItem('refresh_token', action.payload.loginData!.refreshToken || '')
      localStorage.setItem('user_info', JSON.stringify(action.payload.loginData!.userInfo || ''))
      return {
        ...store,
        loginData: {
          ...store.loginData,
          ...action.payload.loginData,
        },
      }
    case 'updateUserInfo':
      localStorage.setItem('user_info', JSON.stringify({ ...JSON.parse(localStorage.getItem('user_info') || ''), ...action.payload.loginData!.userInfo || {} }))
      return {
        ...store,
        loginData: {
          ...store.loginData,
          userInfo: {
            ...store.loginData.userInfo,
            ...action.payload.loginData?.userInfo,
          },
        },
      }
    case 'logout': {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_info')
      return {
        ...store,
        loginData: { },
      }
    }
    default:
      return store
  }
}
