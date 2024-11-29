import { useState, useEffect} from 'react'
import { Link, Outlet, NavLink} from "react-router-dom";
import useAuth from '../hooks/useAuth';


const TopNavBar = () => {
  const {auth, setAuth} = useAuth();
  const [searchVal, setSearchVal] = useState('')
  const buttonHandler = (event) => {
    event.preventDefault()
    console.log("lolo;")
    setSearchVal('')
  }

  useEffect(() => {
    console.log("Auth on this page:", auth);
  }, [auth]);

  const handleLogout = () => {
    console.log(auth);
    setAuth(null);
    localStorage.removeItem('auth');
    console.log()
    
  }
  return (
    <div className='p-2.0 flex px-4 py-2'> 
      {/* <form onSubmit = {buttonHandler} className= 'flex  gap-4'>
        <input className = 'px-4 py-2 border border-gray-300 rounded hover:shadow-lg transition-shadow' 
        type = 'text' placeholder='search for locations' value = {searchVal}
        onChange ={(e) => setSearchVal(e.target.value)}>
        </input>
      <button className='bg-gray-200 px-4 py-2 border border-black-300 rounded 
      hover:shadow-lg transition-shadow' type = 'submit'>
        Submit 
        </button>
        </form> */}
      <div className = 'text-lg font-bold left-8 flex-grow px-4 py-2'>Tourist Attraction Application</div>
      <>
      { !auth?
      (<>
        <NavLink className = 'bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow' to = {`/login`}
          >Login/Sign Up</NavLink>
           <div className= 'w-[150px] px-4 py-2'></div>
          </>): 
      (<>
      <p className=' px-4 py-2'>Hello, {auth.username} </p>
      <NavLink className = ' text-center bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow' to = {`/profile`}
        >View Profile</NavLink>
        <button className= 'bg-red-500 text-white px-4 py-2 border rounded-lg hover:bg-red-600 transition-shadow' onClick = {handleLogout}>Logout</button>
        </>)
      }
      </>

    </div>
  )
}

export default TopNavBar;