import type { ReactNode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import type { RouteObject } from 'react-router-dom'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import UpdatePassword from './pages/UpdatePassword/UpdatePassword'
import IndexLayout from './layouts/IndexLayout'
import Users from './pages/Users/Users'

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
      element: <div>aaa</div>,
    },
    {
      path: 'rooms',
      element: <div>会议室管理</div>,
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
    path: 'update_password',
    element: <UpdatePassword />,
  },
]

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
