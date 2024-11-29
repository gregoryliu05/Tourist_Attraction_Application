import {useRef, useState, useEffect, useContext} from 'react';
import { NavLink, Link, useNavigate, useLocation ,useParams, Outlet } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useUpdate from '../hooks/useUpdate';



const LocationPage = () => {
    const {auth, setAuth} = useAuth();
    const {update, setUpdate} = useUpdate();
    const params = useParams();

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


    const fetchRatings = () => {
        if (location) {
            axios.get(`http://localhost:50004/locations/${location.postalCode}/${location.address}/ratings`)
                .then((response) => {
                    setRatings(response.data.data);
                });
        }
    };

    useEffect(() => {
        if (location) {
            axios.get(`http://localhost:50004/locations/${location.postalCode}/${location.address}/ratings`

            ).then((response) => {
                console.log("ratings updated", response.data.data)
                setRatings(response.data.data)
            })
        }   
        console.log("update", update)
    }, [update])

    useEffect(() => {
        if (location) {
            console.log('addr', location.address)
            axios.get(`http://localhost:50004/locations/${location.postalCode}/${location.address}/ratings`

            ).then((response) => {
                console.log("ratings", response.data.data)
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

    useEffect(() => {
        return () => {
            // Reset state when the component is unmounted or navigated away
            setLocation(null);
            setLocationDetails(null);
            setRatings(null);
        };
    }, []);
   


    return (
        <div className="flex  gap-4 px-4">
            {location && locationDetails ? (
                <div className="w-[400px] md:w-[500px] lg:w-[600px] h-auto bg-white border border-gray-200 shadow-lg rounded-lg p-6">
                    <div className='flex items-center justify-between mb-4'>
                    <h2 className="text-xl font-bold mb-4">
                        {location.locationName}
                    </h2>
                    {location.locationType == "Restaurant" || location.locationType == "Hotel" ?
                    (!auth ? (<NavLink className="px-4 py-2 text-sm rounded border border-gray-200 bg-blue-500 hover:shadow-lg hover:bg-blue-600 transition-shadow text-white"
                    to = "/login">
                        Log In to Create Booking
                    </NavLink>) :(
                     <NavLink className="px-4 py-2 text-sm rounded border border-gray-200 bg-blue-500 hover:shadow-lg hover:bg-blue-600 transition-shadow text-white"
                     to ={`/locations/${location.locationID}/booking`}
                     >
                    Create a Booking
                    </NavLink>)
                )
                :
                (<></>)
                }
                    </div>
                    <div className="text-gray-700 space-y-2">
                        <p>
                            <span className="font-bold">ID:</span>{" "}
                            {location.locationID}
                        </p>
                        <p>
                            <span className="font-bold">Address:</span>{" "}
                            {location.address}
                        </p>
                        <p>
                            <span className="font-bold">Postal Code:</span>{" "}
                            {location.postalCode}
                        </p>
                        <p>
                            <span className="font-bold">Operation Hours:</span>{" "}
                            {location.operationHours}
                        </p>
                        <p>
                            <span className="font-bold">City:</span>{" "}
                            {location.cityName}
                        </p>
                        <p>
                            <span className="font-bold">Type:</span>{" "}
                            {location.locationType}
                        </p>
                        {location.locationType === "Park" ? (
                            <p>
                                <span className="font-bold">Area:</span>{" "}
                                {locationDetails.area}
                            </p>
                        ) : location.locationType === "Museum" ? (
                            <>
                                <p>
                                    <span className="font-bold">Price:</span> $
                                    {locationDetails.cost}
                                </p>
                                <p>
                                    <span className="font-bold">Museum Type:</span>{" "}
                                    {locationDetails.type}
                                </p>
                            </>
                        ) : location.locationType === "Restaurant" ? (
                            <p>
                                <span className="font-bold">Cuisine:</span>{" "}
                                {locationDetails[2]}
                            </p>
                        ) : (
                            <>
                                <p>
                                    <span className="font-bold">Price:</span>{" "}
                                    ${locationDetails[2]}
                                </p>
                                <p>
                                    <span className="font-bold">Stars:</span>{" "}
                                    {locationDetails[3]}
                                </p>
                            </>
                        )}
                    </div>
    
                    <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Reviews:</h3>
                    {!auth ? (<NavLink className="px-4 py-2 text-sm rounded border border-gray-200 bg-blue-500 hover:shadow-lg hover:bg-blue-600 transition-shadow text-white"
                    to = "/login">
                        Log In to Make a Review
                    </NavLink>) :(
                     <NavLink className="px-4 py-2 text-sm rounded border border-gray-200 bg-blue-500 hover:shadow-lg hover:bg-blue-600 transition-shadow text-white"
                     to ={`/locations/${location.locationID}/rating`}
                     >
                    Make a Review
                    </NavLink>)
                }
                    </div>
                        {ratings ? (
                            <div className="space-y-4">
                                {ratings.map((rating) => (
                                    <div
                                        key={rating.ratingID}
                                        className="bg-gray-100 p-3 rounded-lg shadow"
                                    >
                                        <p>
                                            <span className="font-bold">
                                                User ID:
                                            </span>{" "}
                                            {rating.userID}
                                        </p>
                                        <p>
                                            <span className="font-bold">
                                                Score:
                                            </span>{" "}
                                            {Math.round(
                                                (rating.score + Number.EPSILON) *
                                                    100
                                            ) / 100}
                                            /5
                                        </p>
                                        <p>
                                            <span className="font-bold">
                                                Comment:
                                            </span>{" "}
                                            {rating.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-500">No ratings available</div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-1/3 h-[500px] bg-gray-100 border border-gray-200 shadow-lg rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Select a location to view details</p>
                </div>
            )}
            <div className= 'pt-4'>
            <Outlet/>
            </div>
        </div>
    );
    
}

export default LocationPage;