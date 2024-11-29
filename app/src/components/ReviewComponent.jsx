
import { useState, useEffect} from 'react'
import { Link, Outlet, NavLink} from "react-router-dom";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';


const ReviewComponent = (props) => {
    const {ID, score, comment, address, postalCode} = props;
    const [location, setLocation] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:50004/locations/${postalCode}/${address}`)
        .then((response) => {
            setLocation(response.data.data)
        })
    }, [])

    return (
        <>
        {location ? (
        <div className="bg-gray-100 py-4 p-4 rounded-lg border border-black-200 shadow-md">
            <p>
                <span className="font-bold">{location.locationName} </span> 
            </p>
            <p>
                <span className="font-bold">Score:</span>{" "}
                {Math.round((score + Number.EPSILON) * 100) / 100}/5
            </p>
            <p>
                <span className="font-bold">Comment:</span> {comment}
            </p>
        </div>
        ):
        (<div>loading </div>)
        }
        </>
    );
};


export default ReviewComponent;