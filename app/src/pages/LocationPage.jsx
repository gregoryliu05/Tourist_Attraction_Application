import {useRef, useState, useEffect, useContext} from 'react';
import useAuth from '../hooks/useAuth';

import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';


const LocationElement = (props) => {

    return (
        <div>
            Element
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
        {locations && locationsRating ? 
        (<div>
        lol
    </div>
    ) 
    :
    (
    <div>Loading... </div>

    )

        }
        </>
    )
}





export default LocationPage;