import type { ReactNode } from 'react'
import { createContext, useContext, useReducer, useState } from 'react'
import { reducer } from './reducer'

interface IProps {
  children: ReactNode
}

export interface IStore {
  loginData: {
    userInfo?: Partial<UserInfo>
    accessToken?: string
    refreshToken?: string
  }
}

export interface IAction {
  type: 'login' | 'updateUserInfo'
  payload: {
    loginData: {
      userInfo?: Partial<UserInfo>
      accessToken?: string
      refreshToken?: string
    }
  }
}

export interface IActionLogout {
  type: 'logout'
}

const initState: IStore = {
  loginData: {
    userInfo: JSON.parse(localStorage.getItem('user_info') || ''),
    accessToken: '',
    refreshToken: '',
  },
}
const AppContext = createContext < { store: IStore, dispatch: React.Dispatch<IAction | IActionLogout> } >(null!)

export function AppContextProvider(props: IProps) {
  const [store, dispatch] = useReducer(reducer, initState)

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useStore() {
  return useContext(AppContext)
}
