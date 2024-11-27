import {useRef, useState, useEffect, useContext} from 'react';
import { NavLink, Link, useNavigate, useLocation ,useParams } from 'react-router-dom';
import axios from '../api/axios';



const LocationPage = () => {
    const params = useParams();

    // get and display all location data
    // get and display all ratings 
    // show which user displayed the rating
    const [location, setLocation] =useState(null)
    
    useEffect(() => {
        axios.get(`http://localhost:50004/locations/${params.locationID}`
            
        ).then((response) => {
            console.log("Data", response.data.data)
            setLocation(response.data.data)
        })
    }, [params])

   return (
    <>
    {location ? (<div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
        <div className=" flex-row p-4 gap-4 text-center">
            <p className="flex "> ID:  {location.locationID}</p>
            <p className=" flex"> Name: {location.locationName}</p>
            <p className=" flex"> Address: {location.address}</p>
            <p className=" flex"> Postal Code: {location.postalCode}</p>
            <p className=" flex"> City: {location.cityName}</p>
        </div>
        </div>)
        : 
        (<div> loading... </div>)}
        </>
    
   ) 
}

export default LocationPage;