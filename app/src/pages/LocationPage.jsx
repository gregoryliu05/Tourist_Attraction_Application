import {useRef, useState, useEffect, useContext} from 'react';
import { NavLink, Link, useNavigate, useLocation ,useParams } from 'react-router-dom';
import axios from '../api/axios';




const LocationPage = () => {
    const params = useParams();

    // get and display all location data
    // get and display all ratings 
    // show which user displayed the rating
    const [location, setLocation] =useState(null)
    const [locationDetails, setLocationDetails] = useState(null)
    const [ratings, setRatings] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:50004/locations/${params.locationID}`
            
        ).then((response) => {
            console.log("Data", response.data.data)
            setLocation(response.data.data)
        })
    }, [params])


    useEffect(() => {
        if (location) {
            console.log('addr', location.address)
            axios.get(`http://localhost:50004/locations/${location.postalCode}/${location.address}/ratings`

            ).then((response) => {
                console.log("rating", response.data.data)
                setRatings(response.data.data)
            })

            // given the location type, call a different route to get the additional data
            if (location.locationType == 'Park') {
                axios.get(`http://localhost:50004/locations/parks/${location.postalCode}/${location.address}`

                ).then((response) => {
                    console.log('info', response.data.data)
                    setLocationDetails(response.data.data)
                })
            }
            else if (location.locationType == 'Museum') {
                axios.get(`http://localhost:50004/locations/museums/${location.postalCode}/${location.address}`

                ).then((response) => {
                    console.log('info', response.data.data)
                    setLocationDetails(response.data.data)
                })
            }
            else if (location.locationType == 'Hotel') {
                axios.get(`http://localhost:50004/bookables/hotels/${location.postalCode}/${location.address}`

                ).then((response) => {
                    console.log('info', response.data.data)
                    setLocationDetails(response.data.data)
                })
            }
            else if (location.locationType == 'Restaurant') {
                axios.get(`http://localhost:50004/bookables/restaurants/${location.postalCode}/${location.address}`

                ).then((response) => {
                    console.log('info', response.data.data)
                    setLocationDetails(response.data.data)
                })
            }
        }

    }, [location])

    


   return (
    <>
    {location && locationDetails ? 
    (<div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
        <div className=" flex-row p-4 gap-4 text-center">
            <p className="flex "> ID:  {location.locationID}</p>
            <p className=" flex"> Name: {location.locationName}</p>
            <p className=" flex"> Address: {location.address}</p>
            <p className=" flex"> Postal Code: {location.postalCode}</p>
            <p className=" flex"> City: {location.cityName}</p>
            <p className= "flex"> Type: {location.locationType}</p>
            {location.locationType === 'Park' ? (<p className='flex'>Area: {locationDetails.area} </p>): 
            (location.locationType === 'Museum' ? (
                <>
            <p className='flex'>Cost: ${locationDetails.cost} </p>
            <p className='flex'>Museum Type: {locationDetails.type}</p>
            </>
        ) : 
        (location.locationType === "Restaurant" ? (
            <p className='flex'>Cuisine: {locationDetails[2]} </p>
        ) 
        : (
            <>
            <p className='flex'>Cost: {locationDetails[2]} </p>
            <p className='flex'>Stars: {locationDetails[3]} </p>
            </>
        ))

            )
            
            }
        </div>
        <>
        {ratings ? (<> 
        <p className='flex font-bold py-4'> Ratings:</p>
        {ratings.map((rating) => (
            <div key={rating.userID}>
                 <p>User ID: {rating.userID}</p>
                <p>Score: {Math.round((rating.score + Number.EPSILON) * 100) / 100}/5</p>
                <p>Comment: {rating.text}</p>
            </div>
        ))}
            
            
             </>)
             
             
             : (<div> no rating </div>)
             
             
             }
        </>
        </div>)
        : 
        (<div> loading... </div>)}
        </>
    
   ) 
}

export default LocationPage;