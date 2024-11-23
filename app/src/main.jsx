import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProfileP from './pages/ProfileP.jsx'

const router = createBrowserRouter([
 {
  path: '/',
   element: <App/>,
   errorElement: <NotFoundPage/>
 },
 {
  path: '/profile',
  element:  <ProfilePage/>,
  children: [
    {
      path: '/profile/:id',
      element: <ProfileP/>
     }
  ]
 },
 



]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
