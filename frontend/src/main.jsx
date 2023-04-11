import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Start from './Start'
import CreateUser from './CreateUser'
import UserHome from './UserHome'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import AccountHistory from './AccountHistory'

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        element: <Start />,
        path: '/'
      },
      {
        element: <CreateUser />,
        path: '/register'
      },
      {
        element: <UserHome />,
        path: '/home'
      },
      {
        element: <Deposit />,
        path: '/deposit'
      },
      {
        element: <Withdraw />,
        path: '/withdraw'
      },
      {
        element: <AccountHistory />,
        path: '/account'
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
