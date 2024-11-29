import { useState, useEffect} from 'react'
import { Link, Outlet, NavLink} from "react-router-dom";
import TopNavBar from './components/TopNavBar';
import useAuth from './hooks/useAuth';



// UPDATE NAVLINKS LATER, update categories const to have their link?? 
const CategoriesGrid = () => {
  const categories = [
    { name: 'Locations', icon: '📍' , route: '/locations'},  
    { name: 'Events', icon: '🎉', route: '/events' },   
  ]
  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-6 text-center">Categories</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <NavLink to = {`${category.route}`} key={index}>  
        <div
          className="border border-gray-300 rounded-lg 
          p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
        >
          <div className="text-4xl mb-2">{category.icon}</div>
          <div className="font-medium text-lg">{category.name}</div>
        </div>
        </NavLink>
      ))}
    </div>
  </div>
  )
}


function Home() {

  return (
    <>
      <TopNavBar/>
      <CategoriesGrid/>
    </>
  )
}

export default Home
