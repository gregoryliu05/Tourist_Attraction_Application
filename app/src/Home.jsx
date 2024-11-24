import { useState } from 'react'
import { Link, Outlet, NavLink} from "react-router-dom";



const TopNavBar = () => {

  const [searchVal, setSearchVal] = useState('')
  const buttonHandler = (event) => {
    event.preventDefault()
    console.log("lolo;")
    setSearchVal('')
  }
  return (
    <div className='p-2.0 flex justify-between px-4 py-2'> 
      <form onSubmit = {buttonHandler} className= 'flex  gap-4'>
        <input className = 'px-4 py-2 border border-gray-300 rounded hover:shadow-lg transition-shadow' 
        type = 'text' placeholder='search for locations' value = {searchVal}
        onChange ={(e) => setSearchVal(e.target.value)}>
        </input>
      <button className='bg-gray-200 px-4 py-2 border border-black-300 rounded 
      hover:shadow-lg transition-shadow' type = 'submit'>
        Submit 
        </button>
        </form>
      <div className = 'text-lg font-bold text-center flex-grow px-4 py-2'>Tourist Attraction Application</div>
      <NavLink className = 'bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow' to = {`/login`}
      >Login/Sign Up</NavLink>
      <div className= 'w-[150px] px-4 py-2'></div>
    </div>
  )
}

// UPDATE NAVLINKS LATER, update categories const to have their link?? 
const CategoriesGrid = () => {
  const categories = [
    { name: 'Locations', icon: '📍' }, 
    { name: 'Hotels', icon: '🏨' },    
    { name: 'Parks', icon: '🌳' },     
    { name: 'Museums', icon: '🏛️' },  
    { name: 'Events', icon: '🎉' },    
    { name: 'Restaurants', icon: '🍴' },
  ]
  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-6 text-center">Categories</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <NavLink to = {`/profile`} key={index}>  
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
