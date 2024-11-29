import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './Home.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import RequireAuth from './pages/requireAuth.jsx'
import LocationsPage from './pages/LocationsPage.jsx'
import LocationPage from './pages/LocationPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import RatingPage from './pages/RatingPage.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { UpdateProvider } from './context/UpdateProvider.jsx'




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
 },
 {path: '/locations',
  element: <LocationsPage/>,
  children: [
    { path: '/locations/:locationID',
      element: 
        <LocationPage />
  ,
      children: [
        {
          path: '/locations/:locationID/booking',
          element: <BookingPage/>
        },
        {
          path: '/locations/:locationID/rating',
          element: <RatingPage/>
        }
      ]
    }
  ]

 }
 



]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UpdateProvider>
    <RouterProvider router = {router}/>
    </UpdateProvider>
    </AuthProvider>
  </StrictMode>,
)
