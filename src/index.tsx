import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UpdatePassword from './pages/UpdatePassword/UpdatePassword';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>index</div>,
    errorElement: <ErrorPage />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'update_password',
    element: <UpdatePassword />
  }
]

const router = createBrowserRouter(routes)


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
