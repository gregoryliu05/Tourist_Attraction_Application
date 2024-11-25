import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './Home.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProfileP from './pages/ProfileP.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import RequireAuth from './pages/requireAuth.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'




const router = createBrowserRouter([
 {
  path: '/',
   element: <Home/>,
   errorElement: <NotFoundPage/>
 },
 {
  element: <RequireAuth/>,
  children: [
    {
    path: '/profile',
    element: <ProfilePage/>
    }
  ]
 },
 {
  path: '/login',
  element: <LoginPage/>,
 },
 {
  path: '/signup',
  element: <SignupPage/>
 }
 



]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router = {router}/>
    </AuthProvider>
  </StrictMode>,
)
