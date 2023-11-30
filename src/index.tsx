import type { ReactNode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import type { RouteObject } from 'react-router-dom'
import { Navigate, RouterProvider, createBrowserRouter, redirect, redirectDocument } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import FindPassword from './pages/FindPassword/FindPassword'
import IndexLayout from './layouts/IndexLayout'
import Users from './pages/Users/Users'
import Rooms from './pages/Rooms/Rooms'
import { AppContextProvider } from './store'

declare module 'react-router-dom' {
  interface IndexRouteObject {
    meta?: {
      menu?: boolean
      icon?: ReactNode
      title?: string
    }
  }
  interface NonIndexRouteObject {
    meta?: {
      menu?: boolean
      icon?: ReactNode
      title?: string
    }
  }
}

export const indexRoute: RouteObject = {
  path: '/',
  element: <IndexLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <Navigate to="rooms" />,
    },
    {
      path: 'rooms',
      element: <Rooms />,
      meta: {
        menu: true,
        icon: '',
        title: '会议室管理',
      },
    },
    {
      path: 'orders',
      element: <div>预定管理</div>,
      meta: {
        menu: true,
        icon: '',
        title: '预定管理',
      },
    },
    {
      path: 'users',
      element: <Users />,
      meta: {
        menu: true,
        icon: '',
        title: '用户管理',
      },
    },
    {
      path: 'static',
      element: <div>统计</div>,
      meta: {
        menu: true,
        icon: '',
        title: '统计',
      },
    },
  ],
}

export const routes: RouteObject[] = [
  indexRoute,
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'find_password',
    element: <FindPassword />,
  },
]

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>,
)
