import {useRef, useState, useEffect, useContext} from 'react';
import useAuth from '../hooks/useAuth';

import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';


const LocationElement = (props) => {
    const {location, rating} = props;

    return (
        <div className="flex justify-center items-center bg-white-100 w-96 h-32 p-4">
        
        <div className="max-w-lg w-full border border-gray-300 rounded-lg shadow-sm p-6 bg-white">
         
          <h2 className="text-xl font-bold text-gray-800">
            {location.locationName}
          </h2>
      
          
          <p className="text-sm text-gray-500">
            Address: {location.address}, {location.postalCode}
          </p>
      
         
          <div className="flex items-center space-x-2 mt-2">
            <span className="font-bold">Rating:</span>
            <h1
              className={
                rating.avg_rating >= 4
                  ? "text-green-500"
                  : rating.avg_rating >= 2.5
                  ? "text-yellow-500"
                  : "text-red-300"
              }
            >
              {Math.round((rating.avg_rating + Number.EPSILON) * 100) / 100}/5
            </h1>
            {rating.num_ratings > 1 ? (
              <span className="text-gray-500">
                ({rating.num_ratings} ratings)
              </span>
            ) : (
              <span className="text-gray-500">
                ({rating.num_ratings} rating)
              </span>
            )}
          </div>
        </div>
      </div>
    )

}


const LocationPage = () => {

    const [locations, setLocations] = useState(null);

    const [locationsRating, setLocationsRating] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:50004/locations/details' // gets all relevant locations details 
        ).then(response => {
            console.log("locations data", response.data.data)
            setLocations(response.data.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:50004/ratings/locations-ratings'

        ).then(response => {
            console.log("ratings data", response.data.data)
            setLocationsRating(response.data.data)
        }).catch(error => {
            console.error("Error fetching ratings data:", error);
        });

    }, [])


    return (
        <>
        <h1 className='font-bold text-center text-xl py-4'> All Locations</h1>
        
        {locations && locationsRating ? 
        (
            <div className="flex-col flex justify-center items-center space-y-2 ">
            {locations.map((location) => {
              return (
                <div >
                  <NavLink to =  {`/locations/${location.address}`} >
                <LocationElement
                  key={`${location.address}-${location.postalCode}`}
                  location={location}
                  rating={locationsRating.find((rating) => {
                    return (
                      rating.address === location.address &&
                      rating.postalCode === location.postalCode
                    );
                  })}
                />
                </NavLink>
                </div>
              );
            })}
          
            <NavLink
              className="bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow"
              to="/"
            >
              Return to Home
            </NavLink>
            </div>


    ) 
    :
    (<div>Loading... </div>)
    }
    </>
    )
}





export default LocationPage;